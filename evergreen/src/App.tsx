import { useEffect, useState } from 'react'
import type {
  WpPage,
  WpPost,
  WpResource,
} from './types/cms'
import {
  getLatestPosts,
  getLatestResources,
  getPageBySlug,
} from './services/cms'
import { primaryNavigation } from './content/site'
import './App.css'
import { Footer, Header } from './components'
import { AppLayout } from './layouts/AppLayout'
import { ArchivePage } from './pages/archive-page'
import { ContentPage } from './pages/content-page'
import { HomePage } from './pages/home'

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
        setPage(null)
        setPosts([])
        setResources([])

        if (currentRoute.kind === 'home') {
          if (!isActive) {
            return
          }
          setError(null)
          setIsLoading(false)
          return
        } else if (currentRoute.kind === 'posts-archive') {
          const loadedPosts = await getLatestPosts(300)

          if (!isActive) {
            return
          }

          setPosts(loadedPosts)
        } else if (currentRoute.kind === 'resources-archive') {
          const loadedResources = await getLatestResources(300)

          if (!isActive) {
            return
          }

          setResources(loadedResources)
        } else {
          const loadedPage = await getPageBySlug(currentRoute.slug, 60)

          if (!isActive) {
            return
          }

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
    pageContent = <HomePage />
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
          header={<Header items={primaryNavigation} />}
          footer={<Footer />}
        >
          {pageContent}
        </AppLayout>
      </section>
    </main>
  )
}
