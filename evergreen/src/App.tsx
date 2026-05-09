import { useEffect, useState } from 'react'
import type { WpHomepageData } from './types/cms'
import { getHomepageData } from './services/cms'
import './App.css'
import { Footer, Header } from './components'
import { AppLayout } from './layouts/AppLayout'
import { HomePage } from './pages/home'

const HOMEPAGE_SLUG = 'home'
const PRIMARY_MENU_ID = 'dGVybTo0'

export function App() {
  const [homepageData, setHomepageData] = useState<WpHomepageData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    const loadHomepage = async () => {
      try {
        setIsLoading(true)
        const data = await getHomepageData(HOMEPAGE_SLUG, PRIMARY_MENU_ID, 60)

        if (!isActive) {
          return
        }

        setHomepageData(data)
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

    loadHomepage()

    return () => {
      isActive = false
    }
  }, [])

  return (
    <main className="app">
      <section className="app__content">
        <AppLayout
          header={
            <Header
              items={homepageData?.menuItems}
              isLoading={isLoading}
            />
          }
          footer={<Footer />}
        >
          <HomePage
            page={homepageData?.page ?? null}
            isLoading={isLoading}
            error={error}
          />
        </AppLayout>
      </section>
    </main>
  )
}
