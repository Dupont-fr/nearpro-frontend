import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { loginUser } from '../features/auth/services'
import { loginSchema, type LoginFormValues } from '../features/auth/schema'
import { setUser } from '../features/auth/slice'
import { addToast } from '../features/ui/slice'
import { useAppDispatch } from '../store/hooks'

export function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(values: LoginFormValues) {
    setServerError(null)
    try {
      const data = await loginUser(values)
      dispatch(setUser(data.user))
      dispatch(addToast({ message: 'Connexion réussie. Bienvenue !', variant: 'success' }))
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
          <h1 className="text-2xl font-bold text-text-primary">Bon retour 👋</h1>
          <p className="text-sm text-text-secondary">
            Connectez-vous pour retrouver vos professionnels de confiance.
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

            <Input
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="ex : jean@gmail.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Mot de passe"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />

            <Button type="submit" size="lg" isLoading={isSubmitting} className="mt-1">
              Se connecter
            </Button>
          </form>
        </Card>

        <p className="flex justify-center gap-1 text-sm text-text-secondary">
          Pas encore de compte ?
          <Link to="/register" className="font-semibold text-primary hover:text-primary-hover">
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}