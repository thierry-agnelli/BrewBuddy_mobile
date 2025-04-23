# Getting Started

# Presentation

This is my school project.

This is an application to assist with home beer brewing.

You'll find in this repo only my work as a mobile developer, as I'm not the owner of the other parts of the application.

## Check your configuration.

Open terminal, navigate to your app folder and run command :

`npx react-native doctor`

### Android

#### Java version

```
✖ JDK - Required to compile Java code
   - Version found: N/A
   - Version supported: >= 17 <= 20
```

(Or version found not >= 17 <= 20)

Install **java 17** on your system ([download page](https://www.oracle.com/fr/java/technologies/downloads/#java17))

#### Android Studio

```
 ✖ Android Studio - Required for building and installing your app on Android
```

Install **Android Studio** ([Install guide](https://developer.android.com/studio/install?hl=fr)).

Add Android Studio **installation path** to your **PATH** variable.

#### ANDROID_HOME

```
 ✖ ANDROID_HOME = installation/path/Android/SDK
```

#### Congratulations

Now you can run your code either on Android Studio, Vs Code or Webstorm

## Running application.

### env vars

Navigate to ./src/config/env/
Create this file :

```
env.ts
```

Copy into it content of env.examples.ts and update vars.

### Android

#### **On your device**

Active this options :

<ul>
    <li>Developer mode</li>
    <li>Debug via USB</li>
    <li>Install via USB</li>
</ul>

##### **Linux system only**

Install android-tools on your system.

_You may have for some device to install specific drivers._

#### Physical device

To configure your device :

<ul>
    <li>Active developer mode on your phone.</li>
    <li>Plug your phone with USB.</li>
    <li>Select "File transfer".</li>
    <li>Accept debugging mode (first time).</li>
</ul>

To run metro, run this command in terminal :

```
npm run dev
```

Then when os choice is prompted, type "a" for android, or run in another terminal this command:

```
npm run dev:android
```

Wait for app building (first time can be longer).

## Setup Troubles Shooting.

#### FAILURE: Build failed with an exception.

_Gradle build daemon disappeared unexpectedly (it may have been killed or may have crashed)_

Try to type command from project root folder:

```
cd android && ./gradlew clean
```

You can also try to delete _node_modules_ folder and reinstall dependencies.

#### Prettier plugin does'nt work on VS Code.

<ul>
    <li>Go to VS Code settings ("<i>ctrl+,</i>").</li>
    <li>Type "Prettier" in search bar.</li>
    <li>Search "Prettier: <b>Config Path</b>" option. </li>
    <li>Type this path "./configs/.prettierrc.json".</li>
</ul>

#### ESLint plugin does'nt work on VS Code.

<ul>
    <li>Create a <b>.eslintrc.js</b> file at project root with this content:</li>
</ul>

```
    module.exports = {
    root: true,
    extends: ["./configs/.eslintrc.js"],
    };
```

<ul>
    <li>Restart Eslint server :</li>   
    Press "<i>ctrl+shift+P</i>" and search "ESLint: Restart ESLint server".
</ul>

## Installing app on android devices

This guid allows ton install application on mobile device with back running locally on a computer.

Update env file APP_URL (prod) with computer ip address where back is running.

The mobile device needs to be connected on same wifi network than the back computer.

Generate sign key by running this command in your terminal at project root folder location and follow instruction :

```
keytool -genkey -v -keystore brewbuddy.jks -keyalg RSA -keysize 2048 -validity 10000 -alias brewbuddy
```

### Android devices configuration

First, you need to have configure your devices with these options :

<ul>
    <li>Debug via USB</li>
    <li>Install via USB</li>
    <li>Plug your phone with USB.</li>
    <li>Select "File transfer".</li>
    <li>Accept debugging mode (first time).</li>
</ul>

### Computer configuration

You need to have installed android sdk build-tools and unzip.

Configure this env var :

```
ANDROID_HOME = installation/path/Android/SDK
```

You need to have unzip installed

#### Windows only

Unzip is available if you have git installed on your pc.

Set up these env var :

```
$PROGRAM = C:\Program Files
```

### Launching installation

Plug your device and select "File transfer".

run this command in your terminal.

_<li>Linux</li>_

```
npm run install:android:linux
```

_<li>Windows</li>_

```
npm run install:android:windows
```

After a while, you will be asked to enter the key password and wait for the script to finish.<br>
<br>
<br>
**Congratulation you can use BrewBuddy for testing.**
