import { z } from 'zod'
import {
  PASSWORD_CHECKS,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from './password'

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("L'adresse email est invalide")),
  password: z.string().min(1, 'Le mot de passe est requis'),
})

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(60, 'Le prénom est trop long'),
  lastName: z
    .string()
    .trim()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(60, 'Le nom est trop long'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("L'adresse email est invalide")),
  phone: z
    .string()
    .refine(
      (value) => /^6[5-9]\d{7}$/.test(value.replace(/\s/g, '')),
      'Numéro de mobile camerounais invalide (ex : 6 90 00 00 00)',
    )
    .optional()
    .or(z.literal('').transform(() => undefined)),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, 'Le mot de passe doit contenir au moins 8 caractères')
    .max(PASSWORD_MAX_LENGTH, 'Le mot de passe est trop long')
    .superRefine((value, ctx) => {
      for (const check of PASSWORD_CHECKS) {
        if (!check.test(value)) {
          ctx.addIssue({ code: 'custom', path: ['password'], message: check.message })
        }
      }
    }),
  role: z.enum(['CUSTOMER', 'PROFESSIONAL']).optional(),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>