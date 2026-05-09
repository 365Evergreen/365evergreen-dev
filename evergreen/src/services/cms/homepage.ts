import type { WpHomepageData, WpMenuItem, WpPage, WpPost } from '@/types/cms'
import { requestGraphQL } from './graphql'

const DEFAULT_API_BASE = '/api'

interface HomepageRequestOptions {
  signal?: AbortSignal
}

interface HomepageQueryResponse {
  page: WpPage | null
  menu: {
    menuItems: {
      edges: Array<{
        node: WpMenuItem
      }>
    }
  } | null
  posts: {
    edges: Array<{
      node: WpPost
    }>
  }
}

const HOMEPAGE_QUERY = `
  query HomepageData($slug: ID!, $menuId: ID!, $postCount: Int!) {
    page(id: $slug, idType: URI) {
      id
      slug
      title
      content
      uri
    }
    menu(id: $menuId, idType: ID) {
      menuItems {
        edges {
          node {
            id
            label
            uri
          }
        }
      }
    }
    posts(first: $postCount) {
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

function getApiBase() {
  return import.meta.env.VITE_SWA_API_URL || DEFAULT_API_BASE
}

function mapHomepageData(data: HomepageQueryResponse): WpHomepageData {
  return {
    page: data.page,
    menuItems: data.menu?.menuItems.edges.map((edge) => edge.node) ?? [],
    posts: data.posts.edges.map((edge) => edge.node),
  }
}

async function getHomepageDataFromApi(
  slug: string,
  menuId: string,
  postCount: number,
  options: HomepageRequestOptions,
): Promise<WpHomepageData> {
  const params = new URLSearchParams({
    slug,
    menuId,
    postCount: String(postCount),
  })

  const response = await fetch(`${getApiBase()}/homepage?${params.toString()}`, {
    signal: options.signal,
  })

  if (!response.ok) {
    throw new Error(`Homepage request failed: ${response.status}`)
  }

  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('application/json')) {
    throw new Error('Homepage API returned a non-JSON response')
  }

  return (await response.json()) as WpHomepageData
}

async function getHomepageDataFromWordPress(
  slug: string,
  menuId: string,
  cacheSeconds: number,
  postCount: number,
  options: HomepageRequestOptions,
): Promise<WpHomepageData> {
  const data = await requestGraphQL<HomepageQueryResponse>(
    HOMEPAGE_QUERY,
    { slug, menuId, postCount },
    { cacheSeconds, signal: options.signal },
  )

  return mapHomepageData(data)
}

export async function getHomepageData(
  slug: string,
  menuId: string,
  cacheSeconds = 0,
  postCount = 9,
  options: HomepageRequestOptions = {},
): Promise<WpHomepageData> {
  try {
    return await getHomepageDataFromApi(slug, menuId, postCount, options)
  } catch (error) {
    if (!import.meta.env.DEV) {
      throw error
    }
  }

  return getHomepageDataFromWordPress(
    slug,
    menuId,
    cacheSeconds,
    postCount,
    options,
  )
}
