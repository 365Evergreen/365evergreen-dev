import type { WpPage } from '../types/cms'
import styles from './content-page.module.css'

interface ContentPageProps {
  page: WpPage | null
  isLoading?: boolean
  error?: string | null
}

export function ContentPage({
  page,
  isLoading = false,
  error = null,
}: ContentPageProps) {
  if (isLoading) {
    return <p className={styles.status}>Loading page content...</p>
  }

  if (error) {
    return (
      <div className={styles.status}>
        <p>We could not load this page.</p>
        <p className={styles.error}>{error}</p>
      </div>
    )
  }

  if (!page) {
    return (
      <div className={styles.status}>
        <p>This page could not be found.</p>
      </div>
    )
  }

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{page.title}</h1>
      </header>
      {page.content ? (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      ) : null}
    </section>
  )
}
