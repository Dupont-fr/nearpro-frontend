import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Textarea } from '../components/ui/Textarea'
import { useCategories } from '../features/categories/hooks'
import { useCreateBusiness } from '../features/businesses/hooks'
import {
  createBusinessSchema,
  type CreateBusinessFormValues,
} from '../features/businesses/schema'

export function BusinessFormPage() {
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)
  const { data: categories, isPending: categoriesPending } = useCategories()
  const createBusiness = useCreateBusiness()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateBusinessFormValues>({
    resolver: zodResolver(createBusinessSchema),
    defaultValues: {
      name: '',
      description: '',
      categoryId: '',
      contacts: {
        phone: '',
        whatsapp: null,
        email: null,
        website: null,
      },
      location: {
        address: '',
        city: '',
        neighborhood: null,
        latitude: null,
        longitude: null,
      },
      hours: [],
      images: [],
      services: [
        {
          name: '',
          description: null,
          price: null,
          durationMinutes: null,
        },
      ],
    },
  })

  async function onSubmit(values: CreateBusinessFormValues) {
    setFormError(null)
    try {
      await createBusiness.mutateAsync({
        name: values.name,
        description: values.description || null,
        categoryId: values.categoryId,
        contacts: {
          phone: values.contacts.phone,
          whatsapp: values.contacts.whatsapp || null,
          email: values.contacts.email || null,
          website: values.contacts.website || null,
        },
        location: {
          address: values.location.address,
          city: values.location.city,
          neighborhood: values.location.neighborhood || null,
          latitude: values.location.latitude ?? null,
          longitude: values.location.longitude ?? null,
        },
        services: values.services.map((s) => ({
          name: s.name,
          description: typeof s.description === 'string' && s.description.trim() ? s.description : null,
          price: s.price == null ? null : (typeof s.price === 'string' ? Number(s.price) : s.price),
          durationMinutes: s.durationMinutes == null ? null : (typeof s.durationMinutes === 'string' ? Number(s.durationMinutes) : s.durationMinutes),
        })),
        hours: [],
        images: [],
      })
      navigate('/my-businesses')
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Une erreur est survenue lors de la crAation'
      )
    }
  }

  const watchCategoryId = watch('categoryId')

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <Link
        to="/my-businesses"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft size={16} />
        Retour A&nbsp;&laquo;&nbsp;Mes activitAcs&nbsp;&raquo;
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-text-primary">Nouvelle activitAc</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Renseignez les informations de base. Vous pourrez complAter services et horaires ensuite.
        </p>
      </div>

      {formError ? (
        <Card className="border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          {formError}
        </Card>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Card className="space-y-4 p-5">
          <h2 className="font-semibold text-text-primary">Informations gAcnAcrales</h2>

          <Input
            label="Nom de l&rsquo;activitAc"
            placeholder="Ex : Salon A%lAcgance"
            error={errors.name?.message}
            {...register('name')}
          />

          <Textarea
            label="Description"
            placeholder="DAccrivez votre activitAc en quelques lignes"
            rows={4}
            error={errors.description?.message}
            {...register('description')}
          />

          <Select
            label="CatAcgorie"
            placeholder="Choisissez une catAcgorie"
            value={watchCategoryId}
            onChange={(event) => setValue('categoryId', event.target.value, { shouldValidate: true })}
            error={errors.categoryId?.message}
            disabled={categoriesPending}
            options={(categories ?? []).map((c) => ({
              value: c.id,
              label: c.name,
            }))}
          />
        </Card>

        <Card className="space-y-4 p-5">
          <h2 className="font-semibold text-text-primary">Contact</h2>

          <Input
            label="TAclAcphone"
            placeholder="6 90 00 00 00"
            error={errors.contacts?.phone?.message}
            {...register('contacts.phone')}
          />

          <Input
            label="WhatsApp (optionnel)"
            placeholder="6 90 00 00 00"
            error={errors.contacts?.whatsapp?.message}
            {...register('contacts.whatsapp')}
          />

          <Input
            label="Email (optionnel)"
            placeholder="contact@exemple.com"
            error={errors.contacts?.email?.message}
            {...register('contacts.email')}
          />

          <Input
            label="Site web (optionnel)"
            placeholder="https://..."
            error={errors.contacts?.website?.message}
            {...register('contacts.website')}
          />
        </Card>

        <Card className="space-y-4 p-5">
          <h2 className="font-semibold text-text-primary">Adresse</h2>

          <Input
            label="Adresse"
            placeholder="Rue, immeuble..."
            error={errors.location?.address?.message}
            {...register('location.address')}
          />

          <Input
            label="Ville"
            placeholder="Douala"
            error={errors.location?.city?.message}
            {...register('location.city')}
          />
        </Card>

        <Card className="space-y-4 p-5">
          <h2 className="font-semibold text-text-primary">Prestation (obligatoire)</h2>
          <p className="text-sm text-text-secondary">
            Ajoutez au moins un service. Nom obligatoire ; prix et durAce facultatifs.
          </p>

          <Input
            label="Nom du service"
            placeholder="Ex : Coupe + shampooing"
            error={errors.services?.[0]?.name?.message}
            {...register('services.0.name')}
          />

          <Input
            label="Prix (FCFA, optionnel)"
            type="number"
            min={0}
            placeholder="Ex : 5000"
            error={errors.services?.[0]?.price?.message}
            {...register('services.0.price', { setValueAs: (v) => (v === '' ? null : Number(v)) })}
          />

          <Input
            label="DurAce (minutes, optionnel)"
            type="number"
            min={5}
            placeholder="Ex : 60"
            error={errors.services?.[0]?.durationMinutes?.message}
            {...register('services.0.durationMinutes', { setValueAs: (v) => (v === '' ? null : Number(v)) })}
          />
        </Card>

        <div className="flex justify-end gap-3">
          <Link to="/my-businesses">
            <Button variant="outline" type="button">
              Annuler
            </Button>
          </Link>
          <Button type="submit" isLoading={isSubmitting}>
            CrAcer mon activitAc
          </Button>
        </div>
      </form>
    </div>
  )
}
