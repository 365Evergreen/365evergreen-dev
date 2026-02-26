import { useEffect, useState } from 'react'
import { getMenuItemsById } from '@/services/cms'
import type { WpMenuItem } from '@/types/cms'
import styles from './styles.module.css'

const MENU_ID = 'dGVybTo0'

export function Header() {
  const [items, setItems] = useState<WpMenuItem[]>([])
  const [error, setError] = useState<string | null>(null)

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
      <div>
        <p className={styles.kicker}>365 Evergreen</p>
        <h1 className={styles.title}>Headless CMS</h1>
      </div>
      <nav className={styles.nav} aria-label="Primary">
        {items.length === 0 && !error ? (
          <span className={styles.navHint}>Loading menu...</span>
        ) : null}
        {items.map((item) => (
          <a key={item.id} className={styles.link} href={item.uri}>
            {item.label}
          </a>
        ))}
        {error ? <span className={styles.error}>Menu unavailable</span> : null}
      </nav>
    </div>
  )
}
