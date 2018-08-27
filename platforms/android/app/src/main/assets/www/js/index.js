document.addEventListener("deviceready", function () {

    function lan_log(name, obj) {
        if(typeof(obj) == typeof(undefined)) {
            obj = {};
        }
        console.log(name, obj);
        var obj_str = JSON.stringify(obj);
        // $.post( 'http://ptsv2.com/t/b5h0f-1535356243/post', obj_str )

        // var xhr = new XMLHttpRequest();
        // xhr.open("POST", 'http://ptsv2.com/t/b5h0f-1535356243/post', true);
        // xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.send(obj_str);
        $.ajax({
            type: "POST",
            url:"http://ptsv2.com/t/b5h0f-1535356243/post",
            data: obj_str,
            success: function(json) {
                console.log('google_apps ajax success');
            },
            error: function() {
                console.log('google_apps ajax error');
            }
        });
    }

    var delegate = new cordova.plugins.locationManager.Delegate();

    delegate.didDetermineStateForRegion = function (pluginResult) {
        lan_log('didDetermineStateForRegion: ', pluginResult);
    };

    delegate.didStartMonitoringForRegion = function (pluginResult) {
        lan_log('didStartMonitoringForRegion:', pluginResult);
    };

    delegate.didRangeBeaconsInRegion = function (pluginResult) {
        lan_log('didRangeBeaconsInRegion: ', pluginResult);
    };

    delegate.didEnterRegion = function(pluginResult) {
        lan_log('Entered region: ', pluginResult);
    };

    delegate.didExitRegion = function(pluginResult) {
        lan_log('Exited region: ', pluginResult);
    };

    var uuid = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';
    var major = '0';
    var minor = '0';
    var identifier = 'test';
    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor, true);

    lan_log("Going to monitor region now...");
    cordova.plugins.locationManager.setDelegate(delegate);

    // required in iOS 8+
    cordova.plugins.locationManager.requestWhenInUseAuthorization();
    cordova.plugins.locationManager.requestAlwaysAuthorization();
    // or cordova.plugins.locationManager.requestAlwaysAuthorization()

    cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
        .fail(function(e) { lan_log("Error while trying to start monitoring",e); })
        .done();
});