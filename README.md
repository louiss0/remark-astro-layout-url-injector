# Remark Auto Layout URL Injector

<br />

This package is called the astro url injector. It is a simple package that allows you to inject the layout url inside any markdown file that contains a simple page. You write a single configuration object that allows you to map keys to folders and values to layouts. When you configure layouts inside of astro you can be assured that url's will be injected to every file that is a markdown or mdx file.

<br />

## Installation Instructions

```
npm install -D @louiss0/remark-astro-layout-url-injector
```

## Usage Instructions

<br />

A key is a camel cased string that represents the url of your folder. The values is where your layout folder is along with the a forward slash the the name of the file you want to use as the name of the layout file. When it comes to using layout files they must not contain a forward slash at the beginning of the value. You must not ever the `.astro` extension at all you'll get an error when trying to do that.
<br />

```js
import autoLayout from "./dist";

export default {
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [autoLayout({ default: "layouts/default" })],
  },
};
```

Layout keys are restricted to camel case and must follow the file structure of the folders that are in pages.

| Folder Path | Camel Cased Key |
| ----------- | --------------- |
| blog/id     | blogId          |
| posts/      | posts           |
| content/    | content         |
| ---         | ---             |

You must assign a default key to the layoutsMap It will the the layout that is used for all pages that don't have a layout defined.

```
// This is the object you must pass to the function if you have nothing else to do

{default: ""}


```

You can override any of the configuration options that you have set don't be afraid to go deep into a file structure. You don't need to have a specific place where you put your layouts all you need to do is just.

- Put them in the src folder.
- Don't use a forward slash in the value path
- Don't use a pages key that will simply be ignored
- Don't use a `.astro` extension in the value path
- Remember to always specify a default layout
- Don't use the pages folder at all as a value path.

## Typical Structure

**Folders in astro project src**
<br />

```
    layouts---|--post.astro
              |__default.astro

    pages---|--blog---|--post-one.md
        |             |__post-two.md
        |
        |__index.astro
```

**Configuration**

```ts
{
    default: "/layouts/default",
    blog: "/layouts/post"
}
```
