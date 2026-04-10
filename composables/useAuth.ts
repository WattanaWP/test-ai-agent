export type UserRole = "guest" | "user" | "admin";

export interface AuthUser {
  name: string;
  role: UserRole;
  permissions: string[];
}

const rolePermissions: Record<UserRole, string[]> = {
  guest: [],
  user: ["view", "comment"],
  admin: ["view", "comment", "create", "edit", "delete", "manage"],
};

const mockUsers: Record<UserRole, AuthUser> = {
  guest: { name: "Guest", role: "guest", permissions: rolePermissions.guest },
  user: { name: "John Doe", role: "user", permissions: rolePermissions.user },
  admin: {
    name: "Admin User",
    role: "admin",
    permissions: rolePermissions.admin,
  },
};

export const useAuth = () => {
  const currentUser = useState<AuthUser>("auth.user", () => mockUsers.guest);

  const setRole = (role: UserRole) => {
    currentUser.value = mockUsers[role];
  };

  const hasPermission = (permission: string): boolean => {
    return currentUser.value.permissions.includes(permission);
  };

  const hasRole = (role: UserRole): boolean => {
    return currentUser.value.role === role;
  };

  const isAuthenticated = computed(() => currentUser.value.role !== "guest");

  return {
    currentUser: readonly(currentUser),
    setRole,
    hasPermission,
    hasRole,
    isAuthenticated,
  };
};
