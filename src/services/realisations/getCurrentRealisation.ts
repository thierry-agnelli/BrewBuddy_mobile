import { env } from "@configs";
import { AuthToken, RealisationEvent } from "@models";
import { getService } from "../utils/getService.ts";

/**
 * Get current recipe realisation step service.
 */
function getCurrentRealisation(
  authToken: AuthToken,
): Promise<RealisationEvent[]> {
  const url = `${env.API_URL}/api/message/current`;
  const headers = {
    accept: "application/json",
    "Content-type": "application/json",
    Authorization: "Bearer " + authToken,
  };
  return getService<RealisationEvent[]>({ url, headers });
}

/* Exports */
export { getCurrentRealisation };
