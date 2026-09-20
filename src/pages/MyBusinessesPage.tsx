import { CalendarClock, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Skeleton } from '../components/ui/Skeleton'
import { Spinner } from '../components/ui/Spinner'
import { useMyBusinesses } from '../features/businesses/hooks'

export function MyBusinessesPage() {
  const { data: businesses, isPending, isError, refetch } = useMyBusinesses()

  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-10 w-40" />
        </div>
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  if (isError) {
    return (
      <Card className="p-10 text-center">
        <p className="text-text-text-secondary">Impossible de charger vos activités.</p>
        <Button variant="outline" onClick={() => void refetch()}>
          Réessayer
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Mes activités</h1>
          <p className="mt-1 text-sm text-text-text-secondary">
            {businesses?.length ?? 0} activité{(businesses?.length ?? 0) > 1 ? 's' : ''}
          </p>
        </div>
        <Link to="/my-businesses/new">
          <Button>Nouvelle activité</Button>
        </Link>
      </div>

      {!businesses || businesses.length === 0 ? (
        <Card className="p-10 text-center">
          <p className="font-medium text-text-primary">Vous n&rsquo;avez pas encore d&rsquo;activité</p>
          <p className="mt-1 text-sm text-text-text-secondary">
            Créez votre premier commerce pour apparaître dans les recherches NearPro.
          </p>
          <Link to="/my-businesses/new" className="mt-4 inline-block">
            <Button>Créer mon activité</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {businesses.map((business) => (
            <Card key={business.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-text-primary">{business.name}</h2>
                <StatusBadge status={business.status} />
              </div>

              <p className="mt-2 line-clamp-2 text-sm text-text-text-secondary">
                {business.description ?? 'Aucune description'}
              </p>

              <dl className="mt-4 space-y-1.5 text-sm text-text-text-secondary">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="shrink-0 text-text-tertiary" />
                  <span>
                    {business.location?.address}
                    {business.location?.city ? `, ${business.location.city}` : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={15} className="shrink-0 text-text-tertiary" />
                  <span>{business.contacts?.phone ?? '—'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarClock size={15} className="shrink-0 text-text-tertiary" />
                  <span>{business.services?.length ?? 0} service{(business.services?.length ?? 0) > 1 ? 's' : ''}</span>
                </div>
              </dl>
            </Card>
          ))}
        </div>
      )}

      <p className="flex items-center justify-center gap-2 text-center text-xs text-text-tertiary">
        <Spinner size={14} className="text-text-tertiary" />
        Synchronisation avec votre compte NearPro
      </p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: 'success' | 'neutral' | 'warning' }> = {
    active: { label: 'Active', variant: 'success' },
    draft: { label: 'Brouillon', variant: 'neutral' },
    inactive: { label: 'Inactive', variant: 'warning' },
  }
  const conf = map[status] ?? map.draft
  return <Badge variant={conf.variant}>{conf.label}</Badge>
}
