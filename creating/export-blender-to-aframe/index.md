<!--
post_type: creating
title: Exporting Blender Models from Sketchfab to A-Frame
author: EricaLayton
keywords: [blog, creating, blender, sketchfab, aframe, models, guides]
date_published: 2017-11-09
date_updated: 2017-11-09
-->

# 5-Minute Guide: Exporting Blender Models from Sketchfab to A-Frame

![Demo Scene](/creating/export-blender-to-aframe/img/demo-cv1-model.png)

### We will show you the basics of exporting a Blender model from Sketchfab and using it in [A-Frame](https://aframe.io/) in both Wavefront (.obj) and COLLADA (.dae) formats.

<a href="demo/" class="btn btn-demo">View demo</a>

<a href="https://github.com/WebVRRocks/webvrrocks/archive/master.zip" class="btn btn-source">Download source</a>

---
In this guide, we’ll cook up an [A-Frame](https://aframe.io/) scene containing a model from [Sketchfab](https://sketchfab.com/). I chose a model of an [Oculus Rift CV1](https://sketchfab.com/models/591ff55a0f7b401cbb14fe454175b8b2) by [Ti Kawamoto](https://sketchfab.com/adamselene). It’s a nice model created with the open source [Blender](https://www.blender.org/) 3D creation suite. Plus, the thought of recursive “VR within VR” is amusing..
For this lesson, I’m using Windows because that is what most VR devs use, but do please [reach out to me](https://twitter.com/EricaLayton) if you have any questions about doing this in another OS! If you are comfortable setting up a site on a local dev server, feel free to ignore the parts about setting up a Browsersync server.

### Instructions for 
One simple, locally hosted WebVR site with .dae and .obj versions of an [Oculus Rift CV1 3D model](https://sketchfab.com/models/591ff55a0f7b401cbb14fe454175b8b2).

### Ingredients
* [Blender](https://www.blender.org/) 
* Rift CV1 .blend file from a creator [Ti Kawamoto](https://sketchfab.com/adamselene) on [Sketchfab](https://sketchfab.com/)
* 9 `.jpg` image textures that come with this `.blend` file
### We will create
* 2 model files (`.dae` and `.obj`)
* 1 texture-mapping “material library” file (`.mtl` to go with the `.obj`)
* Directory for the `.blend` file and exports
* Directory for the web page and 3D assets
* Local web server (we’ll use Browsersync)
* Index.html file


## Part 1: Getting the “Ingredients”

![Image of Blender Home Page](/creating/export-blender-to-aframe/img/blender-site.png)

### Get Blender

0. Go to the [Downloads page on Blender.org](https://www.blender.org/download/).
0. Download the version of Blender for your platform (Windows, macOS, Linux).
0. Install the Blender application.
    * **Windows:** Open the `.msi` file and follow the install wizard ([read full instructions](https://www.blender.org/manual/getting_started/installing/windows.html)).
    * **macOS:** Double-click on the `.zip` file to uncompress it, drag the `Blender` and `BlenderPlayer` applications to your `Applications` folder ([read full instructions](https://www.blender.org/manual/getting_started/installing/macos.html)).
    * **Linux:** Uncompress the `.zip` file to your desired location, such as `~/software/` or `/usr/local/` ([read full instructions](https://www.blender.org/manual/getting_started/installing/linux.html)).
0. Launch Blender.
    * **Windows:** `C:\Program Files\Blender Foundation\Blender`
    * **macOS:** `~/Applications/Blender.app`
    * **Linux:** `/usr/local/Blender.app`


### Make a directory with an index.html file in it
Here is some handy boilerplate code to use. Make a new file in your favorite text editor, and copy this into it. I like Sublime Text quite a bit, but any text editor is fine. Name it `index.html` so that the server can find it. We’ll come back to the code later.

```
<!-- .....................................................
Attribution for 3D model used in this scene: Oculus Rift CV1 by Ti is licensed under CC Attribution-NonCommercial
https://sketchfab.com/models/591ff55a0f7b401cbb14fe454175b8b2
https://creativecommons.org/licenses/by-nc/4.0/
......................................................... -->

<!DOCTYPE html>
   <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Exporting Blender Models from Sketchfab to A-Frame – WebVR Rocks</title>
    <script src="https://aframe.io/releases/0.3.2/aframe.min.js"></script>
   </head>
  <body>
    <!-- All of the entities in your scene must be between the <a-scene> tags! -->
    <a-scene>
      <!-- ......................................
       It's a good idea to preload and cache your assets (stuff in the scene) by using an Asset System. This is an example of an Asset System. Everything in <a-assets> can be used as many times as you want in the scene! You can also use entities inline  without an Asset System: quicker to write, but slower to render. <asset-item> can include geometry, models, and materials.
      .......................................... -->
      <a-assets>
       <a-asset-item id="Oculus-CV1-obj" src="cv1_FF.obj"></a-asset-item>
       <a-asset-item id="Oculus-CV1-mtl" src="cv1_FF.mtl"></a-asset-item>
       <a-asset-item id="Oculus-CV1-collada" src="cv1_FF.dae"></a-asset-item>
      </a-assets>

      <!-- Sky color can be adjusted -->
      <a-sky color="#5CAAEB"></a-sky>

      <!-- Camera has WASD controls by default. In non-VR mode click/touch and drag to look around. -->
      <a-camera position="0 1.8 5"></a-camera>

      <!-- Here are the .obj and .dae models. -->
      <a-entity obj-model="obj: #Oculus-CV1-obj; mtl: #Oculus-CV1-mtl" position="-5 0 -5"></a-entity>
      <a-entity collada-model="#Oculus-CV1-collada" position="5 0 -5"></a-entity>

    </a-scene>
  </body>
</html>
 
```

### Get npm
npm provides an easy way to install packages from the command line. If you are on Windows or Mac, installing the latest version of the [Node.js Javascript runtime](https://nodejs.org/) will also install [npm](https://www.npmjs.com/) on your machine.

### Get Browsersync
You can use any local dev server you are comfortable with. Here, I chose [Browsersync](https://browsersync.io/), because it’s simple to install with npm, and easy to use.
To install the server globally, simply enter this on the command line:
```
npm install -g browser-sync
```

To start the server and open a browser showing your web page, `cd` into the directory which contains `index.html` and then type:
```
browser-sync start --server --files "*.html, stylesheets/*.css"
```

Here is a guide to [command line usage of Browsersync](https://www.browsersync.io/docs/command-line).

Make a directory to keep your `.blend` file and exports.
We’ll come back to this directory later.


## Part 2: Get and Convert the 3D Model

1.  Choose a blend file on Sketchfab
For this guide, I’m using this [Oculus Rift CV1 model] 
(https://sketchfab.com/models/591ff55a0f7b401cbb14fe454175b8b2)
Note that the model has image textures on the inside of the eyepieces, as well as a small label on the back of the head strap.

2. Download the blend file
It will be a zip file.

3. Unzip/extract the blend file
Right click on the `.zip` file and select Extract All. Save the extracted contents to a directory you can find easily.

4. Extract the contents of the `.zip` file. Note that this is on Windows. On Mac OS, simply double-clicking on the `.zip` file will extract the contents into the same directory where the `.zip` file resides.

![Extract Zip Contents](/creating/export-blender-to-aframe/img/extract-all.png) 

5. Open the blend file with Blender
Take a quick look at the Blender user interface. Blender has a high learning curve, but can be a powerful tool for creating 3D graphics. For now, we’ll just use it as an exporter for the CV1 model.

6. Export the model: File → Export → Wavefront (.obj)

7. Name and save the `.obj file. By default, it will be saved in same directory with the `.blend` file.

![Export .obj from Blender](/creating/export-blender-to-aframe/img/export-obj.png)

### Copy the 3D model files into the directory with your index.html file

1. Go back to the blend file in Blender and export as Collada (`.dae`).
2. In the directory with your blend file, you should now have a `.dae` file, plus an `.obj` file and an `.mtl` file that goes with it. Note that there are a number of `.jpg` image files that came with the model. These are textures for the `.obj`; they are important! 
3. Copy-and-paste the `.dae`, `.obj`, `.mtl`, and all of the `.jpg` files into the directory with your index.html file.  

![Copy Models and Textures into Web Page Directory](/creating/export-blender-to-aframe/img/copy-paste-textures.png)

## Part 3: Web Page and Local Server

### Open index.html file in a text editor
In the boilerplate, notice that I’ve provided attribution to the model’s creator in a comment on lines 1-3. If you are new to A-Frame, there are some helpful comments in the code, as well.
Because the 3D model files are in the same directory with your index.html, the file paths to them simply consist of their names. Go to line 26, which is within `<a-assets>`. This is where we’ll initially load the assets for the scene. In `src=”cv1_FF.obj”` change `cv1_FF.obj` to match the `.obj` filename. Do the same for the `.mtl` and the `.dae` asset items on lines 27 and 28.
Using an asset system like this has the advantage of pre-loading your models, and you can then instantiate them as many times as you want using their IDs, without sacrificing as much performance.

### Start up your local Browsersync server 
Open the command prompt. Using [Git Bash](https://git-scm.com/) is recommended. `cd` into the directory which contains `index.html` and then type:
```
browser-sync start --server --files "*.html, stylesheets/*.css"
```
Browsersync will serve your `index.html` file from `https://localhost:3000`. The default browser will open this page automatically when you start the Browsersync server.

### Testing Your WebVR Scene
The COLLADA `.dae` will be on your left, and the Wavefront `.obj` on your left. Click-and-drag to rotate the camera and look around. You can also move with the traditional WASD keys. If you can’t see the models, check the file paths in `<a-assets>` and also the IDs in the obj-model and collada-model entities.
You can view your locally served webpage in VR with either a phone and Google Cardboard, or with Vive or Rift using a vr-enabled browser. For quick viewing on Cardboard: In the command prompt with Browsersync running, you should see "Local" and "External URLs that each contain an IP address and a port number. Enter the "External" URL into the address bar of your phone browser, and load the URL on the phone browser.




