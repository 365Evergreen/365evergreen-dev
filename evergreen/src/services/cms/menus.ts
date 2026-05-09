import type { WpMenuItem } from '../../types/cms'
import { requestGraphQL } from './graphql'

interface MenuItemsByIdResponse {
  menu: {
    id: string
    menuItems: {
      edges: Array<{
        node: WpMenuItem
      }>
    }
  } | null
}

const MENU_ITEMS_BY_ID_QUERY = `
  query MenuItemsById($id: ID!) {
    menu(id: $id, idType: ID) {
      id
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

export async function getMenuItemsById(menuId: string, cacheSeconds = 0) {
  const data = await requestGraphQL<MenuItemsByIdResponse>(
    MENU_ITEMS_BY_ID_QUERY,
    { id: menuId },
    { cacheSeconds },
  )

  if (!data.menu?.menuItems?.edges) {
    return []
  }

  return data.menu.menuItems.edges.map(
    (edge: { node: WpMenuItem }) => edge.node,
  )
}
