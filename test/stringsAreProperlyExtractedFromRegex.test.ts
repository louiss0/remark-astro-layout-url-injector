import { describe, expect, expectTypeOf, it } from "vitest";
import {
  Regex,
} from "../lib/utils";


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
      Regex.STRING_AHEAD_OF_SLASH_SRC_SLASH_PAGES_THAT_ENDS_WITH_A_SLASH
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

  
});