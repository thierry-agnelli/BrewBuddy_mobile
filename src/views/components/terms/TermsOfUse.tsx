import { Terms } from "./components/Terms";
import { DrawerScreenViewProps } from "@models";

/**
 * Terms of uses View.
 *
 * @returns {JSX.Element} : The component.
 */
function TermsOfUse(props: DrawerScreenViewProps) {
  return <Terms term="use" {...props} />;
}

/* Exports */
export { TermsOfUse };
