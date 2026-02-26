import { useEffect, useState } from 'react'
import { getMenuItemsById } from '@/services/cms'
import type { WpMenuItem } from '@/types/cms'
import styles from './styles.module.css'

const MENU_ID = 'dGVybTo0'

export function Header() {
  const [items, setItems] = useState<WpMenuItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    let isActive = true

    const loadMenu = async () => {
      try {
        const menuItems = await getMenuItemsById(MENU_ID, 300)

        if (isActive) {
          setItems(menuItems)
        }
      } catch (err) {
        if (!isActive) {
          return
        }

        const message = err instanceof Error ? err.message : 'Unknown error'
        setError(message)
      }
    }

    loadMenu()

    return () => {
      isActive = false
    }
  }, [])

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
        {items.length === 0 && !error ? (
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
        {error ? <span className={styles.error}>Menu unavailable</span> : null}
      </nav>
    </div>
  )
}
