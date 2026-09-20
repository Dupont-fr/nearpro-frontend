import {
  BadgeCheck,
  Briefcase,
  Car,
  ClipboardCheck,
  Cpu,
  MessageCircle,
  Scissors,
  Search,
  Shirt,
  ShoppingBag,
  Star,
  Tag,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Skeleton } from '../components/ui/Skeleton'
import { useCategories } from '../features/categories/hooks'
import { addToast } from '../features/ui/slice'
import { useAppDispatch } from '../store/hooks'

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  automobile: Car,
  beaute: Scissors,
  alimentation: UtensilsCrossed,
  maison: Wrench,
  bricolage: Wrench,
  plomberie: Wrench,
  technologie: Cpu,
  commerce: ShoppingBag,
  mode: Shirt,
  services: Briefcase,
}

const POPULAR_SERVICES = ['Mécanicien', 'Coiffeur', 'Plombier', 'Salon de beauté']

const TRUST_ITEMS = [
  { icon: <BadgeCheck size={20} />, title: 'Pros vérifiés', text: 'Identité et activité contrôlées' },
  { icon: <Star size={20} />, title: 'Avis authentiques', text: 'Notés par de vrais clients' },
  { icon: <MessageCircle size={20} />, title: 'Contact direct', text: 'Discutez sur WhatsApp' },
]

const STEPS = [
  {
    icon: <Search size={24} />,
    title: '1. Recherchez',
    text: 'Décrivez le service dont vous avez besoin, près de chez vous.',
  },
  {
    icon: <ClipboardCheck size={24} />,
    title: '2. Comparez',
    text: 'Consultez les notes, avis et horaires des professionnels.',
  },
  {
    icon: <MessageCircle size={24} />,
    title: '3. Contactez',
    text: 'Appelez ou échangez directement sur WhatsApp.',
  },
]

export function HomePage() {
  const dispatch = useAppDispatch()
  const { data: categories = [], isPending, isError, refetch } = useCategories()

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(addToast({ message: 'La recherche arrive bientôt. Patience !', variant: 'info' }))
  }

  return (
    <div className="flex flex-col gap-10 pb-safe">
      {/* HERO — inspiration Angi : recherche d'abord */}
      <section className="-mx-4 -mt-6 bg-primary-light px-4 pb-10 pt-10 sm:-mx-6 sm:rounded-b-[2rem] sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <Badge variant="primary">Nouveau · Douala, Yaoundé et plus</Badge>
          <h1 className="text-3xl font-extrabold leading-tight text-text-primary sm:text-5xl">
            Trouvez le bon professionnel.
            <span className="text-primary"> En toute confiance.</span>
          </h1>
          <p className="max-w-xl text-base text-text-secondary sm:text-lg">
            Mécaniciens, coiffeurs, plombiers, médecins… Comparez les avis et contactez le pro
            idéal, directement sur WhatsApp.
          </p>

          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-xl flex-col gap-2 rounded-2xl bg-surface p-2 shadow-md sm:flex-row sm:rounded-full sm:p-1.5"
          >
            <div className="flex-1">
              <Input
                name="service"
                placeholder="Quel service cherchez-vous ?"
                aria-label="Rechercher un service"
              />
            </div>
            <Button type="submit" size="lg" className="shrink-0">
              <Search size={18} />
              Rechercher
            </Button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-text-muted">Populaires :</span>
            {POPULAR_SERVICES.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() =>
                  dispatch(
                    addToast({ message: `« ${service} » — recherche au Sprint 2.`, variant: 'info' }),
                  )
                }
                className="rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-text-secondary transition-colors hover:border-primary hover:text-primary"
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIANCE */}
      <section>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {TRUST_ITEMS.map((item) => (
            <Card key={item.title} className="flex items-start gap-3 p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                {item.icon}
              </span>
              <div>
                <h2 className="font-semibold text-text-primary">{item.title}</h2>
                <p className="text-sm text-text-secondary">{item.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section>
        <div className="mb-5 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">Comment ça marche ?</h2>
          <p className="mt-1 text-text-secondary">Trois étapes pour trouver votre pro.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {STEPS.map((step) => (
            <Card key={step.title} className="flex gap-4 p-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary-light text-secondary">
                {step.icon}
              </span>
              <div>
                <h3 className="font-semibold text-text-primary">{step.title}</h3>
                <p className="mt-1 text-sm text-text-secondary">{step.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CATÉGORIES */}
      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Catégories populaires
            </h2>
            <p className="mt-1 text-text-secondary">Parcourez l&apos;annuaire par métier.</p>
          </div>
          <Link
            to="/"
            className="hidden text-sm font-semibold text-primary hover:text-primary-hover sm:inline"
          >
            Voir tout
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {isPending
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-surface p-4 shadow-sm"
                >
                  <Skeleton className="size-11 rounded-xl" />
                  <Skeleton className="mt-3 h-4 w-3/4" />
                  <Skeleton className="mt-2 h-3 w-1/2" />
                </div>
              ))
            : isError
              ? null
              : categories.map((category) => {
                  const Icon = CATEGORY_ICONS[category.slug] ?? Tag
                  const subCount = category.children.length
                  const subLabel =
                    subCount > 0 ? `${subCount} sous-catégorie${subCount > 1 ? 's' : ''}` : 'Bientôt disponible'
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() =>
                        dispatch(
                          addToast({
                            message: `« ${category.name} » — le catalogue arrive bientôt.`,
                            variant: 'info',
                          }),
                        )
                      }
                      className="group rounded-2xl border border-border bg-surface p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
                    >
                      <span className="flex size-11 items-center justify-center rounded-xl bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <Icon size={22} />
                      </span>
                      <h3 className="mt-3 text-sm font-semibold text-text-primary">
                        {category.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-text-muted">{subLabel}</p>
                    </button>
                  )
                })}
        </div>
        {isError ? (
          <Card className="mt-4 flex flex-col items-center gap-3 p-6 text-center">
            <p className="text-sm text-text-secondary">
              Impossible de charger les catégories. Vérifiez votre connexion.
            </p>
            <Button variant="outline" size="sm" onClick={() => void refetch()}>
              Réessayer
            </Button>
          </Card>
        ) : null}
      </section>

      {/* CTA PROFESSIONNELS */}
      <section className="overflow-hidden rounded-2xl bg-primary text-white">
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">Vous êtes un professionnel ?</h2>
            <p className="mt-1 text-primary-light">
              Créez votre activité, gérez vos horaires et recevez des clients près de chez vous.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Link
              to="/my-businesses/new"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-base font-semibold text-primary transition-colors hover:bg-primary-light"
            >
              CrAcer mon activitAc
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}