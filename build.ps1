# Params
param (
    [switch]$i
)

# Versions
$bundleToolVersion = "1.18.1"
$sdkVersion = "35.0.0"
# Paths
$releasePath = "./android/app/build/outputs/bundle/release"
$unzipPath = $env:PROGRAM + "/Git/usr/bin/unzip.exe"
$signerPath = $env:ANDROID_HOME + "/build-tools/" + $sdkVersion + "/apksigner.bat"
$androidManifest = "./android/app/src/main/AndroidManifest.xml"

# Delete previous aab
if (Test-Path -Path $releasePath/app-release.aab)
{
    Remove-Item -Path $releasePath/app-release.aab -Force
}
# Clean apk folder
if (Test-Path -Path $releasePath/apk -PathType Container)
{
    Remove-Item -Path $releasePath/apk -Recurse -Force
}

# Build aab
# Insert security config to allow http request for testing.
$lineNum = 13
$securityConfig = "android:networkSecurityConfig=`"@xml/network_security_config`""

$originalContent = Get-Content -Path $androidManifest
$modifiedContent = $originalContent[0..($lineNum - 2)] + $securityConfig + $originalContent[($lineNum - 1)..($originalContent.Length - 1)]

Set-Content -Path $androidManifest -Value $modifiedContent

# Generate aab
Write-Output "Build aab file"
$generateAab = "cd android; ./gradlew bundleRelease; cd.."
Invoke-Expression $generateAab

# Remove security config
Set-Content -Path $androidManifest -Value $originalContent

if ($i)
{
    $pluggedDevices = adb devices
    $devices = $pluggedDevices | Select-String -Pattern "^\w{1,}\s+device$"

    if ($devices)
    {
        Write-Output "Installing apk"
        # Generate apks
        $generateApks = "java -jar bundletool-all-" + $bundleToolVersion + ".jar build-apks --bundle=" + $releasePath + "/app-release.aab --output=" + $releasePath + "/apk/brewbuddy.apks --mode=universal"
        Invoke-Expression $generateApks

        # Unzip apk file.
        $unzipApk = "& " + '"' + $unzipPath + '"' + " " + $releasePath + "/apk/brewbuddy.apks -d " + $releasePath + "/apk"
        Invoke-Expression $unzipApk

        # Sign apk
        $signApk = "&" + '"' + $signerPath + '"' + " sign --ks brewbuddy.jks --out " + $releasePath + "/apk/brewbuddy.apk " + $releasePath + "/apk/universal.apk"
        Invoke-Expression $signApk

        # Install apk
        $installAPk = "adb install -r -t" + $releasePath + "/apk/brewbuddy.apk"
        Invoke-Expression $installAPk
    }
}

