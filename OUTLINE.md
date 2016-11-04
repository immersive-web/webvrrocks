# Outline notes

## Inspiration

* [Web Assembly](http://webassembly.org/)
* [Slack API](https://api.slack.com/)
* [Waigo](https://waigojs.com/)
* [Oculus Rift (free Blender 3D model)](https://sketchfab.com/models/591ff55a0f7b401cbb14fe454175b8b2)
* [Oak.is](http://oak.is/thinking/)
* [Chain](https://chain.com/) ([docs](https://chain.com/docs/core/get-started/install))
* [Collaborative Fund](http://www.collaborativefund.com/)
* [Surge](https://surge.sh/tour)
* [Hyper.app](https://hyper.is/)
* [▲ ZEIT](https://zeit.co/about#team)
* [City at Night - Level Design](https://dribbble.com/shots/2730106-city-at-night-level-design)
* [Virtual Reality + PC setup (animation)](https://dribbble.com/shots/2788259-Virtual-Reality)
* [Kong](https://docs.gelato.io/guides/using-gelato-with-kong)

<hr>


# WebVR Rocks


## Header

### Logo

### Navigation

_(Editor's Note: condense this list.)_

* [Overview](/docs/overview/)
* [Getting Started](/docs/getting-started/)
* [Docs](/docs/)
* [Downloads](/downloads/)
* [Tests](/samples/)
* [Showcase](/directory/)
* [Compatibility](/compatibility)
* [Roadmap](/docs/roadmap)
* [FAQ](/docs/faq)
* [Help](/feedback)


## Overview

### What is WebVR?

WebVR is an experimental JavaScript API that provides access to Virtual Reality devices, such as the [Oculus Rift](https://www3.oculus.com/rift/), [HTC Vive](https://www.vive.com/), [Samsung Gear VR](http://www.samsung.com/global/galaxy/gear-vr/), in your browser.

### Why is WebVR important?

### Alternatives to WebVR


## Tests


## Directory

### Showcase

* [A-Painter](/directory/showcase/a-painter)
* [Puzzle Rain](/directory/showcase/puzzle-rain)
* [Eutow](/directory/showcase/eutow)
* [Virtual Awakening](/directory/showcase/virtual-awakening)
* [Way to Go](/directory/showcase/way-to-go)
* [BB8](/directory/showcase/bb8)


## Getting started

Read the [overview](/) to learn about WebVR.

To view WebVR content, you will need a compatible browser and VR headset.

* [Compatible headsets](https://dash.readme.io/project/webvr/v1.0/docs/supported-vr-systems)
* [Browser setup instructions.](https://dash.readme.io/project/webvr/v1.0/docs/downloads)
* [See browser support](iswebvrready.org)

You can also view WebVR content on IOS or Android phones using browsers that do not support WebVR through the [WebVR polyfill](https://github.com/googlevr/webvr-polyfill) and using a  [Google Cardboard](https://vr.google.com/cardboard/) viewer.


## Content

* [Test scenes.](/samples)
* [Directory.](/directory)

### WebVR-capable browsers

### Supported VR headsets

#### Oculus Rift

* [Visit Oculus Rift product site.](https://www.oculus.com/rift/)
* [Purchase.](https://www.oculus.com/cart/)

#### HTC Vive

* [Visit HTC Vive product site.](https://www.vive.com/)
* [Purchase.](https://www.vive.com/product/)

#### Samsung Gear VR

* Visit Samsung Gear VR product sites: [Samsung](http://www.samsung.com/us/explore/gear-vr/), [Oculus](https://www3.oculus.com/gear-vr/).
* [Purchase.](http://shop.us.samsung.com/store/samsung/en_US/buy/productID.5062718600/quantity.1)

#### Google Daydream

[Visit Google Daydream product site.](https://vr.google.com/daydream/)

#### OSVR DK2

* [Visit OSVR DK2 product site.](http://www.osvr.org/hdk2.html)
* [Purchase.](http://www.osvr.org/buy/)

#### FOVE

Currently unsupported.

#### PSVR

Currently unsupported.


## Docs

### Specification

The [Spec Editor's Draft](https://w3c.github.io/webvr/) is hosted on [GitHub](https://github.com/w3c/webvr).

### Goals

### Sample usage

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

### Common use cases

### Tools

### FAQ


## Changelog

### November 2016

* <span class="changelog-section">Docs</span> Added sections for [instructions](/docs/getting-started/webvr-capable-browsers/#google-daydream) to download and install WebVR builds for Google Daydream.
* <span class="changelog-section">Tutorials</span> Now you'll find links to practical tutorials here on WebVR Rocks. Discover new articles or browse them by topic in our [Tutorials](/tutorials) section. Written something great? [Tell us about it](/contact?topic=tutorials)!
* <span class="changelog-section">Docs</span> Now you'll find links to practical tutorials here on WebVR Rocks. Discover new articles or browse them by topic in our [Tutorials](/tutorials) section. Written something great? Tell us about it!


## Roadmap

### Current status

### Next steps

### Past milestones


## Contributing

We'd love your help!

WebVR is currently being developed as an open standard by a [W3C Community Group](https://www.w3.org/community/webvr/) that includes representatives from most major browsers. The [WebVR community](/community/) is a friendly open-source community that welcomes all forms of contributions! There's a ton of ways to participate -- in [development](/contributing/#development), [testing](/contributing/#testing), [translation](/contributing/#translation), [documentation](/contributing/#documentation), [blog posts](/contributing/#blog-posts), [tutorials](/contributing/#tutorials), and [translation](/contributing/#translation). Here's just a small sampling of ways you can get started:

* Contribute content on the WebVR Rocks site in the form of [documentation](/contributing/#documentation), [blog posts](/contributing/#blog-posts), and [tutorials](/contributing/#tutorials).
* [Translate](/contributing/#translation) the text of the [specification](https://w3c.github.io/webvr/) or pages of this site into another language.
* [Submit a WebVR site](/directory/submit/) to the [WebVR Directory](/directory).
* [Test WebVR sites](/contributing/#testing) listed in the [WebVR Directory](/directory) for functionality, compatibility, and comfort.
* And here's our [roadmap](/roadmap/), so you can see where we're headed in the next year.


## Tutorials and Articles

### Lovingly authored by WebVR Rocks

The whole Slack team is pitching in and writing guides to working with the Slack platform and its emergent ecosystem. [Contact us]() if you'd like us to feature your tutorial here.

### Guides and articles from across the web

* [Why WebVR Matters](https://medium.com/immersion-for-the-win/why-webvr-matters-9f383fee04e5) by [Casper Fabricius](https://twitter.com/fabricius)


## Feedback

Report an issue or leave feedback.

<form id="support-form" class="form support-form" action="">
  <legend>Contact Us</legend>
  <label>
    <span class="label placeholder">Describe your issue or share your ideas.</span>
    <textarea id="support-message-textarea" class="textarea support-message-textarea"></textarea>
  </label>
  <button type="submit"></button>
</form>

### Issue or suggestion for the WebVR API?

If you would like to report an issue or suggest a change to the [WebVR API](/api) [specification](https://w3c.github.io/webvr/), first check the [open issues](https://github.com/w3c/webvr/issues), and if the issue does not appear to be reported, feel free to open a [new issue](https://github.com/w3c/webvr/issues/new).

### Need help with the WebVR Rocks site?

You've come to the right place! Send a message to the WebVR Rocks Support staff using the form here.

### Found an issue with a WebVR site in the wild?

As the [WebVR API](/api) is still in flux, you can expect some issues with WebVR sites in the wild. If you encounter issues with a WebVR site and the site in question is listed in the [WebVR Directory](/directory) has a link to the project's source code (e.g., a GitHub, BitBucket, GitLab repository), try first reaching out to the project maintainers (check the project's `README`, and, if possible, file an issue where appropriate). Otherwise, you can file an issue using the form here to report any compatibility or stability issues you encounter. The WebVR Compatibility volunteer team will try its best to diagnose the issue and reach out to the developer, if possible, to attempt to address the issues with a patch to fix the issue.

### What should I include in my support request?

Provide us with as much essential information as possible. And include any screenshots (e.g., of the page and any relevant errors or warnings in the Developer Console in [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console) or [Chrome](https://developers.google.com/web/tools/chrome-devtools/console/)), video captures, or links that are related to your problem, question, or suggestion. If you would like us to try to respond to you, please also provide your email address and/or Twitter account name.


## Footer

### Content License

Except where otherwise noted, content of this site is licensed under the [Creative Commons Attribution-ShareAlike International v4.0](https://creativecommons.org/licenses/by-sa/4.0/) or later.

### Community

* Join the [W3C WebVR Community Group](/contributing/#w3c-commmunity-group)
* Participate in the [WebVR API spec](/contributing/#api-specification) discussions
* Contribute to the [WebVR-capable browsers](/contributing/#browsers)
* Discuss in the [WebVR mailing list](https://mail.mozilla.org/listinfo/web-vr-discuss) ([archives](https://mail.mozilla.org/pipermail/web-vr-discuss/))
* Join the [WebVR community](https://chat.webvr.rocks/) on Slack
* Explore the [Tools ecosystem](/docs/tools/)
* Join the [Roomscale.org group](https://www.roomscale.org)
* Follow [@WebVRRocks on Twitter](https://twitter.com/webvrrocks)

### Code of Conduct

### Events

#### Upcoming events

#### Past events

* W3C Web & VR Workshop
* SFHTML5: WebVR
