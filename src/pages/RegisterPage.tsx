import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
  Sparkles,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { generateStrongPassword, PASSWORD_RULES } from '../features/auth/password'
import { registerSchema, type RegisterFormValues } from '../features/auth/schema'
import { registerUser } from '../features/auth/services'
import { setUser } from '../features/auth/slice'
import { addToast } from '../features/ui/slice'
import { useAppDispatch } from '../store/hooks'

const ROLE_OPTIONS = [
  { value: 'CUSTOMER', label: 'Je cherche un professionnel' },
  { value: 'PROFESSIONAL', label: 'Je suis un professionnel' },
]

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  const local = digits.startsWith('237') ? digits.slice(3) : digits
  return `+237 ${local}`
}

export function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [serverError, setServerError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
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

  const passwordValue = useWatch({ control, name: 'password', defaultValue: '' }) ?? ''
  const allRulesMet = PASSWORD_RULES.every((rule) => rule.test(passwordValue))
  const showChecklist = (passwordFocused || passwordValue.length > 0) && !allRulesMet

  function handleGeneratePassword() {
    setValue('password', generateStrongPassword(), { shouldValidate: true })
  }

  async function onSubmit(values: RegisterFormValues) {
    setServerError(null)
    try {
      const data = await registerUser({
        ...values,
        phone: values.phone ? normalizePhone(values.phone) : undefined,
      })
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
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-1.5 rounded-full bg-transparent p-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
        >
          <ArrowLeft size={18} />
          Retour
        </Link>

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
              leading={`+237`}
              placeholder="6 90 00 00 00"
              error={errors.phone?.message}
              {...register('phone')}
            />

            <div>
              <Input
                label="Mot de passe"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="8 caractères minimum"
                error={errors.password?.message}
                trailing={
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((show) => !show)}
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    className="flex size-9 items-center justify-center rounded-md text-text-muted transition-colors hover:text-text-primary"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
                onFocus={() => setPasswordFocused(true)}
                {...register('password', {
                  onBlur: () => setPasswordFocused(false),
                })}
              />

              {showChecklist ? (
                <div className="mt-2 rounded-md border border-border bg-border-light px-3 py-2.5">
                  <ul className="flex flex-col gap-1.5">
                    {PASSWORD_RULES.map((rule) => {
                      const met = rule.test(passwordValue)
                      const Icon = met ? CheckCircle2 : passwordValue.length > 0 ? XCircle : Circle
                      return (
                        <li
                          key={rule.key}
                          className={`flex items-center gap-1.5 text-sm ${
                            met
                              ? 'text-success'
                              : passwordValue.length > 0
                                ? 'text-error'
                                : 'text-text-muted'
                          }`}
                        >
                          <Icon size={14} className="shrink-0" />
                          {rule.label}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ) : null}
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition-colors hover:text-secondary-hover"
              >
                <Sparkles size={14} />
                Générer un mot de passe fort
              </button>
            </div>

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