import type { ApiResponse } from '../types'

const API_BASE = '/api'

export class ApiError extends Error {
  status: number
  details?: unknown

  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`)

  let body: ApiResponse<T>
  try {
    body = (await res.json()) as ApiResponse<T>
  } catch {
    throw new ApiError('Réponse serveur invalide', res.status)
  }

  if (!res.ok || !body.success) {
    throw new ApiError(body.message ?? 'Une erreur est survenue', res.status, body.errors)
  }

  return body.data
}