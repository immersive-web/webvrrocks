# Firefox Nightly Setup Instructions

[Get Firefox Nightly](https://nightly.mozilla.org/) (the early, unstable release version of the Firefox browser).


## HTC Vive

0. Download and install [Firefox Nightly](https://nightly.mozilla.org/).
0. Download version 1.02 of the `openvr_api.dll` file from the [OpenVR GitHub repository](https://github.com/ValveSoftware/openvr/): [32-bit](https://github.com/ValveSoftware/openvr/raw/master/bin/win32/openvr_api.dll), [64-bit](https://github.com/ValveSoftware/openvr/raw/master/bin/win64/openvr_api.dll) (preferred, if running a 64-bit PC).
0. Save the `openvr_api.dll` file somewhere on your computer where the user running Firefox can read it (e.g., `c:\openvr\`).
0. In Firefox Nightly, navigate to `about:config`; change the value of `dom.vr.openvr.enabled` to `true` and `gfx.vr.openvr-runtime` to the full path of the `openvr_api.dll` file (e.g., `c:\openvr\openvr_api.dll`).
0. Restart Firefox Nightly.
0. Enjoy WebVR content!


## Oculus Rift

0. Download and install [Firefox Nightly](https://nightly.mozilla.org/).
0. Ensure that your Oculus settings [allow for Unknown Sources](/headsets/oculus-rift#instructions).
0. Enjoy WebVR content!


## Notes

* HTC Vive controllers are not yet supported. (See this [tracking issue](https://bugzilla.mozilla.org/showdependencytree.cgi?id=1299926&hide_resolved=1) to monitor progress.)


## Issues

* Please report Firefox WebVR issues by [filing a bug on the Firefox bug tracker](https://bugzilla.mozilla.org/enter_bug.cgi?product=Core&component=General&status_whiteboard=[webvr]&cc=kgilbert@mozilla.com), or you can contact at us on [Twitter](https://twitter.com/) at [@mozillavr](https://twitter.com/mozillavr) (or by simply tweeting with the the Twitter hash #FirefoxWebVRBug).
