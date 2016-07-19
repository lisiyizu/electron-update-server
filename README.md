# electron-update-server

Small WebServer to handle the updates for **Electron** apps and Squirrel.

## CONFIG ##

Inside `app.js` you will find a section of **varaibles to config** that you need to **change**.

```javascript
const localIP           = 'http://localhost';           //local url, could be an IP of your network
const remoteIP          = 'http://www.fakeurl.com';     //remote url, this will be the production url
const appName           = 'Electron';                   //this is the name of your app (the installers will have this name Electron.app Electron.dmg etc)
const appInstallerWin   = 'ElectronSetup';              //this is the installer name that https://github.com/electron/grunt-electron-installer will generate
```

## FILESYSTEM ##

To use this server you need to have an special format on your filesystem.

**YourAppName** need to be the same name of what you use in the config **appName**

```
-- releases
 |
 |-- darwin
 | |
 | |-- 1.0.0 (version number)
 | | |
 | | |-- YourAppName.zip                   (this zip os just the .app file and not the .dmg)
 | | |-- YourAppName.dmg
 | |
 | |-- 1.0.1 (version number)
 | | |
 | | |-- YourAppName.zip                   (this zip os just the .app file and not the .dmg)
 | | |-- YourAppName.dmg
 | |
 | |-- 1.0.2 (version number)
 | | |
 | | |-- YourAppName.zip                   (this zip os just the .app file and not the .dmg)
 | | |-- YourAppName.dmg
 |
 |-- win
   |
   |-- YourAppName-1.0.0-full.nupkg        (this will be auto generated from electron app)
   |-- YourAppName-1.0.0-delta.nupkg
   |-- YourAppName-1.0.1-full.nupkg
   |-- YourAppName-1.0.1-delta.nupkg
   |-- YourAppName-1.0.2-full.nupkg
   |-- YourAppName-1.0.2-delta.nupkg
   |-- RELEASES                            (this will have all the increments version, auto generated from grunt-electron-installer)

```

## URLs ##

- /updates/latest/:version 

This is the URL for Darwin (macOS) applications. Will automatically download the correct files

- /updates/releases/win

This is the URL of the filesystem to download the windows installers (Squirrel for windows look all the files inside the filesystem and get the RELEASES file to know which version he will use)

- /download/latest/:os?

This is a simple URL to use on your webpage so the user will download always the latest version, you could specify the OS in the url (darwin or win) or the server automatically will get that information from the useragent

## HOW TO RUN THE SERVER ##

by default the app will use the port **1337**

- Local Server: `npm start`
- Remote Server: `npm run production`

If you don't want to use that ports you could modify the lines 6 and 7 from `package.json`

If you are using *forever* to run on background the server this is what you need to run: `PORT=1337 NODE_ENV=production forever app.js`


## CONTRIBUTE ##

If you want to contribute with this server will be awesome. So you are welcome :)

- [x] ~~create the server with URLs for Squirrel~~
- [x] ~~add a link to download the latest version of the app~~
- [ ] create a webpage to upload the installers for mac and windows
- [ ] support Linux
