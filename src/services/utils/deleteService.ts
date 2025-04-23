import { ServerError, AuthToken } from "@models";
import { serverErrorHandler } from "@utils";

/**
 * Delete service props
 */
type DeleteServiceProps = {
  url: string;
  authToken?: AuthToken;
};

/**
 * Delete User service.
 */
function deleteService({
  url,
  authToken,
}: DeleteServiceProps): Promise<string> {
  return new Promise((resolve, reject) =>
    fetch(url, {
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
export { deleteService };
