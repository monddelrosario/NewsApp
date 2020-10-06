# News App

created by: Raymond del Rosario

## Latest android build

Download `NewsApp.apk` [here](https://drive.google.com/file/d/1vLqxivMFsdasND1foZnwr4so1l5joSha/view?usp=sharing). Then install it.

## Requirements

1. Node.js
1. `yarn`(preferred) or `npm`
1. Android Studio
1. XCode
1. Mobile Device (Android/iOS) or Device Emulator

## Running on Android

1. Run `yarn` or `npm install`
1. Download `debug.keystore` [here](https://raw.githubusercontent.com/facebook/react-native/master/template/android/app/debug.keystore). Then copy it to `newsapp/android/app` directory.
1. Check if you have connected device or a running emulator instance by running `adb devices`.
   You should see an output like this:

```terminal
List of devices attached
3dfc9788 device
```

4. Run `yarn runAndroid`, then wait for it to finish. It takes time on the first run, so be patient.

If something's not working, Run `yarn cleanAndroid`, then Run `yarn runAndroid`.

## Running on iOS

1. Run `yarn` or `npm install`
1. Run `yarn pod-install`
1. Run `yarn runIos`

## Packages used

1. Axios - Making HTTP requests to fetch or save data
1. React-native-elements -for UI elements
1. @react-navigation - for navigation and stackcontainer
1. dayjs - for formatting date for user-friendly

# Troubleshoot

1. Run `yarn refresh`
1. Run `yarn cleanAndroid`(Android) or `yarn pod-install`(IOS)
1. Run `yarn runAndroid`(Android) or `yarn runIos`(IOS)
