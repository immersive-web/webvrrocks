<!--
title: Oculus Rift
-->

# Oculus Rift

* [Oculus Rift product page](https://www3.oculus.com/rift/)

## Browser Support

* [Firefox Nightly setup instructions](/browsers/firefox)
* [Chromium setup instructions](/browsers/chromium)


## Hardware requirements

* [See Oculus Rift Recommended Specifications](https://www3.oculus.com/en-us/oculus-ready-pcs/)
* You may download and run the [Oculus Rift Compatibility Check](http://ocul.us/compat-tool) tool to ensure your machine meets the minimum requirements to enjoy VR in the Oculus Rift.


## Oculus Remote and Touch motion controller support

The [Oculus Remote](https://support.oculus.com/835449819935261) is [supported](https://iswebvrready.org/#gamepad-extensions) by the [Gamepad API (Extensions)](https://w3c.github.io/gamepad/extensions.html) in [these experimental Chromium WebVR builds](#instructions-1). Support for the upcoming hand-tracked [Oculus Touch](https://www3.oculus.com/touch/) motion controllers will be added soon once the product is released on the consumer market.


### Enabling `Unknown Sources` setting for WebVR content

When launching WebVR from within the browser, you will be presented with an "Unknown Source" error screen that initially blocks WebVR content from being displayed:

![Error screen when viewing VR content without enabling 'Unknown Sources'](https://cloud.githubusercontent.com/assets/203725/18866890/ad9881de-8456-11e6-8589-76dce64b3935.jpg "Error screen when viewing VR content without enabling 'Unknown Sources'")

In an effort to protect users from applications that have not been reviewed by Oculus (for comfort, content, or health/safety), Oculus by default will not display content from apps obtained outside of the Oculus Home store. There are plenty of interesting experiences to try from trustworthy developers… including content from the Web!

#### Instructions

To resolve this, you will need to enable an option for "Unknown Sources" from within the Settings of the Oculus Home store application. Fortunately, you will need need to do this only once.

![Animation of steps to enable 'Unknown Sources' from the Oculus Home settings](https://cloud.githubusercontent.com/assets/203725/18866886/a8ffb9b2-8456-11e6-8829-d79f5c218764.gif "Animation of steps to enable 'Unknown Sources' from the Oculus Home settings")

1. Load the [Oculus Home](https://www3.oculus.com/setup/) application.
2. Located in the top-right corner, hover over the `Settings` gear icon.
3. Click the `Settings` link.
4. Ensure the `General` tab of the `Settings` is selected.
5. Click the toggle checkbox icon for `Unknown Sources` to enable it.
6. Once prompted with a dialog called `Allow Unknown Sources?`, click the `Allow` button.
7. Once the dialog is dismissed, the toggle for `Unknown Sources` should have a checkmark, indicating "unknown sources" are now allowed.
8. Now, you can freely experience WebVR content, without needing to follow this process again (even if you log in to another PC with your same user account).


## Oculus Rift DK2 and DK1 devices

Oculus Rift DK1 and DK2 were early pre-consumer VR development kits offered by Oculus and are no longer sold or supported by Oculus.

* DK2 headsets may still be used with WebVR as long as driver support is maintained.
* DK1 devices are no longer supported.

