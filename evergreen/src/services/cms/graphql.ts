import type { GraphQLResponse } from '../../types/cms'

const DEFAULT_ENDPOINT = 'https://365evergreendev.com/graphql'
const cacheStore = new Map<string, { expiresAt: number; value: unknown }>()

export interface GraphQLRequestOptions {
  signal?: AbortSignal
  cacheSeconds?: number
}

function getEndpoint() {
  return import.meta.env.VITE_WORDPRESS_GRAPHQL_URL || DEFAULT_ENDPOINT
}

function getCacheKey(query: string, variables?: Record<string, unknown>) {
  return JSON.stringify({ query, variables })
}

export async function requestGraphQL<TData>(
  query: string,
  variables?: Record<string, unknown>,
  options: GraphQLRequestOptions = {},
) {
  const cacheSeconds = options.cacheSeconds ?? 0

  if (cacheSeconds > 0) {
    const key = getCacheKey(query, variables)
    const cached = cacheStore.get(key)

    if (cached && cached.expiresAt > Date.now()) {
      return cached.value as TData
    }
  }

  const response = await fetch(getEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    signal: options.signal,
  })

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status}`)
  }

  const payload = (await response.json()) as GraphQLResponse<TData>

  if (payload.errors && payload.errors.length > 0) {
    const message = payload.errors.map((error) => error.message).join('; ')
    throw new Error(message)
  }

  if (!payload.data) {
    throw new Error('GraphQL response missing data')
  }

  if (cacheSeconds > 0) {
    const key = getCacheKey(query, variables)
    cacheStore.set(key, {
      expiresAt: Date.now() + cacheSeconds * 1000,
      value: payload.data,
    })
  }

  return payload.data
}
