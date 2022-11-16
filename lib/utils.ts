const Regex = {
  STRING_WITH_SRC_IN_FRONT_ANY_CHARACTERS_IN_THE_MIDDLE_AND_EITHER_A_DOT_MDX_OR_MD_AT_THE_END:
    /(\/src\/.+\.mdx?)/,
  STRING_WITH_SLASH_SRC_IN_FRONT_NEXT_TO_IT_SLASH_PAGES_AND_ANY_OTHER_CHARACTERS_AFTER:
    /(?=\/src\/pages\/(.+\/))/,
  CAPTURE_FORWARD_SLASH_OR_DASH_OR_UNDERSCORE: /(?:\/|\-+|_+)/
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

function capitalizeTheStringOnlyIfTheNumberIsNotZeroAndReplaceEveryDashWithAnEmptyString(
  value: string,
  number: number
): string {
  return number === 0
    ? value.replace(/(-+)/g, "")
    : `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`.replace(
        /(-+)/g,
        ""
      );
}

function findTheCamelCasedStringThatIsEqualToTheOneInTheStringArray(
  camelCasedString: string,
  stringArray: Array<string>
) {
  return stringArray.find((string) => string === camelCasedString);
}

export type { VFile };

export {
  capitalizeTheStringOnlyIfTheNumberIsNotZeroAndReplaceEveryDashWithAnEmptyString,
  findTheCamelCasedStringThatIsEqualToTheOneInTheStringArray,
  Regex,
};
