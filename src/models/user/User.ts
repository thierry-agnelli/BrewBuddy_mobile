/**
 * User.
 */
type BaseUser = {
  email: string;
  password: string;
};

/**
 * User roles.
 */
enum UserRoles {
  USER,
  PREMIUM,
  MODERATOR,
  ADMIN,
}

export type { BaseUser };
export { UserRoles };
