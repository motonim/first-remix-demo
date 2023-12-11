// import { cssBundleHref } from "@remix-run/css-bundle";
import styles from "~/styles/main.css";
import MainNavigation from "./components/MainNavigation";

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

// export const links = () => [
//   ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [{ rel: "stylesheet", href: styles }]),
// ];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <Meta /> */}
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caughtResponse = useCatch();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
        <title>{caughtResponse.statusText}</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>{caughtResponse.statusText}</h1>
          <p>{caughtResponse.data?.message || 'Something went wrong'}</p>
          <p>Back to <Link to="/">safety</Link></p>
        </main>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({error}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
        <title>An error occured!</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>An error occured! Please try again</h1>
          <p>{error.message}</p>
          <p>Back to <Link to="/">safety</Link></p>
        </main>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [{rel: 'stylesheet', href: styles}]
}


/**
 * Metadata
 */

export const meta = () => ({
  charset: 'utf-8',
  title: 'Remix App',
  viewport: 'width=device-width, initial-scale=1'
}) 