# Jacobi
## A mystical space-time mapping framework

install dependencies:

    $ cd jacobi && npm install

run the app:

    $ DEBUG=jacobi:* npm start
    
run the emitter:

    $ node bin/emitter.js
    
Open the map application in the browser by going to `http:/localhost:3000`. Open the web console to see the sensor readings come streaming in. * **Note:** `emitter.js` currently emits readings every three seconds. That is only for testing purposes. Real world setting will be more like a reading every 10 mins or 30 mins. * 
  
**Jacobi** is the start of a mapping framework (application and API) for storing, managing, visualizing and sharing space-time data. The map view shows sensors. If the sensors are emitting data, the data can be viewed in real-time in the browser console.

To do:

- streaming charts
- mobile view
- a million other things

Jacobi’s namesake, the [Jacobikirche](http://jacobikirche.de) in Göttingen, wasn’t built in day, and neither will be this Jacobi. But hopefully it won’t take as long, esp. if you all help.

Of course, everything released under CC0 Public Domain Dedication.