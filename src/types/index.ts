export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: unknown
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface HealthData {
  status: string
  service: string
  environment: string
  uptime: number
  timestamp: string
  database: string
  databaseName: string | null
}