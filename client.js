var net = require('net');
const fs = require('fs');
var stream = require('stream');

var client = new net.Socket();


client.connect(3030, 'localhost', function () {
    console.log('Connected');
    client.write('Hello, server! Love, Client.');
});


var startChild = function () {
    var spawn = require('child_process').spawn;

    var cmd = 'ffmpeg';

    var args = ['-y', '-f', 'image2pipe',
        '-s', '1200X600',
        '-framerate', '5',
        '-pix_fmt', 'yuv420p',
        '-i', '-',
        '-vcodec', 'mpeg4',
        'test.avi'
    ];

    var proc = spawn(cmd, args);
    proc.stdout.on('data', function (data) {
        debugger;
        console.log(data);
    });

    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', function (data) {
        debugger;
        console.log(data);
    });

    proc.on('close', function () {
        debugger;
        console.log('finished');
    });

    proc.on('error', function (err) {
        debugger;
        console.log('finished');
    });

    proc.stdin.on('pipe', function (src) {
        debugger;
        console.log('std pipe');
    });
    return proc;

}

var proc = startChild();
// var bufferStream = new stream.PassThrough();
// bufferStream.pipe(proc.stdin);
var i = 1;
var tmpData = [];
var imagesStream = new stream.PassThrough();
imagesStream.pipe(proc.stdin);

client.on('data', function (data) {

    if (data.length != 65536) {
        tmpData = tmpData.concat(data);
        imagesStream.write(Buffer.concat(tmpData), 'utf8');
        tmpData = [];
    }
    else {
        tmpData = tmpData.concat(data);
    }

});


client.on('close', function () {
    console.log('Connection closed');
});