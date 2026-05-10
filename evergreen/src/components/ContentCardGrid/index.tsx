import type { WpContentSummary } from '../../types/cms'
import styles from './styles.module.css'

interface ContentCardGridProps {
  items: WpContentSummary[]
  title?: string
  intro?: string
  isLoading?: boolean
  error?: string | null
  emptyMessage?: string
}

export function ContentCardGrid({
  items,
  title,
  intro,
  isLoading = false,
  error = null,
  emptyMessage = 'No items available.',
}: ContentCardGridProps) {
  return (
    <section className={styles.section}>
      {title || intro ? (
        <div className={styles.header}>
          {title ? <h2 className={styles.heading}>{title}</h2> : null}
          {intro ? <p className={styles.intro}>{intro}</p> : null}
        </div>
      ) : null}

      {isLoading ? (
        <div className={styles.loading}>
          <p>Loading content...</p>
        </div>
      ) : error ? (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      ) : items.length === 0 ? (
        <div className={styles.empty}>
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {items.map((item) => (
            <article key={item.id} className={styles.card}>
              {item.featuredImage?.node ? (
                <a href={item.uri} className={styles.imageLink} aria-label={item.title}>
                  <img
                    src={item.featuredImage.node.sourceUrl}
                    alt=""
                    className={styles.image}
                    loading="lazy"
                  />
                </a>
              ) : null}
              <div className={styles.content}>
                <h3 className={styles.title}>
                  <a href={item.uri} className={styles.titleLink}>
                    {item.title}
                  </a>
                </h3>
                <div
                  className={styles.excerpt}
                  dangerouslySetInnerHTML={{ __html: item.excerpt }}
                />
                <a href={item.uri} className={styles.readMore}>
                  Read more
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
