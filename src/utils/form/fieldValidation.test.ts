import { describe, expect, it } from "@jest/globals";

import { fieldValidation } from "./fieldValidation";
import { REGEXP } from "@helpers";

/**
 * fieldValidation utils test.
 */

describe("fieldValidation utils test", () => {
  it("Should be defined", () => {
    expect(fieldValidation).toBeDefined();
  });

  describe("test", () => {
    it("Should validate value vs regexp", () => {
      const testValue = "1.Azerty";
      expect(fieldValidation(testValue, REGEXP.password)).toStrictEqual({
        field: false,
        required: false,
      });
    });

    it("Should return field error if not valid vs regexp", () => {
      const testValue = "not valid";
      expect(fieldValidation(testValue, REGEXP.password)).toStrictEqual({
        field: true,
        required: false,
      });
    });

    it("Should return full error if undefined value", () => {
      const testValue = undefined;
      expect(fieldValidation(testValue)).toStrictEqual({
        field: true,
        required: true,
      });
    });
  });
});
