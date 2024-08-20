import { isRouteErrorResponse, Outlet, Link, useLoaderData, useFetcher, Form, useSubmit, useLocation, useNavigate, useRouteError, NavLink } from "@remix-run/react";

export default function SettingsLayout() {
  const location = useLocation();
  const pathname = location.pathname
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Import / Export</h1>
      </div>
      <div className="mx-auto grid w-full max-w-7xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"        >
          <NavLink to="units"
            className={`flex items-center gap-2 text-lg font-semibold md:text-base
              ${pathname === "/dealer/admin/importexport/units" ? ' font-semibold text-primary ' : 'text-muted-foreground'}`}>
            Units
          </NavLink>
          <NavLink to="clients"
            className={`flex items-center gap-2 text-lg font-semibold md:text-base
              ${pathname === "/dealer/admin/importexport/clients" ? ' font-semibold text-primary ' : 'text-muted-foreground'}`}>
            Clients
          </NavLink>
          <NavLink to="quotes"
            className={`flex items-center gap-2 text-lg font-semibold md:text-base
              ${pathname === "/dealer/admin/importexport/quotes" ? ' font-semibold text-primary ' : 'text-muted-foreground'}`}>
            Quotes
          </NavLink>
          <NavLink to="acc"
            className={`flex items-center gap-2 text-lg font-semibold md:text-base
              ${pathname === "/dealer/admin/importexport/acc" ? ' font-semibold text-primary ' : 'text-muted-foreground'}`}>
            Parts/Accessories
          </NavLink>
        </nav>
        <Outlet />
      </div>
    </main>
  )
}
