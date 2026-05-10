import { useEffect, useState, type ReactNode } from 'react'
import styles from './styles.module.css'

interface AppLayoutProps {
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
}

export function AppLayout({ header, footer, children }: AppLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(globalThis.window.scrollY > 12)
    }

    handleScroll()
    globalThis.window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      globalThis.window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={styles.shell}>
      {header ? (
        <header
          className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}
        >
          {header}
        </header>
      ) : null}
      <div className={styles.main}>{children}</div>
      {footer ? <footer className={styles.footer}>{footer}</footer> : null}
    </div>
  )
}
