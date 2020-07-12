# Todo List Extension

Todo List helps you keep track of your work and commitments with deadlines so that they do not stay out of your focus, accessible right in your browser with just a click.

Features:

- Add todos with deadlines
- Complete todos
- Delete todos
- Badge UI to showing number of todos 
- Reminder to notify users about deadline todos
- Chart feature to show the usage of extension of the week

Please file any issues or feature requests at https://github.com/desmondsow/todo-list/issues.

## Installation & Development
1. [Install node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

2. Run the following command so that webpack can watch and recompile the /src files live to the /dist folder:

```sh
npm run watch
```

### Firefox

<!-- To run the extension with live reloading in a clean Firefox instance, run the following command in a separate terminal:

```sh
web-ext run
``` -->

To temporarily load the extension in a normal Firefox instance:

1. Go to `about:debugging`
2. Click `Load Temporary Add-on`
3. Load the `src` folder

### Chromium

1. Go to `chrome://extensions/`
2. Enable developer mode
3. Click `Load unpacked extension...`
4. Load the `src` folder
