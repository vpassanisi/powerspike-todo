# PowerSpike Code Prompt

### Todo List

This is Vincent Passanisi's submission for the PowerSpike Todo List code prompt.

### About

This Todo List was made with [Vue 3 CLI](https://cli.vuejs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwindcss 2](https://tailwindcss.com/). I chose to use Tailwindcss simply because it lets me write css faster. There are no pre made components, it just build a style sheet for you so that you can put together the classes that you want. I could easily build this app without it. I love Vue and it has great TypeScript support so it was a natural choice.

This is a Vue 3 + Vuex 4 app. Vue 3 is still very new, however it works very well and has only a few breaking changes over Vue 2. There is a new version of the vue dev tools that is required to work with version 3.0+. At the time of writing, the new vue dev tools does not support vuex, but for a simple app like this it wasn't a big problem.

### Features

I made a custom color palette for this app that is completely compliant to the [Material Design color spec](https://material.io/design/color/the-color-system.html#color-usage-and-palettes). The app has a dark mode that can be toggled using the brightness icon in the navbar in the top right. I pulled the main colors from the PowerSpike website to keep the theming consitent :).

The app has a component that handles errors made during fetch requests and gives the user visual feedback when it happens. This typically wont happen but you can see how it works by trying to make a new todo, or updating a todo, with an empty title or content field.

I made a custom easing function for css animations and transitions that are used throughout the app. Hovering your cursor over a todo shows the date and time it was created, and clicking on a todo opens a drawer with buttons for editing the todo and for deleting it. Clicking on the todo again will close the todo. When a todo has been edited the date and time of the last edit is shown in the edit collapse. The plus button at the bottom of the list opens a collapse for adding a new todo. The todo list is animated with fades and translations for adding and removing todos. The todo list looks great on desktop and mobile screens and changes padding, margin and layout based on the screen size.

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```
