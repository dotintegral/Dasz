# Dasz

Dasz is a dashboard application for monitoring various services that are used on day to day basics.
It aim is to provide easy to use and extend dashboard framework.

It's inspired by http://dashing.io/
Notable differences are that Dasz is written in JavaScript only. It runs on Node.js and React framework.

## Creating your own widget

Each widget's code should be placed inside a designed folder under the `widgets` directory.
Widget should consists of 3 files:

* style.scss - styles definition for client-side of widget
* widget.jsx - definition of client-side logic
* worker.js - for server-side logic

Dasz provides a efficent, one way communication between `worker.js` and `widget.jsx`
