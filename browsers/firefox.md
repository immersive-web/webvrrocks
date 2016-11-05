# Firefox

## HTC Vive

0. Install the [Firefox Nightly](https://nightly.mozilla.org/) browser.
0. Download version 1.02 of the `openvr_api.dll` file from the [OpenVR GitHub repository](https://github.com/ValveSoftware/openvr/): [32-bit](https://github.com/ValveSoftware/openvr/raw/master/bin/win32/openvr_api.dll), [64-bit](https://github.com/ValveSoftware/openvr/raw/master/bin/win64/openvr_api.dll) (preferred, if running a 64-bit PC).
0. Save the `openvr_api.dll` file somewhere on your computer where the user running Firefox can read it (e.g., `c:\openvr\`).
0. In Firefox Nightly, navigate to `about:config`; change the value of `dom.vr.openvr.enabled` to `true` and `gfx.vr.openvr-runtime` to the full path of the `openvr_api.dll` file (e.g., `c:\openvr\openvr_api.dll`).
0. Restart Firefox Nightly.
0. Enjoy WebVR content!
