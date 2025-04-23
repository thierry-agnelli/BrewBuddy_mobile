import { env } from "@configs";
import { AuthToken, IngredientEventData, RealisationEvent } from "@models";
import { getService } from "../utils/getService.ts";

/**
 * Start recipe realisation service.
 */
async function startRealisation(
  recipeId: string,
  authToken: AuthToken,
): Promise<RealisationEvent<IngredientEventData[]>> {
  const url = `${env.API_URL}/api/message/start/${recipeId}`;
  const headers = {
    accept: "application/json",
    "Content-type": "application/json",
    Authorization: "Bearer " + authToken,
  };

  return await getService<RealisationEvent<IngredientEventData[]>>({
    url,
    headers,
  });
}

/* Exports */
export { startRealisation };
