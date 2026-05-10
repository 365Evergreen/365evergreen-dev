import { useEffect, useState } from 'react'
import type {
  WpHomepageData,
  WpMenuItem,
  WpPage,
  WpPost,
  WpResource,
} from './types/cms'
import {
  getHomepageData,
  getLatestPosts,
  getLatestResources,
  getMenuItemsById,
  getPageBySlug,
} from './services/cms'
import './App.css'
import { Footer, Header } from './components'
import { AppLayout } from './layouts/AppLayout'
import { ArchivePage } from './pages/archive-page'
import { ContentPage } from './pages/content-page'
import { HomePage } from './pages/home'

const HOMEPAGE_SLUG = 'home'
const PRIMARY_MENU_ID = 'dGVybTo0'

type AppRoute =
  | { kind: 'home' }
  | { kind: 'page'; slug: string }
  | { kind: 'posts-archive' }
  | { kind: 'resources-archive' }

function normalizePath(pathname: string) {
  if (pathname === '/') {
    return '/'
  }

  return pathname.replace(/\/+$/, '') || '/'
}

function getRoute(pathname: string): AppRoute {
  const normalizedPath = normalizePath(pathname)

  switch (normalizedPath) {
    case '/':
      return { kind: 'home' }
    case '/latest-posts':
      return { kind: 'posts-archive' }
    case '/resources':
      return { kind: 'resources-archive' }
    default:
      return { kind: 'page', slug: normalizedPath.slice(1) }
  }
}

export function App() {
  const [homepageData, setHomepageData] = useState<WpHomepageData | null>(null)
  const [menuItems, setMenuItems] = useState<WpMenuItem[]>([])
  const [page, setPage] = useState<WpPage | null>(null)
  const [posts, setPosts] = useState<WpPost[]>([])
  const [resources, setResources] = useState<WpResource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const currentRoute = getRoute(globalThis.location.pathname)

  useEffect(() => {
    let isActive = true

    const loadRoute = async () => {
      try {
        setIsLoading(true)
        setHomepageData(null)
        setPage(null)
        setPosts([])
        setResources([])

        if (currentRoute.kind === 'home') {
          const data = await getHomepageData(HOMEPAGE_SLUG, PRIMARY_MENU_ID, 60)

          if (!isActive) {
            return
          }

          setHomepageData(data)
          setMenuItems(data.menuItems)
        } else if (currentRoute.kind === 'posts-archive') {
          const [loadedMenuItems, loadedPosts] = await Promise.all([
            getMenuItemsById(PRIMARY_MENU_ID, 300),
            getLatestPosts(300),
          ])

          if (!isActive) {
            return
          }

          setMenuItems(loadedMenuItems)
          setPosts(loadedPosts)
        } else if (currentRoute.kind === 'resources-archive') {
          const [loadedMenuItems, loadedResources] = await Promise.all([
            getMenuItemsById(PRIMARY_MENU_ID, 300),
            getLatestResources(300),
          ])

          if (!isActive) {
            return
          }

          setMenuItems(loadedMenuItems)
          setResources(loadedResources)
        } else {
          const [loadedMenuItems, loadedPage] = await Promise.all([
            getMenuItemsById(PRIMARY_MENU_ID, 300),
            getPageBySlug(currentRoute.slug, 60),
          ])

          if (!isActive) {
            return
          }

          setMenuItems(loadedMenuItems)
          setPage(loadedPage)
        }

        setError(null)
      } catch (err) {
        if (!isActive) {
          return
        }

        const message = err instanceof Error ? err.message : 'Unknown error'
        setError(message)
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadRoute()

    return () => {
      isActive = false
    }
  }, [currentRoute.kind, currentRoute.kind === 'page' ? currentRoute.slug : ''])

  let pageContent

  if (currentRoute.kind === 'home') {
    pageContent = (
      <HomePage
        page={homepageData?.page ?? null}
        isLoading={isLoading}
        error={error}
      />
    )
  } else if (currentRoute.kind === 'posts-archive') {
    pageContent = (
      <ArchivePage
        title="Latest posts"
        intro="Insights, updates, and practical guidance from the 365 Evergreen team."
        items={posts}
        isLoading={isLoading}
        error={error}
        emptyMessage="No posts are available yet."
      />
    )
  } else if (currentRoute.kind === 'resources-archive') {
    pageContent = (
      <ArchivePage
        title="Resources"
        intro="Guides, downloads, and supporting material to help teams plan and deliver better digital solutions."
        items={resources}
        isLoading={isLoading}
        error={error}
        emptyMessage="No resources are available yet."
      />
    )
  } else {
    pageContent = <ContentPage page={page} isLoading={isLoading} error={error} />
  }

  return (
    <main className="app">
      <section className="app__content">
        <AppLayout
          header={
            <Header
              items={currentRoute.kind === 'home' ? homepageData?.menuItems : menuItems}
              isLoading={isLoading}
            />
          }
          footer={<Footer />}
        >
          {pageContent}
        </AppLayout>
      </section>
    </main>
  )
}
