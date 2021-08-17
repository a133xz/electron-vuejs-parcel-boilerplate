# Electron + Vue.js 3 + Parcel 2 boilerplate

If you feel like building **a very simple** multi-platform desktop app with your favourite tools: [Electron](https://electronjs.org/), [Vue.js](https://vuejs.org/) and [Parcel](https://parceljs.org/), this is your boilerplate.

I added the basic features needed to develop a quick and simple app. Other boilerplates add complexity that sometimes is not needed.

### Real world example

Using this boilerplate, I developed a [HEIC to PNG/JPG](https://github.com/a133xz/electron-heic-png) converter.

👉 [Download it here.](https://github.com/a133xz/electron-vuejs-parcel-boilerplate/releases/download/v1.0.11/MyApp-1.0.11.dmg)

<img src="https://github.com/a133xz/electron-vuejs-parcel-boilerplate/blob/master/real-world-example.gif?raw=true" width="350">

#### Recommendations

- If you want to use Electron and Vue.js heavily, I'd advise [Electron-vue](https://github.com/SimulatedGREG/electron-vue).

- If you want to learn more about security or use a template with React, check [this awesome template](https://github.com/reZach/secure-electron-template).

## Features

What you can find inside:

- Vuejs 3 with Typescript
- Parcel 2
- Communication between Electron and Vue.js
- Release your app to Github via Electron-Builder

What's missing:

- Translations - v2
- Electron auto-update - v2
- Tests - v2
- (Maybe) Typescript for the Electron files

## 💻 How to use it

Make sure you have Yarn installed and clone the repository `git clone https://github.com/a133xz/electron-vuejs-parcel-boilerplate.git`

- `yarn` to install dependencies
- `yarn serve` to run locally Vue.js + Electron
- `yarn vue:serve` to run locally only Vue.js using Parcel
- `yarn build:local` to build the project locally - by default is only compiling the mac app
- `yarn patch` to add a patch version and push the changes. More below.

**Troubleshooting**

If you've installled the dependencies with Yarn or NPM and it's still not working, reinstall Parcel:

`yarn add -D parcel@next`

Or when using NPM, run:

`npm install -D parcel@next`

## Demo app

To see how it works, download the latest [app version from Github](https://github.com/a133xz/electron-vuejs-parcel-boilerplate/releases).

<img src="https://raw.githubusercontent.com/a133xz/electron-vuejs-parcel-boilerplate/master/example.png" width="250">

As you can see on the screenshot, there is:

- A message from a `data` atribute
- A message from a Vuejs component
- A button that opens a dialog from Electron Native components
- An input to send a number to Electron and do a calculation

#### How to send data and call events from Vue to Electron

> Find a [great explanation here](https://github.com/reZach/secure-electron-template/blob/master/docs/newtoelectron.md) if you are new in Electron

We have 3 files to look at: `main/index.js`, `main/preload.js` and `ElectronBridge.vue`.

Electron gives you the posibility of preloading a script through `webPreferences` settings. Learn more on the [official docs](https://www.electronjs.org/docs/api/browser-window#class-browserwindow).

**On preload**, you'll find two functions:

- `receive` aka `ipcRenderer.on(eventName, callback)`: to listen to whatever we're sending from `index.js`
- `send` aka `ipcRenderer.send(channel, data)`: to call the events on `index.js`

Important: I whitelisted the events on `preload.js`

**Events**

Defined on `main/index.js`, for example:

```js
ipcMain.on("showDialog", () => {
  dialog.showMessageBoxSync({
    type: "info",
    message: "Hi I'm a dialog from Electron"
  });
});
```

**ElectronBridge.vue**

Usually called `renderer.js`. It has the functions to send and recieve data from Electron, so you'll need to set:

1. the access to the Electron API: `window.electron`
2. your method to call `showDialog`
3. and finally if you need data from Electron, you'll need to set a listener, for example on the event `mounted`

## Parcel v2 and Electron

An interesting thing to highlight is that Electron and Parcel are both using the `main` path on the `package.json`. To avoid any problems, I made Parcel ignore the field as [per the docs](https://v2.parceljs.org/configuration/package-json/#main-%2F-module-%2F-browser):

```js
{
  "main": "unrelated.js",
  "targets": {
    "main": false
  }
}
```

## 📚 Project structure

Divided into two main folders;

`src/main` for the Electron files:

- `src/main/index.js` is the entry point for our Electron app (your window settings and events)
- `src/main/menu.js` the settings for the menu of your app
- `src/main/preload.js` this is the file that expose to the main window events from Electron (data preparation / processing)

`src/renderer` for the Vue.js:

- `src/renderer/index.js` is the entry point for our Vue.js app
- `src/renderer/App.vue` is the entry point for the main App component
- `src/renderer/components/BasicComponent.vue` is a component example
- `src/renderer/components/ElectronBridge.vue` is a component that talks to Electron (event handling and displaying data)

And the stantard config files for ESLint or Typescript:

- `package.json` is where you'll add your config settings for the Electron app

## 🚀 Release

I'm using Github actions for the release, specifically [action-electron-builder](https://github.com/samuelmeuli/action-electron-builder) with a few tweaks; following [https://github.com/samuelmeuli/action-electron-builder/issues/9](https://github.com/samuelmeuli/action-electron-builder/issues/9) I've updated the action to cache the build.

I divided the build-release process into two workflows:

- `build.yml` build the app everytime you create a PR
- `release-electron-app.yml` build and release the app every time you tag your commit. This action will create a new draft of the release and then you'll have to publish it.

Right now it will only release the app for MacOS but you can change it anytime. Go to the workflow template and add/remove the platform you want:

`os: [macos-latest]` : `os: [macos-latest, ubuntu-latest, windows-latest]`

### Creating a new release

I added an example script to create a new release using `npm version patch`. A bit more of explanation when you run `yarn patch`:

- `npm version patch` bump your your package.json version to the next one
- `-m \"v%s\"` creates a commit and tag with your version following this format `v*.*.*`
- `postversion` script will be run right after you bump the version to push your tag

You can learn more about it on the [npm version docs](https://docs.npmjs.com/cli/version).

#### Manually

When you want to create a new release, follow these steps:

1. Update the version in your project's `package.json` file (e.g. `1.2.3`)
2. Commit that change (`git commit -am v1.2.3`)
3. Tag your commit (`git tag v1.2.3`). Make sure your tag name's format is `v*.*.*`. Your workflow will use this tag to detect when to create a release
4. Push your changes to GitHub (`git push && git push --tags`)

> This piece of documentation is from [action-electron-builder](https://github.com/samuelmeuli/action-electron-builder), where you can learn more about creating a new release.

## 🛶 Contribution

Issues and PRs are much appreciated. Please create a new branch and a PR to submit your suggestions.

> If you've got questions, create an issue and I can answer it.

## ✨ Big thanks

I used a combo of these projects to create the boilerplate:

- [electron-react-parcel-boilerplate](https://github.com/kumarryogeshh/electron-react-parcel-boilerplate)
- [action-electron-builder](https://github.com/samuelmeuli/action-electron-builder)
- [Electron-vue](https://github.com/SimulatedGREG/electron-vue)
- [Vue-cli Electron Builder](https://github.com/nklayman/vue-cli-plugin-electron-builder)
- [Info about preload.js](https://stackoverflow.com/questions/57807459/how-to-use-preload-js-properly-in-electron)
