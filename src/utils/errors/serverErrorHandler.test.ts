import { describe, expect, it } from "@jest/globals";
import { serverErrorHandler } from "./serverErrorHandler";
import { ServerError } from "@models";

/**
 * serverErrorHandler utils test.
 */
describe("serverErrorHandler utils test", () => {
  it("Should be defined", () => {
    expect(serverErrorHandler).toBeDefined();
  });

  describe("test", () => {
    it("Should return valid error message", () => {
      const errors: ServerError[] = [
        {
          status: 404,
          error: "",
          message: "Bière introuvable. Veuillez vérifier votre frigo.",
        },
        { status: 401, error: "", message: "Erreur d'authentification." },
        {
          status: 422,
          error: "IncorrectEmailFormat",
          message: "Email incorrect.",
        },
        {
          status: 422,
          error: "WeakPassword",
          message: "Sécurité du mot de passe trop faible.",
        },
        {
          status: 422,
          error: "",
          message: "Une erreur sauvage est apparue.",
        },
        // any other values
        {
          status: 0,
          error: "",
          message: "Une erreur sauvage est apparue.",
        },
      ];

      errors.forEach((error) =>
        expect(serverErrorHandler(error)).toBe(error.message),
      );
    });
  });
});
