import { useEffect, useState } from 'react'
import { getLatestPosts } from '@/services/cms'
import type { WpPost } from '@/types/cms'
import styles from './styles.module.css'

export function BlogGrid() {
  const [posts, setPosts] = useState<WpPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    const loadPosts = async () => {
      try {
        setIsLoading(true)
        const data = await getLatestPosts(300)

        if (!isActive) {
          return
        }

        setPosts(data.slice(0, 9))
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

    loadPosts()

    return () => {
      isActive = false
    }
  }, [])

  if (error) {
    return (
      <div className={styles.error}>
        <p>Unable to load blog posts</p>
      </div>
    )
  }

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
