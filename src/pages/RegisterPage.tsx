import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { registerUser } from '../features/auth/services'
import { registerSchema, type RegisterFormValues } from '../features/auth/schema'
import { setUser } from '../features/auth/slice'
import { addToast } from '../features/ui/slice'
import { useAppDispatch } from '../store/hooks'

const ROLE_OPTIONS = [
  { value: 'CUSTOMER', label: 'Je cherche un professionnel' },
  { value: 'PROFESSIONAL', label: 'Je suis un professionnel' },
]

export function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      role: 'CUSTOMER',
    },
  })

  async function onSubmit(values: RegisterFormValues) {
    setServerError(null)
    try {
      const data = await registerUser(values)
      dispatch(setUser(data.user))
      dispatch(
        addToast({
          message: 'Compte créé avec succès. Bienvenue sur NearPro !',
          variant: 'success',
        }),
      )
      navigate('/')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Une erreur est survenue'
      setServerError(message)
      dispatch(addToast({ message, variant: 'error' }))
    }
  }

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-start pt-6 sm:justify-center sm:pt-0">
      <div className="flex w-full max-w-md flex-col gap-5 px-4 pb-safe">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white shadow-md">
            N
          </span>
          <h1 className="text-2xl font-bold text-text-primary">Créer un compte</h1>
          <p className="text-sm text-text-secondary">
            Rejoignez la communauté NearPro en quelques secondes.
          </p>
        </div>

        <Card className="rounded-2xl shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 p-5 sm:p-6">
            {serverError ? (
              <p
                role="alert"
                className="rounded-md border border-error bg-error-light px-3 py-2 text-sm text-error"
              >
                {serverError}
              </p>
            ) : null}

            <Select
              label="Je suis"
              options={ROLE_OPTIONS}
              error={errors.role?.message}
              {...register('role')}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Prénom"
                autoComplete="given-name"
                placeholder="Jean"
                error={errors.firstName?.message}
                {...register('firstName')}
              />
              <Input
                label="Nom"
                autoComplete="family-name"
                placeholder="Nguema"
                error={errors.lastName?.message}
                {...register('lastName')}
              />
            </div>

            <Input
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="ex : jean@gmail.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Téléphone (WhatsApp)"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+237 690 00 00 00"
              error={errors.phone?.message}
              {...register('phone')}
            />

            <Input
              label="Mot de passe"
              type="password"
              autoComplete="new-password"
              placeholder="8 caractères minimum"
              error={errors.password?.message}
              {...register('password')}
            />

            <Button type="submit" size="lg" isLoading={isSubmitting} className="mt-1">
              Créer mon compte
            </Button>
          </form>
        </Card>

        <p className="flex justify-center gap-1 text-sm text-text-secondary">
          Déjà inscrit ?
          <Link to="/login" className="font-semibold text-primary hover:text-primary-hover">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}