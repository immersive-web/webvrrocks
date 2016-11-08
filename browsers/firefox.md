# Firefox Nightly Setup Instructions

## Download
[Get Firefox Nightly](https://nightly.mozilla.org/)


## HTC VIVE

1. Download and Install Firefox Nightly
2. Download version 1.02 of the `openvr_api.dll` file from the OpenVR GitHub repository: [32-bit](https://github.com/ValveSoftware/openvr/raw/master/bin/win32/openvr_api.dll), [64-bit](https://github.com/ValveSoftware/openvr/raw/master/bin/win64/openvr_api.dll).
Save the `openvr_api.dll` file somewhere on your computer where the user running Firefox can read it.  (ie: `c:\openvr`)
3. In Firefox Nightly, enter `about:config` in the address bar; change the value of `dom.vr.openvr.enabled` to `true` and `gfx.vr.openvr-runtime` to the full path of the `openvr_api.dll` file. (ie: `c:\openvr\openvr_api.dll`)
4. Restart Firefox Nightly.
5. Enjoy WebVR content


## Oculus Rift

1. Download and Install Firefox Nightly
2. Ensure that your Oculus settings [allow for Unknown Sources](https://blog.mozvr.com/oculus-home-rift-cv1-webvr/#enablingunknownsources).
3. Enjoy WebVR content

## Notes

* HTC VIVE controllers are not yet supported.   [Bugzilla issue](https://bugzilla.mozilla.org/show_bug.cgi?id=1299926)
* How to report issues