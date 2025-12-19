import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useLocation,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { setupI18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { messages as enMessages } from '../locales/en/messages'
import { messages as frMessages } from '../locales/fr/messages'
import { useMemo } from 'react'

import TanStackQueryDevtools from '../shared/providers/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import { i18nMiddleware } from '@/middlewares/i18n'
import { Navbar } from '../shared/components/Navbar'
import { ToasterProvider } from '@/shared/providers/toaster-provider'
import { DEFAULT_LOCALE, getLocaleFromPath } from '@/lib/i18n-utils'
import { ThemeProvider } from 'next-themes'

interface MyRouterContext {
  queryClient: QueryClient
}

const ALL_MESSAGES = {
  en: enMessages,
  fr: frMessages,
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'React App Starter - Modern Full-stack Template',
      },
      {
        name: 'description',
        content: 'Un starter pack ultra-rapide avec TanStack Start, Bun et Tailwind CSS.',
      },
      {
        property: 'og:title',
        content: 'React App Starter',
      },
      {
        property: 'og:description',
        content: 'Bâtissez vos applications modernes avec la vitesse de Bun et la puissance de TanStack Start.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        href: '/logo192.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
      {
        rel: 'canonical',
        href: 'https://react-app-starter.com',
      },
    ],
  }),
  server: {
    middleware: [i18nMiddleware],
  },
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  })

  const locale = getLocaleFromPath(pathname) || DEFAULT_LOCALE

  // Create an i18n instance for *this* render.
  // This avoids calling i18n.activate() during render (which triggers updates in <I18nProvider />).
  const i18n = useMemo(() => {
    return setupI18n({
      locale,
      messages: ALL_MESSAGES,
    })
  }, [locale])

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <I18nProvider i18n={i18n}>
            <Navbar />
            {children}
            <ToasterProvider />
            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
                TanStackQueryDevtools,
              ]}
            />
            <Scripts />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
