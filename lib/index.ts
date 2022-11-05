
type FolderName = string
type LayoutPath = string

interface AstroAutoLayoutOptions {
  default: string
  [key: FolderName]: LayoutPath
}

interface VFile {
  data: {
    astro: {
      frontmatter: Record<string, unknown>
    }
  },
  messages: Array<string>,
  history: Array<string>,
  cwd: string,
  value: string
}


export default function astroMarkdownLayoutUrlInjector(layoutsMap: AstroAutoLayoutOptions ) {


  return () => (_:unknown, file: VFile) => {

    Object.values(layoutsMap).forEach((value) => {
      throwIfStringHasADotAnythingInItsName(value)
      throwIfStringHasAForwardSlashAtTheBeginning(value)
    });
    
    const frontMatterLayout = file.data.astro.frontmatter?.layout


    if (frontMatterLayout) return
    

  
    const currentFile = file.history[0]
    const stringExtractedByMatchingForSrcAnyUnlimitedAmountOfCharactersThenDotMdx =
        currentFile.match(/(\/src\/.+\.mdx?)/)?.[0]

    
    const arrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash =
      stringExtractedByMatchingForSrcAnyUnlimitedAmountOfCharactersThenDotMdx
        ?.match(/(?=\/src\/pages(.+\/))/)
      

      if (!arrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash) {
      file.data.astro.frontmatter.layout = `/src/${layoutsMap.default}.astro`      
        return;
    }
    
    const secondMatchFromArrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash =
    arrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash[1]



    const arrayCreatedByPreviousExtractedStringBySplittingWithAForwardSlash =
      secondMatchFromArrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash
        .split("/")
        .filter((string) => !!string === true)

    const pascalCasedStringCreatedByPreviousExtractedStringBySplittingWithAForwardSlash=
      arrayCreatedByPreviousExtractedStringBySplittingWithAForwardSlash
        .map(capitalizeEveryStringButTheFirstStringInTheArray())
        .join("")
    

   
    
    Object
      .entries(layoutsMap)
      .forEach(
        checkIfPascalCasedStringIsEqualToKeyInLayoutsMapIfTrueSetTheFrontMatterLayoutPropertyToItsValue(pascalCasedStringCreatedByPreviousExtractedStringBySplittingWithAForwardSlash, file)
      )
    
    if (!file.data.astro.frontmatter.layout) {
      
      file.data.astro.frontmatter.layout = `/src/${layoutsMap.default}.astro`
      return
    }
    
    
    
    function throwIfStringHasADotAnythingInItsName(string:string) {
      
      if(string.match(/(\.)/)) {
        
        throw new Error(`
        Don't use dot astro when specifying a path to the layout .
        You have to append .astro the extension so we do that for you.

        Please change this ${string}
        
        `);
        
      }
    }

  }

  function capitalizeEveryStringButTheFirstStringInTheArray(): (value: string, index: number, array: string[]) => string {
    return (value, index) => index === 0
      ? value.replace(/(-+)/, "")
      : `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`.replace(/(-+)/, "")
  }

  function checkIfPascalCasedStringIsEqualToKeyInLayoutsMapIfTrueSetTheFrontMatterLayoutPropertyToItsValue(pascalCasedStringCreatedByPreviousExtractedStringBySplittingWithAForwardSlash: string, file: VFile): (value: [string, string], index: number, array: [string, string][]) => void {
    return ([key, value]) => {



      const keyIsEqualToPascalCasedStringCreatedByPreviousExtractedStringBySplittingWithAForwardSlash = key === pascalCasedStringCreatedByPreviousExtractedStringBySplittingWithAForwardSlash

      if (keyIsEqualToPascalCasedStringCreatedByPreviousExtractedStringBySplittingWithAForwardSlash) {


        file.data.astro.frontmatter.layout = `/src/${value}.astro`

      }

    }
  }

  function throwIfStringHasAForwardSlashAtTheBeginning(string:string) {

    if(string.match(/^\//)) {
        
        throw new Error(`
        Don't use a forward slash specifying a path to the layout.

        You would have to append forward slash  so we do that for you.

        Please change this ${string}
        
        `);
        
      }
  
  }

    
  

}