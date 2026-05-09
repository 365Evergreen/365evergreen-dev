import { BlogGrid, ContactForm, FeatureGrid, Hero } from '@/components'
import type { WpPage, WpPost } from '@/types/cms'
import styles from './home.module.css'

interface HomePageProps {
  page: WpPage | null
  posts: WpPost[]
  isLoading?: boolean
  error?: string | null
}

const homepageFeatures = [
  {
    title: 'Work better, together',
    description:
      'Teams, SharePoint, and the everyday tools your people already use — set up properly, governed sensibly, and adopted widely. Microsoft 365 · Teams · SharePoint · Viva',
    bullets: ['Teams', 'SharePoint', 'Viva', 'Microsoft 365'],
  },
  {
    title: 'Automate the busywork',
    description:
      ' Custom apps, workflows, and dashboards that replace the spreadsheets, email chains, and manual handoffs slowing your team down. ',  bullets: ['Power Apps', 'Power Automate', 'Power BI', 'Dataverse'],
  },
  {
    title: 'AI your team will actually use',
    description:
      'Pair a polished frontend with WordPress-managed content so updates stay practical without sacrificing design quality.', bullets: ['Microsoft 365 Copilot', 'Copilot Studio', 'Azure AI'],
  },
]

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
        className={styles.heroFullBleed}
        title={page.title ?? '365 Evergreen'}
        subtitle="Modern, WordPress-managed content delivered through a polished headless frontend designed to feel fast, credible, and easy to use on every screen."
        ctaLabel="Get in touch"
        ctaHref="#contact"
      />
      <FeatureGrid
        items={homepageFeatures}
        intro="A compact feature band directly beneath the hero helps visitors understand the value proposition before they scroll into longer content."
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
