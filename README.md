# Dasz

Dasz is a dashboard application for monitoring various services that are used on day to day basics.
It aim is to provide easy to use and extend dashboard framework.

It's inspired by http://dashing.io/
Notable differences are that Dasz is written in JavaScript only. It runs on Node.js and uses React.

## Creating your own widget

Each widget's code should be placed inside a designed folder under the `widgets` directory.
Widget should consists of 3 files:

* style.scss - styles definition for client-side of widget
* widget.jsx - definition of client-side logic
* worker.js - for server-side logic

Dasz provides an efficent, one way communication between `worker.js` and `widget.jsx`

### Widget from npm package

Instead of putting widget instide `widgets` directory, widgets can be installed from npm. For example

    npm i dasz-widget-ping

Will install the `ping` widget. When creating npm package, the outcome file `widget.jsx` should be pased using babel
with presets `es2015` and `react`. All output files (especially `worker.js` and `widget.jsx`) should be placed inside `dist`
directory of the package. For more details, please see the build script of the `ping` widget, available here:
https://github.com/dotintegral/dasz-widget-ping

### Creating worker file

Worker is that part of each widget that checks the state of given service.
The required API of each worker consists of 2 methods:

* on - methods for adding event listeners, usualy can be taken an Node's native `events.EventEmitter` instance
* getInitialState - method that registres new widget instance and it's configuration and returns an initial state for that widget

#### `getInitialState(widgetId, config)`

Whenever a new widget instance is being created, `getInitialState` is being called. It should return an initial state for the newly created instance. Since the method is synchronus, it should not perform any actions that might take some time (like checking if your service is available). It should just register the component with it's configuration and return an initial state (like a 'widget loading...' message).

Now, notice that you can have a multiple instances of widgets defined inside multiple board config files, but all of them will be connected to a single worker. So there is only one worker per widget type. One can spawn separate workers inside main `worker.js` file if needed.

#### `on(eventName, callback(ids, data))`

An implementation of event bus, identically to `events.EventEmitter.on`. In fact, it's prefered to use native Node's events.

The simplest implementation of that method would be

    var events = require('events')
    var eventEmitter = new events.EventEmitter()

    module.exports = {
      on: eventEmitter.on.bind(eventEmitter),
      getInitialState: getInitialState
    }

The only way that worker is allowed to communicate with widget instances is by triggering an `update` event. It must contain 2 arguments:

* ids - array ids of widget that have to be upadated
* data - an state object for given widgets to be in. This is the same data that received inside the `widget.jsx` as `props.data`.

Notice that multiple widget instances can be updated with a single data because of the array of ids.

    eventEmitter.emit('update', [1, 2, 3], {what: 'my data'})
