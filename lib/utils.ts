const Regex = {
  STRING_WITH_SRC_IN_FRONT_ANY_CHARACTERS_IN_THE_MIDDLE_AND_EITHER_A_DOT_MDX_OR_MD_AT_THE_END:
    /(\/src\/.+\.mdx?)/,
  STRING_AHEAD_OF_SLASH_SRC_SLASH_PAGES_THAT_ENDS_WITH_A_SLASH:
    /(?=\/src\/pages\/(.+\/))/,
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

function capitalizeTheStringOnlyIfTheNumberIsNotZero(
  value: string,
  number: number
): string {
  return number === 0
    ? value
    : `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

function findTheCamelCasedStringThatIsEqualToTheOneInTheStringArray(
  camelCasedString: string,
  stringArray: Array<string>
) {
  return stringArray.find((string) => string === camelCasedString);
}

export type { VFile };

export {
  capitalizeTheStringOnlyIfTheNumberIsNotZero as capitalizeTheStringOnlyIfTheNumberIsNotZeroAndReplaceEveryDashWithAnEmptyString,
  findTheCamelCasedStringThatIsEqualToTheOneInTheStringArray,
  Regex,
};
