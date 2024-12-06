import { env } from "@configs";
import { serverErrorHandler } from "@utils";
import { BaseUser } from "@models";

/* Models */

/**
 * Login user data.
 */
type LoginUserData = BaseUser;

/**
 * Login server response
 */
type LoginResponse = {
  accessToken: string;
};

/**
 * Authenticate service.
 */
function authenticate(credentials: LoginUserData): Promise<string> {
  return new Promise((resolve, reject) =>
    fetch(`${env.API_URL}/api/login`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();

          return Promise.reject(error);
        }
        return res.json();
      })
      .then((json: LoginResponse) => resolve(json.accessToken))
      .catch((error) => {
        // Handling error.
        const message = serverErrorHandler(error);

        reject(message);
      }),
  );
}

/* Export */
export { authenticate };
