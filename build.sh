#!/bin/bash
# Versions
BUNDLETOOL_VERSION="1.18.1"
SDK_VERSION="35.0.0"

# Paths
BUNDLE_FOLDER="./android/app/build/outputs/bundle/release"
BUNDLETOOL_JAR="bundletool-all-${BUNDLETOOL_VERSION}.jar"
APKSIGNER="${ANDROID_HOME}/build-tools/${SDK_VERSION}/apksigner"
ANDROID_MANIFEST="./android/app/src/main/AndroidManifest.xml"

if [ -f "$BUNDLE_FOLDER/app-release.aab" ]; then
  rm  $BUNDLE_FOLDER/app-release.aab
fi
if [ -d "$BUNDLE_FOLDER/apk" ]; then
  rm -rf $BUNDLE_FOLDER/apk
fi

# Build aab
# Insert security config to allow http request for testing.
SECURITY_CONFIG="android:networkSecurityConfig=\"@xml/network_security_config\""
NUM_LIGNE=13

# Remove security config
sed -i "${NUM_LIGNE}i${SECURITY_CONFIG}" $ANDROID_MANIFEST

# Generate aab
echo "Build aab file"
cd android
./gradlew bundleRelease
cd ..

SECURITY_CONFIG="android:networkSecurityConfig=\"@xml\/network_security_config"
sed -i "/${SECURITY_CONFIG}/d" $ANDROID_MANIFEST

# Install function
function install(){
  # Create apks file.
  java -jar $BUNDLETOOL_JAR build-apks --bundle=$BUNDLE_FOLDER/app-release.aab --output=$BUNDLE_FOLDER/apk/brewbuddy.apks --mode=universal
  # Unzip apk file.
  unzip $BUNDLE_FOLDER/apk/brewbuddy.apks -d $BUNDLE_FOLDER/apk/

  $APKSIGNER sign --ks brewbuddy.jks --out $BUNDLE_FOLDER/apk/brewbuddy.apk $BUNDLE_FOLDER/apk/universal.apk

  # Check if a device is connected.
  DEVICES=$(adb devices | grep -v "List of devices attached")
  if [ "$DEVICES" ]; then
    # Install on device.
    adb install -r -t $BUNDLE_FOLDER/apk/brewbuddy.apk
  fi
}

# Script args
for arg in "$@"; do
  case $arg in
    -i)
      echo "Install Application on device"
      install
      exit 0
      ;;
  esac
done