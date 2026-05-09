import type { WpHomepageData } from '@/types/cms'

const DEFAULT_API_BASE = '/api'

interface HomepageRequestOptions {
  signal?: AbortSignal
}

function getApiBase() {
  return import.meta.env.VITE_SWA_API_URL || DEFAULT_API_BASE
}

export async function getHomepageData(
  slug: string,
  menuId: string,
  _cacheSeconds = 0,
  postCount = 9,
  options: HomepageRequestOptions = {},
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

  return (await response.json()) as WpHomepageData
}
