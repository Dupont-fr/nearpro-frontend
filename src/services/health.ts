import { apiGet } from '../lib/api'
import type { HealthData } from '../types'

export function fetchHealth(): Promise<HealthData> {
  return apiGet<HealthData>('/health')
}