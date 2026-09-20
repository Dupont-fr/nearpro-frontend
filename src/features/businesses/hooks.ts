import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createBusiness, fetchMyBusinesses } from './services'
import type { CreateBusinessInput } from '../../types'

export function useMyBusinesses() {
  return useQuery({
    queryKey: ['businesses', 'mine'],
    queryFn: fetchMyBusinesses,
    select: (data) => data.businesses,
  })
}

export function useCreateBusiness() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateBusinessInput) => createBusiness(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['businesses', 'mine'] })
    },
  })
}
