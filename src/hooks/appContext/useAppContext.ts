import { useContext } from "react";
import { AppContext } from "@components";

/**
 * get App context values;
 */
function useAppContext() {
  return useContext(AppContext);
}

/* Exports */
export { useAppContext };
