import {} from "astro/types"

type FolderName = string
type LayoutPath = `/src/layouts/${string}.astro`
interface AstroAutoLayoutOptions {
  [key:FolderName]:LayoutPath
}
interface VFile {
  data: { astro: { frontmatter: {} } },
  messages: [],
  history: [ '/home/projects/github-j51mh8/src/pages/post-one.md' ],
  cwd: '/home/projects/github-j51mh8',
  value: '\r\n# Post one \r\n\r\nThis is the first post \r\n\r\n'
}

export default function autoLayout(options:AstroAutoLayoutOptions) {


  return () =>  (tree, file) => {

    console.log(file)

    Object.entries(options).forEach(([key, value])=> {

      
    })

  }

}