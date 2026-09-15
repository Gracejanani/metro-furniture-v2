import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Layers,
  Tag,
  Boxes,
  Users,
  Receipt,
  CreditCard,
  RotateCcw,
  BarChart3,
  LineChart,
  Settings,
  UserCog,
} from "lucide-react";

export const posNavGroups = [
  {
    label: "Main",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/pos", label: "POS / New Sale", icon: ShoppingCart },
      { href: "/products", label: "Products", icon: Package },
      { href: "/categories", label: "Categories", icon: Layers },
      { href: "/price-tags", label: "Price Tags", icon: Tag },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/inventory", label: "Inventory", icon: Boxes },
      { href: "/customers", label: "Customers", icon: Users },
      { href: "/sales", label: "Sales", icon: Receipt },
      { href: "/payments", label: "Payments", icon: CreditCard },
      { href: "/returns", label: "Returns", icon: RotateCcw },
    ],
  },
  {
    label: "Insights",
    items: [
      { href: "/reports", label: "Reports", icon: BarChart3 },
      { href: "/analytics", label: "Analytics", icon: LineChart },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/settings", label: "Settings", icon: Settings },
      { href: "/users", label: "Users & Roles", icon: UserCog },
    ],
  },
];
