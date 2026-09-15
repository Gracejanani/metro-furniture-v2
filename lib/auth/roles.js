export const ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  CASHIER: "CASHIER",
};

const ROLE_RANK = { ADMIN: 3, MANAGER: 2, CASHIER: 1 };

export function hasMinRole(userRole, minRole) {
  return (ROLE_RANK[userRole] || 0) >= (ROLE_RANK[minRole] || 0);
}

export const POS_PROTECTED_PREFIXES = [
  "/dashboard",
  "/pos",
  "/products",
  "/categories",
  "/inventory",
  "/customers",
  "/sales",
  "/payments",
  "/returns",
  "/price-tags",
  "/reports",
  "/settings",
  "/users",
  "/analytics",
];

export const AUTH_ROUTES = ["/login"];

export function isPosRoute(pathname) {
  if (AUTH_ROUTES.includes(pathname)) return true;
  return POS_PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}
