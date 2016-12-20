<!--
title: Chromium
slug: chromium
layout: browser
section: browsers
browser: chromium
keywords: [browsers, chromium]
authors: [cvan]
-->

<p class="browser-intro">
  <a href="https://www.chromium.org/">Chromium</a> is the open-source project behind the <a href="https://www.google.com/chrome/">Google Chrome</a> browser. <a href="/people/toji">Brandon Jones</a>, WebGL/WebVR developer on the Chrome team, has created these experimental custom WebVR builds for testing.
</p>

<div class="browser-disclaimer">
  <strong>Warning:</strong> All <a href="https://webvr.info/get-chrome/">Chromium WebVR builds posted here</a> are experimental! They have not been vetted by Google, <a href="https://twitter.com/tojiro">Brandon Jones</a>, nor anyone else for security or stability, and under no circumstances should you use them as your day-to-day browser! They are provided for testing of the experimental WebVR APIs only.
</div>


## Operating systems

* [Windows](#windows)
* <s>macOS</s>
* <s>Linux</s>


### Windows

#### Current version

<dl class="browser-version-info">
  <dt class="browser-version-name">Version</dt>
  <dd>Dec 3, 2016 (WebVR <code class="browser-version-webvr-version" data-browser-webvr-version="v1.1">v1.1</code>)</dd>
  <dt class="browser-version-date">Release date</dt>
  <dd><time>Dec 3, 2016</time></dd>
</dl>

##### Download

<a href="https://drive.google.com/uc?export=download&id=0BzudLt22BqGRRElMNmVqQjJWS2c" class="btn btn-download">Download</a>
<a href="https://chromium.googlesource.com/experimental/chromium/src/+/refs/wip/bajones/webvr_1" class="btn btn-source">View source</a>

##### Release notes

* Applies multiple optimizations on top of the version of WebVR publicly available in Chrome 56 beta, primarily in the form of reducing texture copies. This gives significantly better performance and latency in most cases. Consider this a preview of performance targets for later versions of Chrome, with further possible improvements still to come.

##### Known issues

* Intermittent unresolved WebGL crashes.
* There is no installer for experimental builds of Chromium. Once unarchived, launched `chrome.exe` directly from the `chrome-bin` folder.
* [View existing issues.](https://github.com/toji/chrome-webvr-issues/issues)

##### Compatibility

This version complies with the following [acid test scenes]() for the following libraries:

* :white_check_mark: [three.js](https://three.js.org/) [`r83`](https://github.com/mrdoob/three.js/releases/tag/r83)
* :x: [three.js](https://three.js.org/) [`r82`](https://github.com/mrdoob/three.js/releases/tag/r82)
* :grey_question: [three.js](https://three.js.org/) [`r81`](https://github.com/mrdoob/three.js/releases/tag/r81)
* :grey_question: [A-Frame](https://aframe.io/) [`v0.4.0`](https://github.com/aframevr/aframe/releases/tag/v0.4.0)
* :grey_question: [A-Frame](https://aframe.io/) [`v0.3.2`](https://github.com/aframevr/aframe/releases/tag/v0.3.2)
* :grey_question: [A-Frame](https://aframe.io/) [`v0.3.1`](https://github.com/aframevr/aframe/releases/tag/v0.3.1)
* :grey_question: [A-Frame](https://aframe.io/) [`v0.3.0`](https://github.com/aframevr/aframe/releases/tag/v0.3.0)
* :grey_question: [A-Frame](https://aframe.io/) [`v0.2.0`](https://github.com/aframevr/aframe/releases/tag/v0.2.0)
* :grey_question: [A-Frame](https://aframe.io/) [`v0.1.3`](https://github.com/aframevr/aframe/releases/tag/v0.1.3)
* :grey_question: [A-Frame](https://aframe.io/) [`v0.1.2`](https://github.com/aframevr/aframe/releases/tag/v0.1.2)
* :grey_question: [A-Frame](https://aframe.io/) [`v0.1.0`](https://github.com/aframevr/aframe/releases/tag/v0.1.0)
* :grey_question: [Babylon.js](http://www.babylonjs.com) [`v2.5.0`](https://github.com/BabylonJS/Babylon.js/releases/tag/v2.5.0)


#### Recent releases

* [Oct 29, 2016 (`v1.1`)]()
* [Sep 23, 2016 (`v1.1`)]()
* [Sep 17, 2016 (`v1.0`)]()
* [Aug 29, 2016 (`v1.0`)]()
* [Aug 28, 2016 (`v1.0`)]()
* [Aug 7, 2016 (`v1.0`)]()


### Platforms

* [HTC Vive](/headsets/htc-vive)
* [Oculus Rift](/headsets/oculus-rift)


### Instructions

0. Download and launch experimental build of Chromium with WebVR support.
0. In the URL bar, load `chrome://flags#enable-webvr` and toggle the `Enable WebVR flag`.
0. In the URL bar, load `chrome://flags#enable-gamepad-extensions` and toggle the `Enable Gamepad Extensions` flag.
0. <span data-headset="htc-vive">Launch the SteamVR application.</span>
0. Enjoy WebVR content!

## Showcase scenes

* [_A-Painter_ <img src="https://dl.airtable.com/RPPe979wRAil2X0OfUND_full_apainter.png" alt="A-Painter" class="showcase-thumb">](https://aframe.io/a-painter/)
* [_Eutow_ <img src="https://dl.airtable.com/3vZICUnS1uQ8WdRDlBww_full_og_image.jpg" alt="Eutow" class="showcase-thumb">](http://demo.marpi.pl/archan/eutow/)
* [_Puzzle Rain_ <img src="https://dl.airtable.com/7T6lv62FSSWsUdJhvr08_full_puzzle-rain-bg.jpg" alt="Puzzle Rain" class="showcase-thumb">](https://mozvr.com/puzzle-rain/)

### Contribute

<dl class="browser-contrib-info">
  <dt class="browser-contrib-maintainer">Core maintainer</dt>
  <dd><a href="/people/toji">Brandon Jones</a></dd>
  <dt class="browser-contrib-source">Source code</dt>
  <dd><a href="https://chromium.googlesource.com/experimental/chromium/src/+/refs/wip/bajones/webvr_1">View source code (Chromium branch)</a></dd>
</dl>


### How-to videos

* <video></video>
* <video></video>
* <video></video>

### Help

* [Report an issue](https://github.com/toji/chrome-webvr-issues/issues/new?title=[Windows]+)
