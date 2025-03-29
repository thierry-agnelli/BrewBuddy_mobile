import { env } from "@configs";
import { AuthToken, ServerError, UserModel } from "@models";
import { serverErrorHandler } from "@utils";

/**
 * Get User service.
 */
function getUser(id: number, authToken: AuthToken): Promise<UserModel> {
  return new Promise((resolve, reject) =>
    fetch(`${env.API_URL}/api/users/${id}`, {
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();

          return Promise.reject(error);
        }

        return res.json();
      })
      .then((json: UserModel) => resolve(json))
      .catch((error: ServerError) => {
        // Handling error.
        const message = serverErrorHandler(error);

        reject(message);
      }),
  );
}

/* Exports */
export { getUser };
