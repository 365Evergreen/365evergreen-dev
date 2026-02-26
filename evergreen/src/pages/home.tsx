import { useEffect, useState } from 'react'
import { getPageBySlug } from '@/services/cms'
import styles from './home.module.css'

interface HomePageState {
  title?: string
  content?: string | null
}

export function HomePage() {
  const [page, setPage] = useState<HomePageState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    const loadPage = async () => {
      try {
        setIsLoading(true)
        const data = await getPageBySlug('home', 60)

        if (!isActive) {
          return
        }

        setPage(
          data
            ? {
                title: data.title,
                content: data.content,
              }
            : null,
        )
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

    loadPage()

    return () => {
      isActive = false
    }
  }, [])

  if (isLoading) {
    return <p className={styles.status}>Loading homepage content...</p>
  }

  if (error) {
    return (
      <div className={styles.status}>
        <p>We could not load the homepage content.</p>
        <p className={styles.error}>{error}</p>
      </div>
    )
  }

  if (!page) {
    return (
      <div className={styles.status}>
        <p>No homepage content was returned.</p>
      </div>
    )
  }

  return (
    <section className={styles.home}>
      <header className={styles.header}>
        <h1 className={styles.title}>{page.title}</h1>
      </header>
      {page.content && (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      )}
    </section>
  )
}
