import { createFileRoute } from '@tanstack/react-router'
import { Trans } from '@lingui/react/macro'



export const Route = createFileRoute('/$lang/')({
  component: App,
  head: () => ({
    meta: [
      { title: 'Accueil | React App Starter' },
      {
        name: 'description',
        content: 'Bienvenue sur le starter pack ultime pour TanStack Start, Bun et Tailwind CSS.',
      },
      { property: 'og:title', content: 'Accueil | React App Starter' },
      {
        property: 'og:description',
        content: 'Bienvenue sur le starter pack ultime pour TanStack Start, Bun et Tailwind CSS.',
      },
      { name: 'twitter:title', content: 'Accueil | React App Starter' },
      {
        name: 'script:ld+json',
        content: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'React App Starter',
          url: 'https://react-app-starter.com',
          logo: 'https://react-app-starter.com/logo512.png',
          sameAs: [],
        }),
      },
    ],
  }),
})

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">


      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center px-6">
        <div className="fade-pop relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border/70 bg-card/80 px-10 py-14 text-center shadow-2xl backdrop-blur">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-12 h-44 w-44 rounded-full bg-secondary/30 blur-3xl" />
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            <Trans>Welcome to ts-starter</Trans>
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            <Trans>
              Build, ship, and explore TanStack Start with a head start.
            </Trans>
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <span className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm">
              <Trans>TanStack Start</Trans>
            </span>
            <span className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm">
              <Trans>Shadcn UI vibe</Trans>
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}
