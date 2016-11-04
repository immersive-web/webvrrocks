---
title: Getting Started
---

It's quite simple!

## Rendering WebVR content to a VR headset

```js
navigator.vr.getDisplays(function (devices) {
  if (!displays.length) {
    return;
  }
  var display = displays[0];
  display.requestPresent([
    {source: canvas}
  ]);
});
```
