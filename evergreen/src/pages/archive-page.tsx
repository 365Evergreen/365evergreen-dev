import type { WpContentSummary } from '../types/cms'
import { ContentCardGrid } from '../components'

interface ArchivePageProps {
  title: string
  intro: string
  items: WpContentSummary[]
  isLoading?: boolean
  error?: string | null
  emptyMessage: string
}

export function ArchivePage({
  title,
  intro,
  items,
  isLoading = false,
  error = null,
  emptyMessage,
}: ArchivePageProps) {
  return (
    <ContentCardGrid
      title={title}
      intro={intro}
      items={items}
      isLoading={isLoading}
      error={error}
      emptyMessage={emptyMessage}
    />
  )
}
