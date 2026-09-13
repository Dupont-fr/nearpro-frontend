import { apiGet, apiPost } from '../../lib/api'
import type { AuthUser } from '../../types'
import type { LoginFormValues, RegisterFormValues } from './schema'

interface AuthResponseData {
  user: AuthUser
}

export function fetchMe(): Promise<AuthResponseData> {
  return apiGet<AuthResponseData>('/auth/me')
}

export function registerUser(payload: RegisterFormValues): Promise<AuthResponseData> {
  return apiPost<AuthResponseData>('/auth/register', payload)
}

export function loginUser(payload: LoginFormValues): Promise<AuthResponseData> {
  return apiPost<AuthResponseData>('/auth/login', payload)
}

export function logoutUser(): Promise<null> {
  return apiPost<null>('/auth/logout')
}