const Regex = {
  STRING_WITH_SRC_IN_FRONT_ANY_CHARACTERS_IN_THE_MIDDLE_AND_EITHER_A_DOT_MDX_OR_MD_AT_THE_END:
    /(\/src\/.+\.mdx?)/,
  STRING_AHEAD_OF_SLASH_SRC_SLASH_PAGES_THAT_ENDS_WITH_A_SLASH:
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


export type { VFile };

export {
  Regex,
};
