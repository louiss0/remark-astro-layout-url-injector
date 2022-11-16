import {
  capitalizeTheStringOnlyIfTheNumberIsNotZeroAndReplaceEveryDashWithAnEmptyString,
  Regex,
} from "../lib/utils";
import { describe, expect, it } from "vitest";

describe("capitalizeTheStringOnlyIfTheNumberIsNotZeroAndReplaceEveryDashWithAnEmptyString works well", () => {
  const nonDashedString = "owpppmwiki";

  const dashedString = "ow-ppp-mw-i-ki";

  it("Capitalizes the string when the number is not zero", () => {
    const res =
      capitalizeTheStringOnlyIfTheNumberIsNotZeroAndReplaceEveryDashWithAnEmptyString(
        nonDashedString,
        0
      );

    expect(res).toBe(nonDashedString);
  });

  it("Doesn't Capitalize the string when the number is zero", () => {
    const res =
      capitalizeTheStringOnlyIfTheNumberIsNotZeroAndReplaceEveryDashWithAnEmptyString(
        nonDashedString,
        0
      );

    expect(res).toBe(nonDashedString);
  });

  it("Capitalizes strings that come from a matched string properly", () => {
    const inputString = "/src/pages/blog/nuxt/";

    const expectedResult = "blogNuxt";

    const inputMatch = inputString.match(
      Regex.STRING_WITH_SLASH_SRC_IN_FRONT_NEXT_TO_IT_SLASH_PAGES_AND_ANY_OTHER_CHARACTERS_AFTER
    )!;

    const extractedFolderName = inputMatch[1];

    const arrayCreatedByUsingSplitOnExtractedFolderName =
      extractedFolderName.split("/");

    const stringCreatedByCamelCasingThenJoiningArrayCreatedByUsingSplitOnExtractedFolderName =
      arrayCreatedByUsingSplitOnExtractedFolderName
        .map((value, index) =>
          capitalizeTheStringOnlyIfTheNumberIsNotZeroAndReplaceEveryDashWithAnEmptyString(
            value,
            index
          )
        )
        .join("");

    expect(
      stringCreatedByCamelCasingThenJoiningArrayCreatedByUsingSplitOnExtractedFolderName
    ).toBe(expectedResult);
  });
});
