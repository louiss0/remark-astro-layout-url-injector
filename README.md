# Remark Auto Layout URL Injector

Astro does not have a way of automatically connecting layout URLs to every page inside of a folder. Instead they told the developer to do it.
This package is a simple way to configure the layout's you want to use for a set of pages within a folder.
Instead of having to tell astro to inject a layout for every page. You can configure your app to automatically inject a layout for every page within a folder.
All you have to do is type a configuration object that contains the name of any folder within the astro project directory except for the pages one. And the name of the layout file that you are using. You are done no more having to write excessive boilerplate code.

When you write `blog:` as a key then `layouts/post` the full url will be automatically injected for you.

That means `{ blog: 'layouts/post' }` will result in

```yaml
layout: "/src/layouts/post.astro"
```

Being the default for every page that inside of a pages/blog file.

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
    remarkPlugins: [autoLayout({ default: "layouts/default" })],
  },
}
```

**When it comes to using this plugin, you must understand the following things:**

- You don't use the `.astro` extension when it comes to mentioning the name of layout you want to use as the layout file
- You don't use the `/src` at all when it comes to using the name of layout file at all.
- Don't use a "/" at the beginning of the name of layout file that you are referencing
- To refer to a folder that is a subfolder of another folder you use the name of it's parent folder and the name of itself erasing `/`
- You instead use a camel cased version of that word instead of a folder Path
- You don't use pages at all when mentioning folders to use it will be ignored by this plugin.

If you follow the following rules when it comes to using this plugin you should be fine. I tried to make this library so that you don't have to do repetitive things. And just focus on what you need to do instead of writing boilerplate. the [Configuration Mental Map](#configuration-mental-map) section below should give you a picture of how to name the keys of your objects

<br />

## Configuration Mental Map

When you want to reference folders in your project you need to **Camel Case** naming in your folder name keys. The table below shows what I mean.

| Folder Path           | Camel Case Key       |
| --------------------- | -------------------- |
| posts                 | posts:               |
| posts/react           | postsReact:          |
| blog/food             | blogFood:            |
| react/design-patterns | reactDesignPatterns: |
| vue/design--patterns  | vueDesignPatterns:   |
| angular/design__patterns  | angularDesignPatterns:   |

This tables is trying to say that you must create a capitalized word for every slash `/`  underscore `_` or dashes that you put as the folder path. 

This means the following 

foo/remember--jack/for-good => fooRememberJackForGood

foo/remember__jack/for-_good => fooRememberJackForGood

foo/remember/jack/for/good => fooRememberJackForGood

These results are the same don't forget that. 

! the `=>` means is the expected camelCasedString

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
      blogReact: "layouts/react-post"
      blogTypescript: "layouts/typescript-post"

      })
    ],
  },

```
