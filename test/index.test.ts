import { describe, expect, expectTypeOf, it } from "vitest";
import astroMarkdownLayoutUrlInjector, { Regex } from "../lib";

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
      astroMarkdownLayoutUrlInjector({
        layoutsMap: { default: defaultLayout },
      })()
    ).toThrow(
      getExpectedErrorMessageForThrowIfStringHasAForwardSlashAtTheBeginning(
        defaultLayout
      )
    );
  });

  it("Throws an error when a a dot is in any of the strings has a dot in it", () => {
    const defaultLayout = "/ok";

    expect(
      astroMarkdownLayoutUrlInjector({
        layoutsMap: { default: defaultLayout },
      })()
    ).toThrow(
      getExpectedErrorMessageForThrowIfStringHasADotAnythingInItsName(
        defaultLayout
      )
    );
  });
});

describe("Strings are extracted properly from the regex's used", () => {
  const inputString = "/src/pages/post-two.md";

  const expectedFileOutput = "/post-two.md";
  const expectedFolderOutput = "foo/";

  const inputStringWithFolderBeyondPages = `/src/pages/${expectedFolderOutput}post-two.md`;

  it("matches the STRING_AHEAD_OF_SLASH_PAGES_OR_CONTENT_THAT_ENDS_WITH_DOT_MD_OR_MDX ", () => {
    const result = inputString.match(
      Regex.STRING_AHEAD_OF_SLASH_PAGES_THAT_ENDS_WITH_DOT_MD_OR_MDX
    );

    expectTypeOf(result).toBeArray();

    expect(result).not.toHaveLength(0);

    expect(result).toContain(expectedFileOutput);
  });

  it("matches the STRING_AHEAD_OF_SLASH_PAGES_OR_CONTENT_THAT_ENDS_WITH_A_SLASH", () => {
    const result = inputStringWithFolderBeyondPages.match(
      Regex.STRING_AHEAD_OF_SLASH_PAGES_THAT_ENDS_WITH_A_SLASH
    );

    expectTypeOf(result).toBeArray();

    expect(result).not.toHaveLength(0);

    expect(result).toContain(expectedFolderOutput);
  });

  it("STRING_AHEAD_OF_SLASH_PAGES_OR_CONTENT_THAT_ENDS_WITH_DOT_MD_OR_MDX has the match at at the zero index", () => {
    const result = inputString.match(
      Regex.STRING_AHEAD_OF_SLASH_PAGES_THAT_ENDS_WITH_DOT_MD_OR_MDX
    )!;

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

  it("STRING_AHEAD_OF_SLASH_PAGES_OR_CONTENT_THAT_ENDS_WITH_A_SLASH has the at the second index", () => {
    const result = inputStringWithFolderBeyondPages.match(
      Regex.STRING_AHEAD_OF_SLASH_PAGES_THAT_ENDS_WITH_A_SLASH
    )!;
    expect(result).toHaveLength(2);
    expect(result[1]).not.toBe(null);
    expect(result[1]).toBe(expectedFolderOutput);
  });
});

describe("A proper layout url can be created properly", () => {
  const expectedFolderOutput = "react/";
  const inputStringWithFolderBeyondPages = `/src/pages/${expectedFolderOutput}post-two.md`;

  const layoutsMap = {
    "react/": "layouts/react-posts",
  };

  it("File layout url is  properly created based on whether or not the key in a layout map matches the string", () => {
    const matchArray = inputStringWithFolderBeyondPages.match(
      Regex.STRING_AHEAD_OF_SLASH_PAGES_THAT_ENDS_WITH_A_SLASH
    )!;

    const extractedString = matchArray[1];

    expect(matchArray).toHaveLength(2);
    expect(extractedString).not.toBe(null);
    expect(extractedString).toBe(expectedFolderOutput);

    expect(`/src/pages/${layoutsMap[extractedString]}`).toBe(
      "/src/pages/layouts/react-posts"
    );
  });
});
