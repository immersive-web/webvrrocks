<!--
post_type: creating
title: Scaling for Roomscale WebVR
author: EricaLayton
keywords: [blog, creating, roomscale, blender, aframe, scale, measurement, guides]
date_published: 2017-11-29
date_updated: 2017-11-29
-->

# 5-Minute Guide: Scaling for Roomscale WebVR

![Objects for scale!](/article/roomscale-scaling/img/objects-for-scale.jpg)

### A discussion of scaling your roomscale VR experiences for realism and surrealism

<a href="demo/" class="btn btn-demo">View demo</a>

<a href="https://github.com/WebVRRocks/webvrrocks/archive/master.zip" class="btn btn-source">Download source</a>

---
In this guide, I unpack the question: how do we create objects in WebVR that are scaled for the real live humans who are experiencing the site using roomscale VR?

### Does the scale of the environment feel "off"?

![image name](/article/roomscale-scaling/img/surreal-scale.jpg)

Stop coding for a minute and look at your WebVR scene in a roomscale (positionally tracked) headset. Does everything look huge? Is it hard to reach for things that seemed very close to the camera when viewed on the desktop monitor? The easiest reference for human scale is your own perception of how the Vive controllers intersect with other objects in the scene. Wave your hands around "through" the objects.

![Sighting around objects](/article/roomscale-scaling/img/test-by-controller-intersection.jpg)

### Can I improve the user experience of the site by adjusting the scale of things?

![Sighting around objects](/article/roomscale-scaling/img/sighting-around.jpg)

Be kind with your scaling. Make sure your site visitors can reach objects they need to interact with, and have a clear line of sight to objects they will need to see. Scale helps define accesibility, and also realism. Be very careful when using realistically scaled tables and chairs, for example. If the scale is believable, the user may try to lean on the table that isn't there, or sit in the virtual chair in your scene!

### How large is one unit of measurement in the framework I'm using?

Blender, A-Frame and Unity all use "1 meter" as their standard unit of measurement. But that does not mean that 1 meter in any of these contexts will map accurately and consistently with real world space, when viewed in VR. If you need accurate real-world scaling of your VR content, it's worth testing the scale with your system.

### Using the demo models

![Demo models: coffee mug and classic banana](/article/roomscale-scaling/img/demo-viewing.jpg)

In the demo scene, you'll find a few 3D models that can be used for realistic scale references. The meter stick is actually 1 meter long in real space, when viewed in Vive. In A-Frame, it is 1.026 units long. The same is true for units in Blender. Depending on the experience you are building, 2.6cm per meter might not make much difference to your users. However, if you use architectural models in your scene, tables may seem a bit too short, and hallways a bit narrower than we're accustomed to.  

### DIY Measurements

Scale may vary slightly, depending on what combination of development framework and headset you are using. Test it out for yourself, and please share your findings with the WebVR community! I'm using Vive + A-Frame as an example, but it would be great to see the results of this across many roomscale and also skeletal tracking VR/AR/MR devices.

How to make your own virtual meter measure for Vive:

### Ingredients
* HTC Vive
* Meter stick or tape measure
* Locally hosted WebVR site for testing, containing 2 cube primitives
* Duct tape (or masking tape, gaff tape, etc)
* A cooperative friend or coworker
### Instructions
0. Have your friend hold the tape measure perpendicular to the floor, reeled out to a bit past a meter
0. Get into your test scene in the Vive
0. Hold one of the controllers so that one of its edges is aligned with the top of the Unit ube in the scene.
0. Have your friend stik a piece of duct tape right under the edge of the controller, to mark the top of the Unit cube where you indicated it to be
0. Note where the top of the duct tape is, on the tape measure. That is how big that 1 Unit cube is, in real world space. Is it different from a meter? Make notes about this, to use in your roomscale development process.

There are many more creative approaches to measuring: make up your own! This one is quick and easy, using stuff you are likely to have lying around at home or in your office or classroom. Tying 1 meter of string between the controllers also works, but is kind of awkward to set up.

### Design Questions for Scale in Roomscale Design in WebVR

![Compare object at different scales](/article/roomscale-scaling/img/compare-scale.jpg)

* Are the users using Rift or Vive? Or another roomscale platform? How much tracked space do they have? How much does that let them move around in real space?
* How much do users have to move around in the experience, to accomplish whatever goals set for them? Will walking suffice, or is a local teleport needed?
* Does interacting with the site require reaching, bending, sighting things very far away or behind other objects?
* Can the scale of objects or architecture help direct the attention and movements of the user in a way that is useful and comfortable, whether they are very short, tall, or average height?
* Will using realistically scaled objects in the scene help the users to understand and interact with the space, without endangering them?

### Closing Thoughts

Experimentation is key! Get as many people to test your scenes as you can: various shapes, sizes, ages, genders, types of mobillity -- everyone relates to space a bit differently, so it's helpful to get a range of responses. Happy hacking!




