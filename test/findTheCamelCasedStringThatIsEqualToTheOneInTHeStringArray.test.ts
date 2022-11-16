import { describe, expect, expectTypeOf, it } from "vitest";

import {
    findTheCamelCasedStringThatIsEqualToTheOneInTheStringArray,
  Regex,
} from "../lib/utils";




describe("findTheCamelCasedStringThatIsEqualToTheOneInTheStringArray", () => {
  const arrayOfStrings = ["foo", "bar", "baz"];
  const arrayOfSomeCamelCasedStrings = ["foo", "gBar", "oBaz", "lei", "rei"];

  it("finds the camel cased string that is in the string array", () => {
    findTheCamelCasedStringThatIsEqualToTheOneInTheStringArray(
      arrayOfStrings[0],
      arrayOfSomeCamelCasedStrings
    );
  });

  it("returns undefined if there is no value in the array", () => {
    findTheCamelCasedStringThatIsEqualToTheOneInTheStringArray(
      arrayOfSomeCamelCasedStrings[1],
      arrayOfStrings
    );
  });
});