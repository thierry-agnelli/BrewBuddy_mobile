import { env } from "@configs";
import { ServerError, UserModel, BaseUser, AuthToken } from "@models";
import { serverErrorHandler } from "@utils";

/**
 * Update User service.
 */
function updateUser(
  id: number,
  userInfo: Partial<BaseUser>,
  authToken: AuthToken,
): Promise<UserModel> {
  return new Promise((resolve, reject) =>
    fetch(`${env.API_URL}/api/users/${id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + authToken,
      },
      body: JSON.stringify(userInfo),
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
export { updateUser };
