/**
 * Created by kamill on 6/12/16.
 */
var api = require('mikronode');

var connection = new api('192.168.88.1', 'admin', '');
connection.on('error', function (err) {
    console.log(err);
});
connection.connect(function (conn) {
    var chan = conn.openChannel();
    chan.write('/ip/address/print', function () {
        chan.on('done', function (data) {
            var parsed = api.parseItems(data);

            parsed.forEach(function (item) {
                console.log("Interface/IP: " + item.interface + "/" + item.address);
            });

            chan.close();
            conn.close();
        });
    });
});