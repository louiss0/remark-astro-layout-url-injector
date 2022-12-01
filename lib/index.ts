import {
  throwIfStringHasADotAnythingInItsName,
  throwIfStringHasAForwardSlashAtTheBeginning,
} from "./error";

type FolderName = string;
type LayoutPath = string;

type AstroAutoLayoutConfig = {
  sourceFolder?: string;
  layoutsMap: {
    default: string;
    [key: FolderName]: LayoutPath;
  };
};

export const Regex = {
  STRING_AHEAD_OF_SLASH_PAGES_THAT_ENDS_WITH_DOT_MD_OR_MDX:
    /(?=\/(?:pages)(\/.+\.mdx?))/,
  STRING_AHEAD_OF_SLASH_PAGES_THAT_ENDS_WITH_A_SLASH: /(?=\/(?:pages)\/(.+\/))/,
} as const;

interface VFile {
  data: {
    astro: {
      frontmatter: Record<string, unknown>;
    };
  };
  messages: Array<string>;
  history: Array<string>;
  cwd: string;
  value: string;
}

const firstIndex = 0,
  secondIndex = 1;

export default function astroMarkdownLayoutUrlInjector({
  sourceFolder = "src/",
  layoutsMap,
}: AstroAutoLayoutConfig) {
  return () => (_: unknown, file: VFile) => {
    Object.values(layoutsMap).forEach((value) => {
      throwIfStringHasADotAnythingInItsName(value);
      throwIfStringHasAForwardSlashAtTheBeginning(value);
    });

    const frontMatterLayout = file.data.astro.frontmatter?.layout;

    if (frontMatterLayout) return;

    const currentFile = file.history[firstIndex];
    const stringExtractedByMatchingForSrcAnyUnlimitedAmountOfCharactersThenDotMdx =
      currentFile.match(
        Regex.STRING_AHEAD_OF_SLASH_PAGES_THAT_ENDS_WITH_DOT_MD_OR_MDX
      )?.[1];

    const arrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash =
      stringExtractedByMatchingForSrcAnyUnlimitedAmountOfCharactersThenDotMdx
        ? currentFile?.match(
            Regex.STRING_AHEAD_OF_SLASH_PAGES_THAT_ENDS_WITH_A_SLASH
          )
        : null;

    if (
      !arrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash
    ) {
      file.data.astro.frontmatter.layout = `/${sourceFolder}${layoutsMap.default}.astro`;
      return;
    }

    const secondMatchFromArrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash =
      arrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash[
        secondIndex
      ];

    const accessedValueFromLayoutsMapOrTheDefaultValue =
      layoutsMap[
        secondMatchFromArrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash
      ] ?? layoutsMap.default;

    file.data.astro.frontmatter.layout = `/${sourceFolder}${accessedValueFromLayoutsMapOrTheDefaultValue}.astro`;
  };
}
