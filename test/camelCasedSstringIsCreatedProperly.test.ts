import { describe, expect, it } from 'vitest';

import {
  capitalizeTheStringOnlyIfTheNumberIsNotZeroAndReplaceEveryDashWithAnEmptyString,
  Regex,
} from '../lib/utils';

describe('If a camel cased string is created based on a match', () => {
  it('Capitalizes strings that come from a matched string properly', () => {
    const inputString = '/src/pages/blog/nuxt/';

    const expectedResult = 'blogNuxt';

    const inputMatch = inputString.match(
      Regex.STRING_WITH_SLASH_SRC_IN_FRONT_NEXT_TO_IT_SLASH_PAGES_AND_ANY_OTHER_CHARACTERS_AFTER
    )!;

    const extractedFolderName = inputMatch[1];

    const arrayCreatedByUsingSplitOnExtractedFolderName =
      extractedFolderName.split('/');

    const stringCreatedByCamelCasingThenJoiningArrayCreatedByUsingSplitOnExtractedFolderName =
      arrayCreatedByUsingSplitOnExtractedFolderName
        .map((value, index) =>
          capitalizeTheStringOnlyIfTheNumberIsNotZeroAndReplaceEveryDashWithAnEmptyString(
            value,
            index
          )
        )
        .join('');

    expect(
      stringCreatedByCamelCasingThenJoiningArrayCreatedByUsingSplitOnExtractedFolderName
    ).toBe(expectedResult);
  });

  it('Generates an array based on whether or not a - is in the string or a /', () => {
    const folderName = '/react/design---patterns__goo__/__-homeer-_';

    const expectedResult = ['react', 'design', 'patterns', "goo", "homeer"];

    const arrayCreatedBySplittingFolderName = folderName
    .split(Regex.CAPTURE_FORWARD_SLASH_OR_DASH_OR_UNDERSCORE)
    .filter(string => !!string ===true);

    expect(arrayCreatedBySplittingFolderName).toStrictEqual(expectedResult);
  });

  it('Generates the right string  based on whether or not a - , _ is in the  string or a /', () => {
    const folderName = 'react/design/---/pattern/s__goo__/__-homeer-_';

    const expectedResult = "reactDesignPatternSGooHomeer";

    const arrayCreatedBySplittingFolderName = folderName
    .split(Regex.CAPTURE_FORWARD_SLASH_OR_DASH_OR_UNDERSCORE)
    .filter(string => !!string ===true);

    const camelCasedString = arrayCreatedBySplittingFolderName
    .map((value, index) =>
    capitalizeTheStringOnlyIfTheNumberIsNotZeroAndReplaceEveryDashWithAnEmptyString(
      value,
      index
    )
  )
  .join('')

    expect(camelCasedString).toBe(expectedResult)

  });

});
