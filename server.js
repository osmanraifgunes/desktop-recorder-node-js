const net = require('net');
const screenshot = require('screenshot-desktop')

var sunucu = net.createServer();

sunucu.on('connection', function (socket) {
    var sender = function () {
        screenshot().then(function (img) {
            socket.write(img, function () {
                socket.pause()
                    sender();
            });
        }).catch((err) => {
            debugger;
        })

    }
    sender();
});



sunucu.listen('3030', function () {
})