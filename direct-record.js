const screenshot = require('screenshot-desktop')
const spawn = require('child_process').spawn;
const stream = require('stream');
const imagesStream = new stream.PassThrough();
var cmd = 'ffmpeg';
var args = ['-y', '-f', 'image2pipe',
    '-s', '1200X600',
    '-framerate', '5',
    '-pix_fmt', 'yuv420p',
    '-i', '-',
    '-vcodec', 'mpeg4',
    'video.avi'
];
var captureInterval = 10;
var proc = spawn(cmd, args);
imagesStream.pipe(proc.stdin);

var saver = function () {
    screenshot().then(function (img) {
        imagesStream.write(img, 'utf8');
        setTimeout(() => {
            saver();
        }, captureInterval);
    }).catch((err) => {
        debugger;
    })
}
saver();

