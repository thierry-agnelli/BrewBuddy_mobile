import { env } from "@configs";
import { AuthToken, EventData, RealisationEvent } from "@models";

import { postService } from "../utils/postService.ts";

async function realisationWorkflow<D extends EventData>(
  recipeId: string,
  authToken: AuthToken,
): Promise<RealisationEvent<D>> {
  const url = `${env.API_URL}/api/message/workflow/${recipeId}`;
  return await postService<undefined, RealisationEvent<D>>({
    url,
    authToken,
  });
}

/* Exports */
export { realisationWorkflow };
