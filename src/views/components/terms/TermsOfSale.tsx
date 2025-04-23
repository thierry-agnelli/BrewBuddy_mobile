import { Terms } from "./components/Terms";
import { DrawerScreenViewProps, Routes } from "@models";

/**
 * Terms of uses View.
 *
 * @returns {JSX.Element} : The component.
 */
function TermsOfSale(props: DrawerScreenViewProps<Routes.TERMS_OF_SALE>) {
  return <Terms term="sale" {...props} />;
}

/* Exports */
export { TermsOfSale };
