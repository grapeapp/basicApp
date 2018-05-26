/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    
	bindEvents: function() {
        document.addEventListener('online', this.onOnline, false);
        document.addEventListener('offline', this.onOffline, false);
		document.addEventListener('deviceready', this.onReady, false);
    },
    
	onOnline: function() {
        app.receivedEvent('online');
    },
	
	onOffline: function(){
		app.receivedEvent('offline');
	},
	
	onReady: function(){
		app.receivedEvent('deviceready');
	},
	
	loadStopHandler: function(ref){
		//ref.executeScript({ code: "sessionStorage.setItem('isApp','OK');" });
	},

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
		switch(id){
			case 'deviceready':
				var onSuccess = function(position) {
					$.get("https://maps.googleapis.com/maps/api/geocode/json?region=IT&key=AIzaSyDBrp0u-6LHKUJvC98SV5tPlny4SR5M7gk&latlng="+(position.coords.latitude + "," + position.coords.longitude), function(response){
						
						//Cerco all'interno del risultato la REGIONE
						region = 'FAIL';
						for(let i = 0; i < response.results.length; i++){
							for(let c = 0; c < response.results[i].address_components.length; c++){
								if(response.results[i].address_components[c].types.indexOf("administrative_area_level_1") >= 0){
									region = response.results[i].address_components[c].long_name;
								}
							}
						}
						//Pulisco location da spazi e trattini
						region = region.replace(/[^a-zA-Z]/g, "");
						
						var ref = cordova.InAppBrowser.open('https://www.grapeapp.it/app/'+region, '_blank', 'location=no');
						/*ref.addEventListener("loadstop", function(){
							app.loadStopHandler(ref);
						}.bind(this));*/
						ref.show();
					}).fail(function(){
						var ref = cordova.InAppBrowser.open('https://www.grapeapp.it/app/FAIL', '_blank', 'location=no');
						/*ref.addEventListener("loadstop", function(){
							app.loadStopHandler(ref);
						}.bind(this));*/
						ref.show();
					});
				};

				function onError(error) {
					var ref = cordova.InAppBrowser.open('https://www.grapeapp.it/app/FAIL', '_blank', 'location=no');
					/*ref.addEventListener("loadstop", function(){
						app.loadStopHandler(ref);
					}.bind(this));*/
					ref.show();
				}
				document.getElementById('app').setAttribute('style', 'display:none;');
				navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});
			break;
			case 'online':
				//Nessuna azione da compiere
			break;
			case 'offline':
				//Gestione offline: app non funzionante
				document.getElementById('mainFrame').setAttribute('style', 'display:none;');
				document.getElementById('offline').setAttribute('style', 'display: block;');
				document.getElementById('deviceready').setAttribute('style', 'display:none;');
				document.getElementById('app').setAttribute('style', 'display:block;');
			break;
		}
    }
};