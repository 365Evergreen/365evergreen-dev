import styles from './styles.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <div className={styles.footer}>
      <p className={styles.copy}>Content managed in WordPress</p>
      <p className={styles.meta}>© {year} 365 Evergreen</p>
    </div>
  )
}
