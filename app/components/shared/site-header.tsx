/* eslint-disable tailwindcss/no-arbitrary-value */
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ButtonIcon,
  ButtonIconAnchor,
  ButtonLink,
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Icon,
  Logo,
  RemixLinkText,
  RemixNavLink,
} from "~/components";
import { ThemeToggleButton } from "~/components";
import { configSite } from "~/configs";
import { useRootLoaderData } from "~/hooks";
import {
  CreditCard,
  Github,
  Keyboard,
  LogOut,
  Menu,
  Settings,
  Twitter,
  User,
} from "~/icons";
import { cn, getInitials } from "~/utils";

import type { UserData } from "~/helpers";

interface Props {
  noThemeToggle?: boolean;
}

export function SiteHeader({ noThemeToggle }: Props) {
  const { user } = useRootLoaderData();

  return (
    <header
      className={cn(
        "border-b border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-900",
        "w-full border-b py-4",
        "sticky top-0 left-0 right-0 z-40" // to work with the layout and nprogress
      )}
    >
      <section
        className={cn(
          "contain flex items-center justify-between gap-1 sm:gap-2",
          "h-6 sm:h-8" // height of the site header
        )}
      >
        <div className="flex w-full items-center justify-between gap-1 sm:gap-2">
          <HeaderMainLogo noThemeToggle={noThemeToggle} />
          <HeaderMainNavigation navItems={configSite?.navItems} />
          <HeaderMainButtons user={user} />
        </div>

        <div className="flex lg:hidden">
          <HeaderMenuNavigation navItems={configSite?.navItems} />
        </div>
      </section>
    </header>
  );
}

export function HeaderMainLogo({ noThemeToggle }: { noThemeToggle?: boolean }) {
  return (
    <div className="stack-h-center gap-1 lg:gap-2">
      <RemixNavLink
        to="/"
        prefetch="intent"
        className="transition-opacity hover:opacity-80"
      >
        <Logo />
      </RemixNavLink>

      {!noThemeToggle && <ThemeToggleButton />}
    </div>
  );
}

export function HeaderMainNavigation({
  navItems,
}: {
  navItems: typeof configSite.navItems;
}) {
  return (
    <nav className="hidden gap-1 lg:flex">
      {navItems?.map(
        (item, index) =>
          item?.to && (
            <RemixNavLink
              key={index}
              to={item.to}
              prefetch="intent"
              className={({ isActive }) =>
                cn(
                  "flex gap-2 p-2",
                  buttonVariants({
                    variant: "navlink",
                    radius: "default",
                    weight: "default",
                    size: "default",
                    isActive,
                  })
                )
              }
            >
              <Icon name={item.icon} />
              <span>{item.title}</span>
            </RemixNavLink>
          )
      )}
    </nav>
  );
}

export function HeaderMainButtons({ user }: { user?: UserData }) {
  return (
    <div className="flex grow items-center justify-end space-x-2">
      <nav className="hidden gap-1 md:flex">
        <ButtonIconAnchor
          href={configSite?.links.github}
          variant="ghost"
          accent="surface"
        >
          <Github />
          <span className="sr-only">GitHub</span>
        </ButtonIconAnchor>
        <ButtonIconAnchor
          href={configSite?.links.twitter}
          variant="ghost"
          accent="surface"
        >
          <Twitter />
          <span className="sr-only">Twitter</span>
        </ButtonIconAnchor>
      </nav>

      <nav className="flex items-center gap-1">
        {!user && (
          <>
            <ButtonLink variant="ghost" to="/login" className="hidden md:flex">
              Login
            </ButtonLink>
            <ButtonLink variant="subtle" to="/register" className="flex">
              Register
            </ButtonLink>
          </>
        )}

        {user && <HeaderUser user={user} />}
      </nav>
    </div>
  );
}

export function HeaderMenuNavigation({
  navItems,
}: {
  navItems: typeof configSite.navItems;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ButtonIcon variant="ghost" size="lg" className="lg:hidden">
          <Menu className="size-lg" />
          <span className="sr-only font-bold">Menu</span>
        </ButtonIcon>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 overflow-scroll">
        <DropdownMenuLabel>
          <RemixNavLink
            to="/"
            prefetch="intent"
            className="transition-opacity hover:opacity-80"
          >
            <Logo size="sm" accent="muted" />
          </RemixNavLink>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {navItems?.map(
          (item, index) =>
            item.to && (
              <DropdownMenuItem key={index} asChild>
                <RemixNavLink to={item.to} prefetch="intent">
                  <Icon name={item.icon} />
                  <span className="ml-2">{item.title}</span>
                </RemixNavLink>
              </DropdownMenuItem>
            )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function HeaderUser({ user }: { user: UserData }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage
              src={`https://github.com/mhaidarhanif.png`}
              alt={user.name}
            />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 overflow-scroll"
        forceMount
      >
        <DropdownMenuLabel>
          <h5>{user.name}</h5>
          <h6>
            <RemixLinkText to={`/${user.username}`}>
              @{user.username}
            </RemixLinkText>
          </h6>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <RemixNavLink to={`/user/profile`}>
              <User className="size-sm mr-2" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </RemixNavLink>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <RemixNavLink to={`/user/dashboard`}>
              <User className="size-sm mr-2" />
              <span>Dashboard</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </RemixNavLink>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <RemixNavLink to={`/user/settings`}>
              <Settings className="size-sm mr-2" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </RemixNavLink>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <CreditCard className="size-sm mr-2" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Keyboard className="size-sm mr-2" />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <RemixNavLink to="/logout">
            <LogOut className="size-sm mr-2" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </RemixNavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
