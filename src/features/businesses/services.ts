import { apiGet, apiPost } from '../../lib/api'
import type {
  Business,
  BusinessContacts,
  BusinessImage,
  BusinessLocation,
  BusinessService,
  CreateBusinessInput,
  OpeningHour,
} from '../../types'

export interface MyBusinessesResponse {
  businesses: Business[]
}

export interface CreateBusinessResponse {
  business: Business
}

export function fetchMyBusinesses(): Promise<MyBusinessesResponse> {
  return apiGet<MyBusinessesResponse>('/businesses/me')
}

export function createBusiness(payload: CreateBusinessInput): Promise<CreateBusinessResponse> {
  return apiPost<CreateBusinessResponse>('/businesses', payload)
}

export type { Business, BusinessContacts, BusinessImage, BusinessLocation, BusinessService, OpeningHour }
