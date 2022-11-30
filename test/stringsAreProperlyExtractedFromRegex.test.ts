import { describe, expect, expectTypeOf, it } from "vitest";
import {
  Regex,
} from "../lib";


describe("Strings are extracted properly from the regex's used", () => {
  const inputString = "/src/pages/post-two.md";

  const expectedFileOutput = "/post-two.md";
  const expectedFolderOutput = "foo/";

  const inputStringWithFolderBeyondPages = `/src/pages/${expectedFolderOutput}post-two.md`;

  it("matches the STRING_AHEAD_OF_SLASH_PAGES_OR_CONTENT_THAT_ENDS_WITH_DOT_MD_OR_MDX ", () => {
    const result = inputString.match(
      Regex.STRING_AHEAD_OF_SLASH_PAGES_OR_CONTENT_THAT_ENDS_WITH_DOT_MD_OR_MDX
    );

    expectTypeOf(result).toBeArray();

    expect(result).not.toHaveLength(0);

    expect(result).toContain(expectedFileOutput);
  });

  it("matches the STRING_AHEAD_OF_SLASH_PAGES_OR_CONTENT_THAT_ENDS_WITH_A_SLASH", () => {
    const result = inputStringWithFolderBeyondPages.match(
      Regex.STRING_AHEAD_OF_SLASH_PAGES_OR_CONTENT_THAT_ENDS_WITH_A_SLASH
    );

    expectTypeOf(result).toBeArray();

    expect(result).not.toHaveLength(0);

    expect(result).toContain(expectedFolderOutput);
  });

  it("STRING_AHEAD_OF_SLASH_PAGES_OR_CONTENT_THAT_ENDS_WITH_DOT_MD_OR_MDX has the match at at the one index", () => {
    const result = inputString.match(
      Regex.STRING_AHEAD_OF_SLASH_PAGES_OR_CONTENT_THAT_ENDS_WITH_DOT_MD_OR_MDX
    )!;

    expect(result).toHaveLength(2);

    expect(result[1]).not.toBe(null);

    expect(result[1]).toBe(expectedFileOutput);
  });

  // it("STRING_AHEAD_OF_SLASH_PAGES_OR_CONTENT_THAT_ENDS_WITH_A_SLASH has the match at the zero index", () => {
  //   const result = inputStringWithFolderBeyondPages.match(
  //     Regex.STRING_AHEAD_OF_SLASH_PAGES_OR_CONTENT_THAT_ENDS_WITH_A_SLASH
  //   );
  //   expect(result).toHaveLength(2);
  //   expect(result[0]).not.toBe(null);
  //   expect(result[0]).toBe(expectedFolderOutput);
  // });

  
});