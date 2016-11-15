<!--
post_type: creating
title: Exporting Blender Models from Sketchfab to A-Frame
author: EricaLayton
keywords: [blog, creating, blender, sketchfab, aframe, models, guides]
date_published: 2017-11-09
date_updated: 2017-11-09
-->

# 5-Minute Guide: Exporting Blender Models from Sketchfab to A-Frame

![Demo Scene](/img/DemoCV1Model.png)

Using [A-Frame](https://aframe.io/), we will show you how to export a Blender model from Sketchfab to A-Frame.

<a href="demo/" class="btn btn-demo">View demo</a>

<a href="https://github.com/WebVRRocks/webvrrocks/archive/master.zip" class="btn btn-source">Download source</a>

## Finding a model on Sketchfab

## View the demo

In this guide, we’ll cook up an A-Frame scene containing a model from SketchFab. I chose a model of a Rift CV1 by Ti Kawamoto. It’s a nice model created with Blender, that goes with the theme of WebVR. Plus, the thought of recursive “VR within VR” is amusing..
For this lesson, I’m using Windows because that is what most VR devs use, but do please reach out to me if you have any questions about doing this in another OS! If you are comfortable setting up a site on a local dev server, feel free to ignore the parts about setting up http-server.

## Instructions for: 
one simple, locally hosted WebVR site with .dae and .obj versions of a Rift CV1 3D model.

## Ingredients:
Blender 
Rift CV1 .blend file from a creator on SketchFab
9 .jpg image textures that come with this .blend file
We will create:
2 model files (.dae and .obj)
1 texture mapping “material library” file (.mtl to go with the .obj)
2 directories
Local web server (we’ll use http-server)
Index.html file


# PART 1: GETTING THE “INGREDIENTS”
---

## Get Blender

![Image of Blender Home Page](https://github.com/WebVRRocks/webvrrocks/tree/master/creating/export-blender-to-aframe/img/BlenderSite.png)

Go to https://www.blender.org/ and click on the big blue Download Blender button. You’ll come to the downloads page, where you can choose which installer to download, depending on your operating system. Mac, Windows and GNU/Linux are supported. Choose a mirror to download from (probably one closeby). Once you’ve downloaded the installer, open it, and click through the steps of the installation wizard. On Windows, Blender should end up in C:\Program Files\Blender Foundation\Blender. 

## Make a directory with an index.html file in it
Here is some handy boilerplate code to use. make a new  file in your favorite text editor, and copy this into it. I like Sublime Text quite a bit, but any text editor is fine. Name it index.html so that the server can find it. We’ll come back to the code, later.

'''
<!--.....................................................
Attribution for 3D model used in this scene: Oculus Rift CV1 by Ti is licensed under CC Attribution-NonCommercial
.........................................................-->

<!DOCTYPE html>
   <head>
    <meta charset="utf-8">
    <title>Exporting Blender Models from Sketchfab to A-Frame – WebVR Rocks</title>
    <script src="assets/js/aframe.min.js"></script>
    <link rel="icon" sizes="192x192" href="https://aframe.io/images/aframe-logo-192.png">
   </head>
  <body>
<!--All of the entities in your scene must be between the <a-scene> tags!-->
    <a-scene>
<!--......................................
It's a good idea to pre-load and cache your assets (stuff in the scene) by using an Asset System. This is an example of an Asset System. Everything in <a-assets> can be used as many times as you want in the scene! You can also use entities inline, without an Asset System: quicker to write, but slower to render. <asset-item> can include geometry, models, and materials
..........................................-->
    <a-assets>
    <a-asset-item id="Oculus-CV1-obj" src="cv1_FF.obj"></a-asset-item>
    <a-asset-item id="Oculus-CV1-mtl" src="cv1_FF.mtl"></a-asset-item>
    <a-asset-item id="Oculus-CV1-collada" src="cv1_FF.dae"></a-asset-item>
    </a-assets>

<!--Sky color can be adjusted-->
    <a-sky color="#5CAAEB"></a-sky>

<!--Camera has WASD controls by default. In desktop (non VR) mode, click and drag to look around.-->
    <a-camera position="0, 1.8, 5"></a-camera>

<!--Here are the .obj and .dae models.-->
      <a-entity obj-model="obj: #Oculus-CV1-obj; mtl: #Oculus-CV1-mtl" position="-5 0 -5"></a-entity>
      <a-entity collada-model="#Oculus-CV1-collada" position="5 0 -5"></a-entity>

    </a-scene>
  </body>
</html>
'''

## Get npm (if you don’t have it already)
npm provides an easy way to install packages from the command line, using the Node.js Javascript runtime. 
If you are on Windows or Mac, installing the latest version of Node will also install npm on your machine.

After installing Node, check that it’s installed properly and check the version of Node and npm. Open command prompt and type:

'''
node -v 
nmp -v
'''

Each of these commands should print a version number. 

## Get http-server
You can use any local dev server you are comfortable with. Here, I chose http-server, because it’s simple to install with npm, and easy to use.
To install the server globally, simply enter this on the command line:
npm install http-server -g

To start the server and open a browser showing your web page:
http-server [full/path/to/index.html] -o

There are other handy options for the server, specified on https://www.npmjs.com/package/http-server

Make a directory to keep your blend file and exports
We’ll come back to this directory later.


# PART 2: GET AND CONVERT THE 3D MODEL
---

## Choose a blend file on SketchFab
For this guide, I’m using this CV1 model: 
https://sketchfab.com/models/591ff55a0f7b401cbb14fe454175b8b2
Note that the model 

## Download the blend file
It will be a zip file.

## Unzip/extract the blend file
Right click on the .zip file and select Extract All. Save the extracted contents to a directory you can find easily.

![Extract Zip Contents](https://github.com/WebVRRocks/webvrrocks/tree/master/creating/export-blender-to-aframe/img/ExtractAll.png)

## Open the blend file with Blender
Take a quick look at the Blender user interface. It has a high learning curve, but can be a powerful tool for creating 3D graphics. For now, we’ll just use it as an exporter for the CV1 model.

## Export the model: File → Export → Wavefront (.obj)
Name and save the .obj file (saved by default in same directory with the blend file)

![Export .obj from Blender](https://github.com/WebVRRocks/webvrrocks/tree/master/creating/export-blender-to-aframe/img/ExportOBJ.png)

## Copy the .obj and .mtl files into the directory with your index.html file
Go back to the blend file in Blender and export as Collada (.dae)
In the directory with your blend file, you should now have a .dae file, plus a .obj file and a .mtl file that goes with it. Note that there are a number of .jpg image files that came with the model. These are textures for the .obj: they are important! Copy-paste the .dae, .obj .mtl and all of the .jpg files into the directory with your index.html file.  


# PART 3: WEB PAGE AND LOCAL SERVER
---

## Open your index.html file in your favorite text editor
In the boilerplate, note that I’ve provided attribution to the model’s creator in a comment in lines 1-3. If you are new to A-Frame, there are some helpful comments in the code, as well.
Because the 3D model files are in the same directory with your index.html, the file paths to them simply consist of their names. Go to line 26, which is within <a-assets>. This is  where we’ll initially load the assets for the scene. In src=”cv1_FF.obj” change cv1_FF.obj to match the name you gave your .obj file. Do the same for the .mtl and the .dae asset items in lines 27 and 28.
Note that each model is given an ID, which is used to instantiate them into the scene as entities in lines 39 and 40. Using an asset system like this has the advantage of pre-loading your models, and you can then instantiate them as many times as you want without sacrificing as much performance.

## Start up your local http server 
Open the command prompt. Type:

'''
http-server [full\path\to\directory containing index.html] -o
'''

The -o option will open a default browser with your index.html webpage. The default port it uses is 8080; there’s a option to change this, if you want. https://www.npmjs.com/package/http-server

## Can you see the models in the webpage?
The Collada .dae will be on your left, and the Wavefront .obj on your left. Click-and-drag to rotate the camera and look around. You can also move with the traditional W-A-S-D keys. If you can’t see the models, check the file paths in <a-assets> and also the IDs in the obj-model and collada-model entities.

VR viewing of your locally served site can be done with either a phone + the right ip address + cardboard, or a vr-enabled browser. For quick viewing on Cardboard: In the command prompt with the http-server running, you should see two urls that each contain an ip address and a port number. Enter the second one into the address bar of your phone browser, and hit ‘go’.




