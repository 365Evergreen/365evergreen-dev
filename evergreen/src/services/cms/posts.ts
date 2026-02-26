import { requestGraphQL } from './graphql'
import type { WpPost } from '@/types/cms'

interface PostsQueryResponse {
  posts: {
    edges: Array<{
      node: WpPost
    }>
  }
}

const LATEST_POSTS_QUERY = `
  query latestPosts {
    posts {
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

export async function getLatestPosts(
  cacheSeconds = 60,
): Promise<WpPost[]> {
  const response = await requestGraphQL<PostsQueryResponse>(
    LATEST_POSTS_QUERY,
    {},
    { cacheSeconds },
  )

  return response.posts.edges.map((edge) => edge.node)
}
