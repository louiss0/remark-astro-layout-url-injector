"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  default: () => astroMarkdownLayoutUrlInjector
});
module.exports = __toCommonJS(lib_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
