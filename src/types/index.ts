export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: unknown
}

export type UserRole = 'CUSTOMER' | 'PROFESSIONAL' | 'ADMIN'

export interface Category {
  id: string
  name: string
  slug: string
  parentId: string | null
  order: number
  isActive: boolean
  children: Category[]
  createdAt: string
  updatedAt: string
}

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

/* ── Businesses ─────────────────────────────────────────────── */

export type BusinessStatus = 'draft' | 'active' | 'inactive'

export interface BusinessContacts {
  phone: string
  whatsapp: string | null
  email: string | null
  website: string | null
}

export interface BusinessLocation {
  address: string
  city: string
  neighborhood: string | null
  latitude: number | null
  longitude: number | null
}

export interface BusinessService {
  id: string
  name: string
  description: string | null
  price: number | null
  durationMinutes: number | null
  currency: 'XAF'
}

export interface OpeningHour {
  id: string
  day: number
  open: string | null
  close: string | null
  closed: boolean
}

export interface BusinessImage {
  id: string
  url: string
  alt: string | null
  order: number
}

export interface Business {
  id: string
  ownerId: string
  name: string
  slug: string
  categoryId: string
  description: string | null
  status: BusinessStatus
  contacts: BusinessContacts
  location: BusinessLocation
  services: BusinessService[]
  hours: OpeningHour[]
  images: BusinessImage[]
  createdAt: string
  updatedAt: string
}

export interface CreateBusinessInput {
  name: string
  description?: string | null
  categoryId: string
  contacts: BusinessContacts
  location: BusinessLocation
  services: Array<Omit<BusinessService, 'id' | 'currency'> & { currency?: 'XAF' }>
  hours?: Array<Omit<OpeningHour, 'id'>>
  images?: Array<Omit<BusinessImage, 'id'>>
}
