import { z } from 'zod'

const phoneRegex = /^\d{6,16}$/

export const openingHourInputSchema = z.object({
  day: z.number().int().min(0).max(6),
  open: z.string().nullable().optional(),
  close: z.string().nullable().optional(),
  closed: z.boolean().optional(),
})

export const serviceInputSchema = z.object({
  name: z.string().trim().min(2).max(80),
  description: z.string().trim().max(500).nullable().optional(),
  price: z.number().int().nonnegative().nullable().optional(),
  durationMinutes: z.number().int().min(5).max(1440).nullable().optional(),
})

export const businessImageInputSchema = z.object({
  url: z.string().url(),
  alt: z.string().max(200).nullable().optional(),
  order: z.number().int().nonnegative().optional(),
})

export const createBusinessSchema = z.object({
  name: z.string().trim().min(2, 'Le nom doit contenir au moins 2 caractères').max(120, 'Le nom est trop long'),
  description: z.string().trim().max(2000).nullable().optional(),
  categoryId: z.string().min(1, 'Choisissez une catégorie'),
  contacts: z.object({
    phone: z.string().regex(phoneRegex, 'Numéro de téléphone invalide'),
    whatsapp: z.string().regex(phoneRegex, 'Numéro WhatsApp invalide').nullable().optional(),
    email: z.string().email('Email invalide').nullable().optional(),
    website: z.string().url('URL invalide').nullable().optional(),
  }),
  location: z.object({
    address: z.string().trim().min(2, 'Adresse requise'),
    city: z.string().trim().min(2, 'Ville requise'),
    neighborhood: z.string().trim().nullable().optional(),
    latitude: z.number().nullable().optional(),
    longitude: z.number().nullable().optional(),
  }),
  services: z.array(serviceInputSchema).min(1, 'Ajoutez au moins un service'),
  hours: z.array(openingHourInputSchema).optional(),
  images: z.array(businessImageInputSchema).optional(),
})

export type CreateBusinessFormValues = z.infer<typeof createBusinessSchema>
