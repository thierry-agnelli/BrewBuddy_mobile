import { ServerError } from "@models";

/**
 * Server error handling.
 */
function serverErrorHandler(error: ServerError): string {
  switch (error.status) {
    case 404:
      return "Bière introuvable. Veuillez vérifier votre frigo.";
    case 401:
      return "Erreur d'authentification.";
    case 422:
      return errorMessageHandler(error.error);
    default:
      return "Une erreur sauvage est apparue.";
  }
}

/**
 * Handle error message from server.
 */
function errorMessageHandler(message: string): string {
  switch (message) {
    case "IncorrectEmailFormat":
      return "Email incorrect.";
    case "WeakPassword":
      return "Sécurité du mot de passe trop faible.";
    default:
      return "Une erreur sauvage est apparue.";
  }
}

/* Exports */
export { serverErrorHandler };
