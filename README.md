# Remark Auto Layout URL Injector

Astro does not have a way of automatically connecting layout URLs to every page inside of a folder. Instead they told the developer to do it.
This package is a simple way to configure the layout's you want to use for a set of pages within a folder.
Instead of having to tell astro to inject a layout for every page. You can configure your app to automatically inject a layout for every page within a folder.
All you have to do is type a configuration object that contains the name of any folder within the astro project directory except for the pages one. And the name of the layout file that you are using. You are done no more having to write excessive boilerplate code.

When you write `blog/` as a key then `layouts/post` the full url will be automatically injected for you.

That means `{ layoutsMap:{ "blog/": 'layouts/post'} }` will result in

```yaml
layout: "/src/layouts/post.astro"
```

You must specify a default layout when you do that layout will be used for all pages that don't have a layout associated with it at all.
It's called `default:`

## Installation Instructions

```
npm install -D remark-astro-layout-url-injector
```

## Usage Instructions

To use this library, all you need to do is add it to the `remarkPlugins:` array of the markdown configuration. Like this.

```js
export default defineConfig({
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [
      autoLayout({
      layoutsMap:{
        default: "layouts/default"
        }

      }
      )
    ],
  },
}
```

**When it comes to using this plugin, you must understand the following things:**

- You don't use the `.astro` extension when it comes to mentioning the name of layout you want to use as the layout file

- You don't use the the source directory at all when it comes to using the name of layout file at all.

- Don't use a "/" at the beginning of the name of layout file that you are referencing

- You don't use `/pages` or `/content` at all when mentioning folders to use they will be ignored by this plugin.

- To pass in the source folder that you use the `sourceFolder:` key in the config

  - The sourceFolder must start with a `/`

- By default `sourceFolder:` equals `/src`

## Configuration

There are only two things that you can configure the source folder and the layouts used for each set of folders.

The source folder is the directory that you use for your application code.

The layoutsMap a key value pair of the layouts used for your application.

- You must specify a `default:` key in the layoutsMap

  - The layout value specified in that one will be used for all files under `/pages` and `/content` recursively unless you override the `default:`

- The keys are the folders under either `/pages` or `/content`

- You don't use `/` for the folder name at the beginning of the path you do it at the end of the path for both key and value.

  - Ex `{"posts/": "layouts/post" }`

\
When it comes to crafting the url for a layout this plugin uses an absolute path to the construct each url.
It uses the `sourceFolder` property as the beginning of the path.
It appends `.astro` for you and uses the values of a layoutMap to construct the middle path.

When you type {sourceFolder:"/docs", layoutsMap: {default: "layouts/default"} }

This url is created

/docs/layouts/default.astro`

<br />

## Folder Structure Example

Let's look at an example folder structure for this plugin. In this example we are looking inside of the src file

```
 pages---|blog|
             |
             |
             |___|react|
             |
             |___|typescript|

|layouts|---|
            |
            |___post.astro
            |
            |___react-post.astro
            |
            |___typescript-post.astro
```

**This is now you'd configure the layouts**

```js

   {
    extendDefaultPlugins: true,
    remarkPlugins: [
      autoLayout({
      default: "layouts/post"
      "blog/react/": "layouts/react-post"
      "blog/typescript/": "layouts/typescript-post"

      })
    ],
  },

```
