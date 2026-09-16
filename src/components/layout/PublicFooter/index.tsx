import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/login', label: 'Connexion' },
  { to: '/register', label: "S'inscrire" },
]

export function PublicFooter() {
  return (
    <footer className="mt-10 border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-8 pb-safe sm:grid-cols-3 sm:px-6">
        <div className="flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              N
            </span>
            <span className="text-lg font-semibold text-text-primary">NearPro</span>
          </Link>
          <p className="text-sm text-text-secondary">
            Trouvez le bon professionnel, en toute confiance.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-sm font-semibold text-text-primary">Navigation</h2>
          <ul className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-2 text-sm font-semibold text-text-primary">À propos</h2>
          <p className="text-sm text-text-secondary">
            Plateforme de mise en relation entre particuliers et professionnels locaux, conçue à
            Douala.
          </p>
        </div>
      </div>

      <div className="border-t border-border-light py-4">
        <p className="text-center text-xs text-text-muted">
          © 2026 NearPro. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}