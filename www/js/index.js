function onDeviceReady() {
    // 必要な権限を取得
    // 通知の権限
    cordova.plugins.notification.local.requestPermission(function () {
        console.log("Notification permitted.")
    });
    
    // 位置情報を取得。常に取得とします。
    cordova.plugins.locationManager.requestAlwaysAuthorization();
    
    // delegateの作成と設定
    var delegate = new cordova.plugins.locationManager.Delegate();
    delegate.didDetermineStateForRegion = function(pluginResult) {
        console.log('didDetermineStateForRegion', pluginResult);
    }
    delegate.didStartMonitoringForRegion = function(pluginResult) {
        console.log('didStartMonitoringForRegion', pluginResult);
    }
    
    delegate.didRangeBeaconsInRegion = function(pluginResult) {
        console.log('didRangeBeaconsInRegion', pluginResult);
    }
    
    delegate.didEnterRegion = function(pluginResult) {
        console.log('didEnterRegion', pluginResult);
        cordova.plugins.notification.local.schedule({
            id: 101,
            title: "didEnterRegion",
            text: "didEnterRegion",
            trigger: {at: new Date(new Date().getTime() + (1 * 1000))}
        });
    }
    delegate.didExitRegion = function(pluginResult) {
        console.log('didExitRegion', pluginResult);
        cordova.plugins.notification.local.schedule({
            id: 100,
            title: "didExitRegion",
            text: "didExitRegion",
            trigger: {at: new Date(new Date().getTime() + (1 * 1000))}
        });
    }
    
    cordova.plugins.locationManager.setDelegate(delegate);
    
    // 監視するビーコンの作成
    var uuid = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'; //ビーコンのUUID
    var identifier = 'test.beacon.xxxx'; // 任意のID
    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, 0, 0);
    beaconRegion.notifyEntryStateOnDisplay = true;

    // 監視の開始
    // cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
    //     .fail(console.error)
    //     .done();
        
    cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
        .fail(function(e) { console.error(e); })
        .done();
}

document.addEventListener('deviceready', onDeviceReady, false);