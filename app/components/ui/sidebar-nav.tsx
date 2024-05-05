
import { Link, useLocation } from "@remix-run/react"

import { cn } from "./utils"
import { Button, buttonVariants } from "./button"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    to: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const location = useLocation();
  const pathname = location.pathname
  console.log(pathname)
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="justify-start" >
          <Button variant='ghost'
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.to
                ? "bg-[#232324] hover:bg-[#232324]"
                : "hover:bg-transparent hover:underline",
              "justify-start"
            )} >
            {item.title}
          </Button>
        </Link>
      ))
      }
    </nav >
  )
}
