# Getting Started

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
 ✖ ANDROID_HOME - Environment variable that points to your Android SDK installation
```

#### Congratulations

Now you can run your code either on Android Studio or Vs Codei

## Running application.

### Android

##### _Linux system only_

Install android-tools on your system.

_You may have for some device to install specific drivers._

#### Physical device

To configure yout device :

<ul>
    <li>Active developper mode on your phone.</li>
    <li>Plug your phone with USB.</li>
    <li>Select "File transfert".</li>
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

## Troubles Shooting.

#### FAILURE: Build failed with an exception.

_Gradle build daemon disappeared unexpectedly (it may have been killed or may have crashed)_

Try to type commande from project root folder:

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

