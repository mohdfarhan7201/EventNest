import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Cursor } from "@/components/site/Cursor";
import { Preloader } from "@/components/site/Preloader";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { PageTransition } from "@/components/site/PageTransition";
import { estate } from "@/data/estate";
import logo from "@/logo.png";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="label text-brass">Not in the archive</p>
        <h1 className="display mt-4 text-6xl">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          That page is not among the house records. It may have been moved, or never written.
        </p>
        <Link to="/" className="label mt-8 inline-flex border-b border-current pb-1 hover:text-brass">
          Return to the entrance
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display text-3xl">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. Try again, or return to the entrance.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="label border border-brass/60 px-6 py-3 !text-brass hover:bg-brass hover:!text-charcoal"
          >
            Try again
          </button>
          <a href="/" className="label border-b border-current pb-1 hover:text-brass">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${estate.name} — Premium Banquet Hall in Gorakhpur` },
      {
        name: "description",
        content: `${estate.name}: Premium Banquet Hall & Deluxe Rooms in Gorakhpur.`
      },
      { name: "author", content: estate.name },
      { name: "theme-color", content: "#171512" },
      { name: "keywords", content: "Banquet Hall in Gorakhpur, Best Banquet Hall in Gorakhpur, Banquet Hall Gorakhpur, Wedding Banquet Hall in Gorakhpur, Wedding Venue in Gorakhpur, Event Venue in Gorakhpur, Marriage Hall in Gorakhpur, Party Hall in Gorakhpur, Birthday Party Hall in Gorakhpur, Reception Hall in Gorakhpur, Best wedding venue in Gorakhpur, Banquet hall for wedding in Gorakhpur, Banquet hall for birthday party in Gorakhpur, Affordable banquet hall in Gorakhpur, AC banquet hall in Gorakhpur, Banquet hall with rooms in Gorakhpur, Banquet hall with parking in Gorakhpur, Reception venue in Gorakhpur, Family function hall in Gorakhpur, Event venue near Singhania Gorakhpur, Marriage hall near me, Wedding hall near me" },
      { property: "og:site_name", content: estate.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: logo },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Manrope:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["EventVenue", "LocalBusiness"],
          name: estate.name,
          description: "Premium Banquet Hall & Deluxe Rooms in Gorakhpur for Weddings, Corporate Events, and Celebrations.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Kunraghat",
            addressLocality: "Gorakhpur",
            addressRegion: "Uttar Pradesh",
            postalCode: "273008",
            addressCountry: "IN",
          },
          telephone: estate.phone,
          email: estate.email,
          url: "https://www.eventnestbanquet.in/",
          image: "https://www.eventnestbanquet.in/logo.png"
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[99] focus:border focus:border-brass focus:bg-charcoal focus:px-4 focus:py-3 focus:!text-brass"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <Preloader />
      <Nav />
      <Cursor />
      <PageTransition />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <div className="grain-layer" aria-hidden="true" />
      <div className="vignette-layer" aria-hidden="true" />
    </QueryClientProvider>
  );
}
