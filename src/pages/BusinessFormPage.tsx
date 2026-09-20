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
      services: [],
      hours: [],
      images: [],
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
        services: [],
      })
      navigate('/my-businesses')
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Une erreur est survenue lors de la création'
      )
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <Link
        to="/my-businesses"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft size={16} />
        Retour à &laquo;&nbsp;Mes activités&nbsp;&raquo;
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-text-primary">Nouvelle activité</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Renseignez les informations de base. Vous pourrez compléter services et horaires ensuite.
        </p>
      </div>

      {formError ? (
        <Card className="border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          {formError}
        </Card>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Card className="space-y-4 p-5">
          <h2 className="font-semibold text-text-primary">Informations générales</h2>

          <Input
            label="Nom de l&rsquo;activité"
            placeholder="Ex : Salon Élégance"
            error={errors.name?.message}
            {...register('name')}
          />

          <Textarea
            label="Description"
            placeholder="Décrivez votre activité en quelques lignes"
            rows={4}
            error={errors.description?.message}
            {...register('description')}
          />

          <Select
            label="Catégorie"
            placeholder="Choisissez une catégorie"
            value={watch('categoryId')}
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
            label="Téléphone"
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

        <div className="flex justify-end gap-3">
          <Link to="/my-businesses">
            <Button variant="outline" type="button">
              Annuler
            </Button>
          </Link>
          <Button type="submit" isLoading={isSubmitting}>
            Créer mon activité
          </Button>
        </div>
      </form>
    </div>
  )
}
