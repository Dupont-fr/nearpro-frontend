import { useQuery } from '@tanstack/react-query'
import { fetchHealth } from '../services/health'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Skeleton } from '../components/ui/Skeleton'
import { Spinner } from '../components/ui/Spinner'

export function HomePage() {
  const health = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
    refetchInterval: 15_000,
  })

  return (
    <div className="flex flex-col gap-8">
      <section className="py-8 text-center">
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
          Trouvez le professionnel qu&apos;il vous faut près de chez vous.
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-text-secondary">
          Sprint 0 — infrastructure, design system et connectivité installés.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-xl font-semibold text-text-primary">Connectivité</h2>
          <div className="mt-4 flex items-center gap-2 text-sm">
            {health.isPending ? (
              <>
                <Spinner size={18} />
                <span className="text-text-secondary">Vérification en cours...</span>
              </>
            ) : health.isError ? (
              <>
                <Badge variant="error">Erreur</Badge>
                <span className="text-text-secondary">{health.error.message}</span>
              </>
            ) : (
              <>
                <Badge variant={health.data.database === 'connected' ? 'success' : 'warning'}>
                  {health.data.database === 'connected' ? 'Database connectée' : 'Database déconnectée'}
                </Badge>
                <span className="text-text-secondary">
                  API : {health.data.service} · {health.data.environment}
                </span>
              </>
            )}
          </div>
          {health.isError ? (
            <p className="mt-3 text-sm text-text-secondary">
              Vérifiez que le backend tourne sur le port 5000 (npm run dev).
            </p>
          ) : null}
        </Card>

        <Card className="p-5">
          <h2 className="text-xl font-semibold text-text-primary">Design system</h2>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="primary">nouvelles</Badge>
            <Badge variant="success">ouvert</Badge>
            <Badge variant="warning">bientôt</Badge>
            <Badge variant="error">fermé</Badge>
            <Badge variant="info">info</Badge>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button size="sm">Petit</Button>
            <Button size="md">Moyen</Button>
            <Button size="lg" variant="outline">
              Contour
            </Button>
            <Button variant="secondary">Secondaire</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div className="mt-4">
            <Input label="Rechercher un service" placeholder="Ex : mécanicien" />
          </div>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <Card key={item} className="p-4">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="mt-3 h-3 w-full" />
            <Skeleton className="mt-2 h-3 w-4/5" />
          </Card>
        ))}
      </section>
    </div>
  )
}