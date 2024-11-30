"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { getMenuTitle } from "@/config/menu";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

function generateBreadcrumbs(pathname: string): Breadcrumb[] {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs: Breadcrumb[] = [];

  let currentPath = '';
  paths.forEach((path, index) => {
    currentPath += `/${path}`;

    // Handle known menu items
    const menuTitle = getMenuTitle(path);
    if (menuTitle) {
      breadcrumbs.push({
        label: menuTitle,
        href: currentPath,
        active: index === paths.length - 1
      });
      return;
    }

    // Handle dynamic segments
    if (path === 'new') {
      breadcrumbs.push({
        label: 'New',
        href: currentPath,
        active: true
      });
    } else if (path === 'edit') {
      breadcrumbs.push({
        label: 'Edit',
        href: currentPath,
        active: true
      });
    }
  });

  return breadcrumbs;
}

export function AppBreadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>

      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link
            href={breadcrumb.href}
            className={cn(
              "hover:text-foreground transition-colors",
              breadcrumb.active && "text-foreground font-medium"
            )}
          >
            {breadcrumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}