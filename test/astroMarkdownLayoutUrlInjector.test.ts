import astroMarkdownLayoutUrlInjector from "../lib";
import { describe, expect, it } from "vitest";

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
      astroMarkdownLayoutUrlInjector({ layoutsMap: {default: defaultLayout} })()
    ).toThrow(
      getExpectedErrorMessageForThrowIfStringHasAForwardSlashAtTheBeginning(
        defaultLayout
      )
    );
  });

  it("Throws an error when a a dot is in any of the strings has a dot in it", () => {
    const defaultLayout = "/ok";

    expect(
      astroMarkdownLayoutUrlInjector({ layoutsMap: {default: defaultLayout } })()
    ).toThrow(
      getExpectedErrorMessageForThrowIfStringHasADotAnythingInItsName(
        defaultLayout
      )
    );
  });
});
