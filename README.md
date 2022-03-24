# desktop-recorder-node-js

Simple screen recorder using screenshot images. 

Dependencies : **ffmpeg**, **node 10+** and **https://www.npmjs.com/package/screenshot-desktop**

**node direct-record.js** to record local desktop.

start **node server.js** then start **node client.js** to save over network.

To overcome screen performance problem, increate the **captureInterval** variable 

Output is very small sized thanks to ffmpeg.
