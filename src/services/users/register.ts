import { env } from "@configs";
import { ServerError, BaseUser } from "@models";
import { serverErrorHandler } from "@utils";

/* Models */

/**
 * Register data.
 */
type RegisterUserData = BaseUser & {
  pseudo: string;
};

/**
 * Register service.
 */
function register(user: RegisterUserData): Promise<string> {
  return new Promise((resolve, reject) =>
    fetch(`${env.API_URL}/api/users`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();

          return Promise.reject(error);
        }
        resolve("Success");
      })
      .catch((error: ServerError) => {
        // Handling error.
        const message = serverErrorHandler(error);

        reject(message);
      }),
  );
}

/* Export */
export { register };
export type { RegisterUserData };
