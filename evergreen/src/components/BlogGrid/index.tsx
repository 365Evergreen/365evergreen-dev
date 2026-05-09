import type { WpPost } from '@/types/cms'
import styles from './styles.module.css'

interface BlogGridProps {
  posts: WpPost[]
  isLoading?: boolean
}

export function BlogGrid({ posts, isLoading = false }: BlogGridProps) {
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>Loading posts...</p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No posts available</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <article key={post.id} className={styles.card}>
          {post.featuredImage?.node && (
            <a
              href={post.uri}
              className={styles.imageLink}
              aria-label={post.title}
            >
              <img
                src={post.featuredImage.node.sourceUrl}
                alt=""
                className={styles.image}
                loading="lazy"
              />
            </a>
          )}
          <div className={styles.content}>
            <h2 className={styles.title}>
              <a href={post.uri} className={styles.titleLink}>
                {post.title}
              </a>
            </h2>
            <div
              className={styles.excerpt}
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
            <a href={post.uri} className={styles.readMore}>
              Read more
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}
