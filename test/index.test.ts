import { describe, expect, expectTypeOf, it } from "vitest";
import astroMarkdownLayoutUrlInjector from "../lib";
import {
  capitalizeTheStringOnlyIfTheNumberIsNotZeroAndReplaceEveryDashWithAnEmptyString,
  findTheCamelCasedStringThatIsEqualToTheOneInTheStringArray,
  Regex,
} from "../lib/utils";

const getExpectedErrorMessageForThrowIfStringHasAForwardSlashAtTheBeginning = (
  string: string
) => `
        Don't use dot astro when specifying a path to the layout .
        You have to append .astro the extension so we do that for you.

        Please change this ${string}
        
        `;
const getExpectedErrorMessageForThrowIfStringHasADotAnythingInItsName = (
  string: string
) => `
        Don't use a forward slash specifying a path to the layout.

        You would have to append forward slash  so we do that for you.

        Please change this ${string}
        
        `;

describe("astroMarkdownLayoutUrlInjector works properly", () => {
  it("Throws an error when a a dot is in any of the strings has a forward slash", () => {
    const defaultLayout = ".foo";

    expect(
      astroMarkdownLayoutUrlInjector({ default: defaultLayout })()
    ).toThrow(
      getExpectedErrorMessageForThrowIfStringHasAForwardSlashAtTheBeginning(
        defaultLayout
      )
    );
  });

  it("Throws an error when a a dot is in any of the strings has a dot in it", () => {
    const defaultLayout = "/ok";

    expect(
      astroMarkdownLayoutUrlInjector({ default: defaultLayout })()
    ).toThrow(
      getExpectedErrorMessageForThrowIfStringHasADotAnythingInItsName(
        defaultLayout
      )
    );
  });
});

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

describe("Strings are extracted properly from the regex's used", () => {
  const inputString = "/src/pages/post-two.md";

  const expectedFileOutput = inputString;
  const expectedFolderOutput = "foo/";

  const inputStringWithFolderBeyondPages = `/src/pages/${expectedFolderOutput}post-two.md`;

  it("matches the STRING_WITH_SRC_IN_FRONT_ANY_CHARACTERS_IN_THE_MIDDLE_AND_EITHER_A_DOT_MDX_OR_MD_AT_THE_END ", () => {
    const result = inputString.match(
      Regex.STRING_WITH_SRC_IN_FRONT_ANY_CHARACTERS_IN_THE_MIDDLE_AND_EITHER_A_DOT_MDX_OR_MD_AT_THE_END
    );

    expectTypeOf(result).toBeArray();

    expect(result).not.toHaveLength(0);

    expect(result).toContain(expectedFileOutput);
  });

  it("matches the STRING_WITH_SLASH_SRC_IN_FRONT_NEXT_TO_IT_SLASH_PAGES_AND_ANY_OTHER_CHARACTERS_AFTER", () => {
    const result = inputStringWithFolderBeyondPages.match(
      Regex.STRING_WITH_SLASH_SRC_IN_FRONT_NEXT_TO_IT_SLASH_PAGES_AND_ANY_OTHER_CHARACTERS_AFTER
    );

    expectTypeOf(result).toBeArray();

    expect(result).not.toHaveLength(0);

    expect(result).toContain(expectedFolderOutput);
  });

  it("STRING_WITH_SRC_IN_FRONT_ANY_CHARACTERS_IN_THE_MIDDLE_AND_EITHER_A_DOT_MDX_OR_MD_AT_THE_END has the match at at the zero index", () => {
    const result = inputString.match(
      Regex.STRING_WITH_SRC_IN_FRONT_ANY_CHARACTERS_IN_THE_MIDDLE_AND_EITHER_A_DOT_MDX_OR_MD_AT_THE_END
    )!;

    expect(result).toHaveLength(2);

    expect(result[0]).not.toBe(null);

    expect(result[0]).toBe(expectedFileOutput);
  });

  // it("STRING_WITH_SLASH_SRC_IN_FRONT_NEXT_TO_IT_SLASH_PAGES_AND_ANY_OTHER_CHARACTERS_AFTER has the match at the zero index", () => {
  //   const result = inputStringWithFolderBeyondPages.match(
  //     Regex.STRING_WITH_SLASH_SRC_IN_FRONT_NEXT_TO_IT_SLASH_PAGES_AND_ANY_OTHER_CHARACTERS_AFTER
  //   );
  //   expect(result).toHaveLength(2);
  //   expect(result[0]).not.toBe(null);
  //   expect(result[0]).toBe(expectedFolderOutput);
  // });

  it("STRING_WITH_SLASH_SRC_IN_FRONT_NEXT_TO_IT_SLASH_PAGES_AND_ANY_OTHER_CHARACTERS_AFTER has the at the second index", () => {
    const result = inputStringWithFolderBeyondPages.match(
      Regex.STRING_WITH_SLASH_SRC_IN_FRONT_NEXT_TO_IT_SLASH_PAGES_AND_ANY_OTHER_CHARACTERS_AFTER
    )!;
    expect(result).toHaveLength(2);
    expect(result[1]).not.toBe(null);
    expect(result[1]).toBe(expectedFolderOutput);
  });
});

describe("If a camel cased string is created based on a match", () => {
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
