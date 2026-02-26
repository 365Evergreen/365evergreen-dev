import type { ReactNode } from 'react'
import styles from './styles.module.css'

interface AppLayoutProps {
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
}

export function AppLayout({ header, footer, children }: AppLayoutProps) {
  return (
    <div className={styles.shell}>
      {header ? <header className={styles.header}>{header}</header> : null}
      <div className={styles.main}>{children}</div>
      {footer ? <footer className={styles.footer}>{footer}</footer> : null}
    </div>
  )
}
