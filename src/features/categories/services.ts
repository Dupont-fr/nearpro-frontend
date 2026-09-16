import { apiGet } from '../../lib/api'
import type { Category } from '../../types'

interface CategoriesResponse {
  categories: Category[]
}

export function fetchCategories(): Promise<CategoriesResponse> {
  return apiGet<CategoriesResponse>('/categories')
}