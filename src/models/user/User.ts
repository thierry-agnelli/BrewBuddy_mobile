/**
 * User roles.
 */
enum UserRoles {
  USER,
  PREMIUM,
  MODERATOR,
  ADMIN,
}

/**
 * User.
 */
type BaseUser = {
  email: string;
  password: string;
};

/**
 * User.
 */
type User = Omit<BaseUser, "password"> & {
  id: number;
  pseudo: string;
  iat: number;
  roleName: keyof typeof UserRoles;
  role: UserRoles;
};

type UserModel = Omit<User, "role" | "roleName"> & {
  role: keyof typeof UserRoles;
};

export type { BaseUser, User, UserModel };
export { UserRoles };
