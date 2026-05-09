import { BlogGrid, ContactForm, Hero } from '@/components'
import type { WpPage, WpPost } from '@/types/cms'
import styles from './home.module.css'

interface HomePageProps {
  page: WpPage | null
  posts: WpPost[]
  isLoading?: boolean
  error?: string | null
}

export function HomePage({
  page,
  posts,
  isLoading = false,
  error = null,
}: HomePageProps) {
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
      <Hero
        title={page.title ?? '365 Evergreen'}
        subtitle="Modern, WordPress-managed content delivered through a polished headless frontend designed to feel fast, credible, and easy to use on every screen."
        ctaLabel="Get in touch"
        ctaHref="#contact"
      />
      {page.content && (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      )}
      <BlogGrid posts={posts} />
      <div id="contact" className={styles.contactSection}>
        <ContactForm />
      </div>
    </section>
  )
}
