import { ServerError, AuthToken } from "@models";
import { serverErrorHandler } from "@utils";

/**
 * Update service props.
 */
type UpdateServiceProps<B extends object> = {
  url: string;
  body?: B;
  authToken?: AuthToken;
};

/**
 * Update User service.
 */
function updateService<B extends object, R extends object = B>({
  url,
  body,
  authToken,
}: UpdateServiceProps<B>): Promise<R> {
  return new Promise((resolve, reject) =>
    fetch(url, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + authToken,
      },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();

          return Promise.reject(error);
        }

        return res.json();
      })
      .then((json: R) => resolve(json))
      .catch((error: ServerError) => {
        // Handling error.
        const message = serverErrorHandler(error);
        reject(message);
      }),
  );
}

/* Exports */
export { updateService };
