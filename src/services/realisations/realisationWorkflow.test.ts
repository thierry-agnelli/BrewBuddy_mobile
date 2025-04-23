import { describe, expect, it, jest } from "@jest/globals";
import * as postModule from "../utils/postService.ts";
import { env } from "@configs";
import { realisationWorkflow } from "./realisationWorkflow.ts";

/**
 *  Realisation workflow service test.
 */

describe("Realisation workflow service test", () => {
  // Should be defined.
  it("Should be defined", () => {
    expect(realisationWorkflow).toBeDefined();
  });

  describe("tests", () => {
    it("Should call get service", () => {
      const getSpy = jest.spyOn(postModule, "postService");
      realisationWorkflow("some-id", "test-token");
      const mockedUrl = `${env.API_URL}/api/message/workflow/some-id`;

      expect(getSpy).toBeCalledWith({
        url: mockedUrl,
        authToken: "test-token",
      });
    });
  });
});
