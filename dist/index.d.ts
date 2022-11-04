declare type LayoutPath = string;
interface AstroAutoLayoutOptions {
    default: string;
    [key: FolderName]: LayoutPath;
}
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
declare function astroMarkdownLayoutUrlInjector(layoutsMap: AstroAutoLayoutOptions): () => (_: unknown, file: VFile) => void;

export { astroMarkdownLayoutUrlInjector as default };
