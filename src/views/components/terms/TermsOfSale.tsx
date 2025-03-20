import { Terms } from "./components/Terms";
import { DrawerScreenViewProps } from "@models";

/**
 * Terms of uses View.
 *
 * @returns {JSX.Element} : The component.
 */
function TermsOfSale(props: DrawerScreenViewProps) {
  return <Terms term="sale" {...props} />;
}

/* Exports */
export { TermsOfSale };
