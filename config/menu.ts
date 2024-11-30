import { Library, Tags, RefreshCw, Settings, Database, FileText } from "lucide-react"
import { type LucideIcon } from "lucide-react"

export interface MenuItem {
    title: string
    url: string
    icon: LucideIcon
    items?: MenuItem[]
}

export const menuItems: MenuItem[] = [
    {
        title: "Categories",
        url: "/categories",
        icon: Tags,
    },
    {
        title: "Tools",
        url: "/tools",
        icon: Library,
    },
    {
        title: "Content Blocks",
        url: "/blocks",
        icon: FileText,
    },
    {
        title: "Content Sources",
        url: "/sources",
        icon: Database,
    },
    {
        title: "Sync",
        url: "/sync",
        icon: RefreshCw,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]

// Helper function to get menu item title by path
export function getMenuTitle(path: string): string {
    const menuItem = menuItems.find(item => item.url === `/${path}`)
    return menuItem?.title || path
} 