import { env } from "@configs";
import { ServerError, AuthToken } from "@models";
import { serverErrorHandler } from "@utils";

/**
 * Delete User service.
 */
function deleteUser(id: number, authToken: AuthToken): Promise<string> {
  return new Promise((resolve, reject) =>
    fetch(`${env.API_URL}/api/users/${id}`, {
      method: "DELETE",
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

        resolve("Deleted");
      })
      .catch((error: ServerError) => {
        // Handling error.
        const message = serverErrorHandler(error);
        reject(message);
      }),
  );
}

/* Exports */
export { deleteUser };
