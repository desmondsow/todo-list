# Todo List Extension

Features:

- Add todos with deadlines
- Delete todos
- Badge UI to showing number of todos 

Please file any issues or feature requests at https://github.com/desmondsow/todo-list/issues.

## Installation & Development
1. [Install node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

2. Install the required node modules:

```sh
npm install web-ext
```

### Firefox

To run the extension with live reloading in a clean Firefox instance, run the following command in a separate terminal:

```sh
web-ext run
```

To temporarily load the extension in a normal Firefox instance:

1. Go to `about:debugging`
2. Click `Load Temporary Add-on`
3. Load the `src` folder

### Chromium

1. Go to `chrome://extensions/`
2. Enable developer mode
3. Click `Load unpacked extension...`
4. Load the `src` folder