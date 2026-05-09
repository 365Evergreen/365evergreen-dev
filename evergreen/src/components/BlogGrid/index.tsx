import { useEffect, useRef, useState } from 'react'
import { getLatestPosts } from '@/services/cms'
import type { WpPost } from '@/types/cms'
import styles from './styles.module.css'

export function BlogGrid() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [posts, setPosts] = useState<WpPost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section || shouldLoad) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '250px 0px' },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [shouldLoad])

  useEffect(() => {
    let isActive = true

    if (!shouldLoad) {
      return
    }

    const loadPosts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const latestPosts = await getLatestPosts(300)

        if (!isActive) {
          return
        }

        setPosts(latestPosts.slice(0, 9))
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
  }, [shouldLoad])

  if (!shouldLoad) {
    return <div ref={sectionRef} className={styles.placeholder} aria-hidden="true" />
  }

  if (isLoading) {
    return (
      <div ref={sectionRef} className={styles.loading}>
        <p>Loading posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div ref={sectionRef} className={styles.error}>
        <p>Unable to load blog posts.</p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div ref={sectionRef} className={styles.empty}>
        <p>No posts available</p>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className={styles.grid}>
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
