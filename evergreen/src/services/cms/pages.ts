import type { WpPage } from '@/types/cms'
import { requestGraphQL } from './graphql'

interface PageBySlugResponse {
  page: WpPage | null
}

const PAGE_BY_SLUG_QUERY = `
  query PageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      slug
      title
      content
      uri
    }
  }
`

export async function getPageBySlug(slug: string, cacheSeconds = 0) {
  const data = await requestGraphQL<PageBySlugResponse>(
    PAGE_BY_SLUG_QUERY,
    { slug },
    { cacheSeconds },
  )

  return data.page
}
