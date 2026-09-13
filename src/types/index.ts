export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: unknown
}

export type UserRole = 'CUSTOMER' | 'PROFESSIONAL' | 'ADMIN'

export interface AuthUser {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  role: UserRole
  createdAt: string
  updatedAt: string
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