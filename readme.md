== Launching android
Terminal 1: `yarn start`
Terminal 2: `yarn android` or launch it via android studio.

== Releasing the app 

=== android
1. Increase the version number in android/app/build.gradle
1. Go to android studio
1. build -> generate signed bundle
1. Select android app bundle
1. Details for the keystore can be found in lastpass (lgtv.jks)
1. Go here and create a new release https://play.google.com/console/u/0/developers/7710946393303902879/app/4975641790650882409/tracks/production?tab=releaseDashboard


== Resources:

- https://www.webosose.org/docs/reference/ls2-api/com-webos-service-applicationmanager/
- https://github.com/supersaiyanmode/PyWebOSTV/blob/master/pywebostv/controls.py
- https://webostv.developer.lge.com/application/files/1214/7919/6747/NetCast_-_UDAP.pdf

Start the debugger: `adb shell input keyevent 82`
