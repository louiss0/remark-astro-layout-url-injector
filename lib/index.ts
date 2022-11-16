import { throwIfStringHasADotAnythingInItsName, throwIfStringHasAForwardSlashAtTheBeginning } from "./error"
import { findTheCamelCasedStringThatIsEqualToTheOneInTheStringArray, Regex, VFile,capitalizeTheStringOnlyIfTheNumberIsNotZeroAndReplaceEveryDashWithAnEmptyString } from "./utils"

type FolderName = string
type LayoutPath = string

interface AstroAutoLayoutOptions {
  default: string
  [key: FolderName]: LayoutPath
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
      currentFile.match(Regex.STRING_WITH_SRC_IN_FRONT_ANY_CHARACTERS_IN_THE_MIDDLE_AND_EITHER_A_DOT_MDX_OR_MD_AT_THE_END)?.[0]

    
    const arrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash =
      stringExtractedByMatchingForSrcAnyUnlimitedAmountOfCharactersThenDotMdx
        ?.match(Regex.STRING_WITH_SRC_IN_FRONT_ANY_CHARACTERS_IN_THE_MIDDLE_AND_EITHER_A_DOT_MDX_OR_MD_AT_THE_END)
      

      if (!arrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash) {
      file.data.astro.frontmatter.layout = `/src/${layoutsMap.default}.astro`      
        return;
    }
    
    const secondMatchFromArrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash =
    arrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash[1]



    const arrayCreatedByPreviousExtractedStringBySplittingWithAForwardSlash =
      secondMatchFromArrayCreatedByLookingAheadOfSrcSlashPagesForAnyCharacterEndingInAForwardSlash
        .split(Regex.CAPTURE_FORWARD_SLASH_OR_DASH_OR_UNDERSCORE)
        .filter((string) => !!string === true)

    const camelCasedStringCreatedByPreviousExtractedStringBySplittingWithAForwardSlash=
      arrayCreatedByPreviousExtractedStringBySplittingWithAForwardSlash
        .map(capitalizeTheStringOnlyIfTheNumberIsNotZeroAndReplaceEveryDashWithAnEmptyString)
        .join("")
    

   
    
    const layoutsMapKeys = Object.keys(layoutsMap)
        
    const theCamelCasedStringThatIsEqualToTheOneInTheStringArray =
      
      findTheCamelCasedStringThatIsEqualToTheOneInTheStringArray(
        camelCasedStringCreatedByPreviousExtractedStringBySplittingWithAForwardSlash,
        layoutsMapKeys
      )  
      
    const valueFromTheLayoutsMapBasedOnTheCamelCasedStringThatIsEqualToTheOneInTheStringArray =
      theCamelCasedStringThatIsEqualToTheOneInTheStringArray
        
        ? layoutsMap[theCamelCasedStringThatIsEqualToTheOneInTheStringArray]
        
        : layoutsMap.default
    
    file.data.astro.frontmatter.layout = `/src/${valueFromTheLayoutsMapBasedOnTheCamelCasedStringThatIsEqualToTheOneInTheStringArray}.astro`
    
    
    
    
    
  
  }

  
    
  

}