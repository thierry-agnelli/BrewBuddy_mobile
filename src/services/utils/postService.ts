import { AuthToken, ServerError } from "@models";
import { serverErrorHandler } from "@utils";

/**
 * Post service props.
 */
type PostServiceProps<B extends object | undefined> = {
  url: string;
  body?: B;
  authToken?: AuthToken;
};

/**
 * Post service.
 */
function postService<
  B extends object | undefined,
  R extends object | undefined = B,
>({ url, body, authToken }: PostServiceProps<B>): Promise<R> {
  return new Promise((resolve, reject) =>
    fetch(url, {
      method: "POST",
      headers: {
        ...(body
          ? {
              accept: "application/json",
              "Content-type": "application/json",
            }
          : null),
        Authorization: "Bearer " + authToken,
      },
      ...(body ? { body: JSON.stringify(body) } : null),
    })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          return Promise.reject(error);
        }

        return res.json();
      })
      .then((json: R) => {
        resolve(json);
      })
      .catch((error: ServerError) => {
        // Handling error.
        const message = serverErrorHandler(error);
        reject(message);
      }),
  );
}

/* Export */
export { postService };
