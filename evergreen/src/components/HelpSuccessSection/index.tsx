import styles from './styles.module.css'

interface HelpSuccessSectionProps {
  title: string
  text: string
}

export function HelpSuccessSection({
  title,
  text,
}: HelpSuccessSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="help-success-title">
      <div className={styles.panel}>
        <p className={styles.eyebrow}>Strategic delivery</p>
        <h2 id="help-success-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.text}>{text}</p>
      </div>
    </section>
  )
}
