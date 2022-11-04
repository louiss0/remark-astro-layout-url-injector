// lib/index.ts
function astroMarkdownLayoutUrlInjector(layoutsMap) {
  return () => (_, file) => {
    Object.values(layoutsMap).forEach((value) => {
      throwIfStringHasADotAnythingInItsName(value);
      throwIfStringHasAForwardSlashAtTheBeginning(value);
    });
    const frontMatterLayout = file.data.astro.frontmatter?.layout;
    if (frontMatterLayout)
      return;
    const currentFile = file.history[0];
    const stringExtractedByMatchingForSrcAnyUnlimitedAmountOfCharactersThenDotMdx = currentFile.match(/(\/src\/.+\.mdx?)/)?.[0];
    const arrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash = stringExtractedByMatchingForSrcAnyUnlimitedAmountOfCharactersThenDotMdx?.match(/(?=\/src\/pages(.+\/))/);
    if (!arrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash) {
      file.data.astro.frontmatter.layout = `/src/${layoutsMap.default}.astro`;
      return;
    }
    const secondMatchFromArrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash = arrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash[1];
    const arrayCreatedByPreviousExtractedStringBySplittingWithAForwardSlash = secondMatchFromArrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash.split("/").filter((string) => !!string === true);
    const pascalCasedStringCreatedByPreviousExtractedStringBySplittingWithAForwardSlash = arrayCreatedByPreviousExtractedStringBySplittingWithAForwardSlash.map(capitalizeEveryStringButTheFirstStringInTheArray()).join("");
    Object.entries(layoutsMap).forEach(
      checkIfPascalCasedStringIsEqualToKeyInLayoutsMapIfTrueSetTheFrontMatterLayoutPropertyToItsValue(pascalCasedStringCreatedByPreviousExtractedStringBySplittingWithAForwardSlash, file)
    );
    if (!file.data.astro.frontmatter.layout) {
      file.data.astro.frontmatter.layout = `/src/${layoutsMap.default}.astro`;
      return;
    }
    function throwIfStringHasADotAnythingInItsName(string) {
      if (string.match(/(\.)/)) {
        throw new Error(`
        Don't use dot astro when specifying a path to the layout .
        You have to append .astro the extension so we do that for you.

        Please change this ${string}
        
        `);
      }
    }
  };
  function capitalizeEveryStringButTheFirstStringInTheArray() {
    return (value, index) => index === 0 ? value : `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
  }
  function checkIfPascalCasedStringIsEqualToKeyInLayoutsMapIfTrueSetTheFrontMatterLayoutPropertyToItsValue(pascalCasedStringCreatedByPreviousExtractedStringBySplittingWithAForwardSlash, file) {
    return ([key, value]) => {
      const keyIsEqualToPascalCasedStringCreatedByPreviousExtractedStringBySplittingWithAForwardSlash = key === pascalCasedStringCreatedByPreviousExtractedStringBySplittingWithAForwardSlash;
      if (keyIsEqualToPascalCasedStringCreatedByPreviousExtractedStringBySplittingWithAForwardSlash) {
        file.data.astro.frontmatter.layout = `/src/${value}.astro`;
      }
    };
  }
  function throwIfStringHasAForwardSlashAtTheBeginning(string) {
    if (string.match(/^\//)) {
      throw new Error(`
        Don't use a forward slash specifying a path to the layout.

        You would have to append forward slash  so we do that for you.

        Please change this ${string}
        
        `);
    }
  }
}
export {
  astroMarkdownLayoutUrlInjector as default
};
