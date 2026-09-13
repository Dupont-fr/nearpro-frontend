import { z } from 'zod'

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
    .regex(/^\+?[0-9 ]{9,20}$/, 'Numéro de téléphone invalide')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .max(72, 'Le mot de passe est trop long'),
  role: z.enum(['CUSTOMER', 'PROFESSIONAL']).optional(),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>