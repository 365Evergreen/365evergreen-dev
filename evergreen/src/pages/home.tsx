import {
  BlogGrid,
  ContactForm,
  FeatureGrid,
  HelpSuccessSection,
  Hero,
} from '../components'
import styles from './home.module.css'

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
      ' Custom apps, workflows, and dashboards that replace the spreadsheets, email chains, and manual handoffs slowing your team down. ', bullets: ['Power Apps', 'Power Automate', 'Power BI', 'Dataverse'],
  },
  {
    title: 'AI your team will actually use',
    description:
      'Pair a polished frontend with WordPress-managed content so updates stay practical without sacrificing design quality.', bullets: ['Microsoft 365 Copilot', 'Copilot Studio', 'Azure AI'],
  },
]

export function HomePage() {
  return (
    <section className={styles.home}>
      <Hero
        className={styles.heroFullBleed}
        title="Microsoft specialists in Brisbane"
        subtitle="Helping Brisbane businesses leverage Microsoft 365 for maximum impact."
        ctaLabel="Get in touch"
        ctaHref="#contact"
      />
      <FeatureGrid
        items={homepageFeatures}
        intro="We are dedicated to providing exceptional software development services, creating custom software solutions that surpass our clients' expectations. Our team utilizes cutting-edge technologies and follows industry-leading standards to guarantee the dependability, security, and user-friendliness of our products."
      />
      <HelpSuccessSection
        title="How we help you succeed"
        text="Behind every transformative Power Apps implementation stands an engineering team with both technological mastery and strategic business acumen. 365 Evergreen delivers this rare combination to Brisbane enterprises seeking competitive differentiation through precision-engineered digital solutions"
      />
      <BlogGrid />
      <div id="contact" className={styles.contactSection}>
        <ContactForm />
      </div>
    </section>
  )
}
