export interface GraphQLError {
  message: string
  path?: Array<string | number>
  extensions?: Record<string, unknown>
}

export interface GraphQLResponse<TData> {
  data?: TData
  errors?: GraphQLError[]
}

export interface WpPage {
  id: string
  slug: string
  title: string
  content?: string | null
  uri?: string | null
}

export interface WpMenuItem {
  id: string
  label: string
  uri: string
}
