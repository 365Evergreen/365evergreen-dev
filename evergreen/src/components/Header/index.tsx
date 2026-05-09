import { useState } from 'react'
import type { WpMenuItem } from '@/types/cms'
import styles from './styles.module.css'

interface HeaderProps {
  items?: WpMenuItem[]
  isLoading?: boolean
}

export function Header({ items = [], isLoading = false }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.header}>
      <div className={styles.brand}>
        <img
          className={styles.logo}
          src="https://365evergreendev.com/wp-content/uploads/2026/02/Evergreen_Logo__100px.webp"
          alt="Evergreen"
          width="100"
          height="100"
          loading="lazy"
        />
        <div className={styles.brandText}>
          <p className={styles.kicker}>365 Evergreen</p>
          <h1 className={styles.title}>Headless CMS</h1>
        </div>
      </div>
      <button
        type="button"
        className={styles.toggle}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={styles.toggleLabel}>Menu</span>
        <span className={styles.toggleIcon} aria-hidden="true">
          <span className={styles.toggleBar} />
          <span className={styles.toggleBar} />
          <span className={styles.toggleBar} />
        </span>
      </button>
      <nav
        id="primary-navigation"
        className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}
        aria-label="Primary"
      >
        {isLoading && items.length === 0 ? (
          <span className={styles.navHint}>Loading menu...</span>
        ) : null}
        {items.map((item) => (
          <a
            key={item.id}
            className={styles.link}
            href={item.uri}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
