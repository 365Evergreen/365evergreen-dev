import styles from './styles.module.css'

export interface FeatureGridItem {
  title: string
  description: string
  bullets?: string[]
}

interface FeatureGridProps {
  title?: string
  intro?: string
  items: FeatureGridItem[]
}

export function FeatureGrid({
  title = 'Built for a faster, cleaner customer experience',
  intro,
  items,
}: FeatureGridProps) {
  return (
    <section className={styles.section} aria-labelledby="feature-grid-title">
      <div className={styles.header}>
        <h2 id="feature-grid-title" className={styles.title}>
          {title}
        </h2>
        {intro ? <p className={styles.intro}>{intro}</p> : null}
      </div>
      <div className={styles.grid}>
        {items.map((item) => (
          <article key={item.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDescription}>{item.description}</p>
            {item.bullets?.length ? (
              <ul className={styles.bulletList}>
                {item.bullets.map((bullet) => (
                  <li key={bullet} className={styles.bulletItem}>
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
