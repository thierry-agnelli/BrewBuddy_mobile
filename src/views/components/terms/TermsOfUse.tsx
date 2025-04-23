import { Terms } from "./components/Terms";
import { DrawerScreenViewProps, Routes } from "@models";

/**
 * Terms of uses View.
 *
 * @returns {JSX.Element} : The component.
 */
function TermsOfUse(props: DrawerScreenViewProps<Routes.TERMS_OF_USE>) {
  return <Terms term="use" {...props} />;
}

/* Exports */
export { TermsOfUse };
