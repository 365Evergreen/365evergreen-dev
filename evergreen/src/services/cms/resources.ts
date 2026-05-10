import { requestGraphQL } from './graphql'
import type { WpResource } from '../../types/cms'

interface ResourcesQueryResponse {
  resources: {
    edges: Array<{
      node: WpResource
    }>
  }
}

const LATEST_RESOURCES_QUERY = `
  query latestResources {
    resources {
      edges {
        node {
          id
          title
          uri
          slug
          excerpt(format: RENDERED)
          featuredImage {
            node {
              id
              link
              sourceUrl
            }
          }
        }
      }
    }
  }
`

export async function getLatestResources(
  cacheSeconds = 60,
): Promise<WpResource[]> {
  const response = await requestGraphQL<ResourcesQueryResponse>(
    LATEST_RESOURCES_QUERY,
    {},
    { cacheSeconds },
  )

  return response.resources.edges.map(
    (edge: { node: WpResource }) => edge.node,
  )
}
