import { ServerError } from "@models";
import { serverErrorHandler } from "@utils";

/**
 * Get service props.
 */
type GetServiceProps = {
  url: string;
  headers?: HeadersInit_;
};

/**
 * get Service
 */
function getService<T>({ url, headers }: GetServiceProps): Promise<T> {
  return new Promise((resolve, reject) =>
    fetch(url, {
      headers,
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          return Promise.reject(error);
        }
        return res.json();
      })
      .then((json: T) => {
        resolve(json);
      })
      .catch((error: ServerError) => {
        // Handling error.
        const message = serverErrorHandler(error);

        reject(message);
      }),
  );
}

/* Exports */
export { getService };
