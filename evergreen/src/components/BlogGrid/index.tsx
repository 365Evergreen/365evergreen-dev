import { useEffect, useRef, useState } from 'react'
import { getLatestPosts } from '../../services/cms'
import type { WpPost } from '../../types/cms'
import { ContentCardGrid } from '../ContentCardGrid'
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
      <div ref={sectionRef}>
        <ContentCardGrid items={[]} isLoading emptyMessage="No posts available" />
      </div>
    )
  }

  if (error) {
    return (
      <div ref={sectionRef}>
        <ContentCardGrid
          items={[]}
          error="Unable to load blog posts."
          emptyMessage="No posts available"
        />
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div ref={sectionRef}>
        <ContentCardGrid items={[]} emptyMessage="No posts available" />
      </div>
    )
  }

  return (
    <div ref={sectionRef}>
      <ContentCardGrid items={posts} />
    </div>
  )
}
