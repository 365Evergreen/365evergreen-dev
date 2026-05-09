const DEFAULT_GRAPHQL_ENDPOINT = 'https://365evergreendev.com/graphql'
const DEFAULT_CACHE_SECONDS = 300
const cacheStore = new Map()

const HOMEPAGE_QUERY = `
  query HomepageData($slug: ID!, $menuId: ID!) {
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
  }
`

function getGraphQLEndpoint() {
  return (
    globalThis.process?.env?.WORDPRESS_GRAPHQL_URL ||
    globalThis.process?.env?.VITE_WORDPRESS_GRAPHQL_URL ||
    DEFAULT_GRAPHQL_ENDPOINT
  )
}

function getCacheKey(slug, menuId) {
  return JSON.stringify({ slug, menuId })
}

async function requestHomepageData(slug, menuId) {
  const response = await globalThis.fetch(getGraphQLEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: HOMEPAGE_QUERY,
      variables: { slug, menuId },
    }),
  })

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status}`)
  }

  const payload = await response.json()

  if (payload.errors?.length) {
    const message = payload.errors.map((error) => error.message).join('; ')
    throw new Error(message)
  }

  if (!payload.data) {
    throw new Error('GraphQL response missing data')
  }

  return {
    page: payload.data.page,
    menuItems:
      payload.data.menu?.menuItems?.edges.map((edge) => edge.node) ?? [],
  }
}

async function getCachedHomepageData(slug, menuId) {
  const key = getCacheKey(slug, menuId)
  const cached = cacheStore.get(key)

  if (cached && cached.expiresAt > Date.now()) {
    return cached.value
  }

  const homepageData = await requestHomepageData(slug, menuId)
  cacheStore.set(key, {
    expiresAt: Date.now() + DEFAULT_CACHE_SECONDS * 1000,
    value: homepageData,
  })

  return homepageData
}

module.exports = async function homepage(context, req) {
  const slug = req.query.slug || 'home'
  const menuId = req.query.menuId

  if (!menuId) {
    context.res = {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'menuId is required' }),
    }
    return
  }

  try {
    const homepageData = await getCachedHomepageData(slug, menuId)
    context.res = {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, max-age=60, s-maxage=${DEFAULT_CACHE_SECONDS}, stale-while-revalidate=600`,
      },
      body: JSON.stringify(homepageData),
    }
  } catch (error) {
    context.log.error('Failed to load homepage data', error)
    context.res = {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Failed to load homepage data' }),
    }
  }
}
