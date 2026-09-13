import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchMe } from './services'
import { clearUser, setUser } from './slice'

export function useAuth() {
  const user = useAppSelector((state) => state.auth.user)
  const status = useAppSelector((state) => state.auth.status)
  return { user, status }
}

/** Restaure la session au premier rendu (cookies HttpOnly) puis hydrate Redux. */
export function useBootstrapAuth() {
  const dispatch = useAppDispatch()

  const { data, isError } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: fetchMe,
    retry: false,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (data) dispatch(setUser(data.user))
    if (isError) dispatch(clearUser())
  }, [data, isError, dispatch])
}