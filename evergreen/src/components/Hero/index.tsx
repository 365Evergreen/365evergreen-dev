import plantCoverImage from '@/assets/plant-cover-1440-900.webp'
import styles from './styles.module.css'

interface HeroProps {
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export function Hero({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  className,
}: HeroProps) {
  return (
    <section
      className={className ? `${styles.hero} ${className}` : styles.hero}
      style={{ backgroundImage: `url(${plantCoverImage})` }}
    >
      <div className={styles.content}>
        <p className={styles.eyebrow}>365 Evergreen</p>
        <h2 className={styles.title}>{title}</h2>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        {ctaLabel && ctaHref ? (
          <a className={styles.cta} href={ctaHref}>
            {ctaLabel}
          </a>
        ) : null}
      </div>
      <div className={styles.accent} aria-hidden="true" />
    </section>
  )
}
