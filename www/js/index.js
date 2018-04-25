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
	
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        switch(id){
			case 'deviceready':
				document.getElementById('app').setAttribute('style', 'display:none;');
				
				/*let iframe = document.getElementById('mainFrame');
				iframe.setAttribute('style', 'display:block; height:' + window.innerHeight + 'px; width:' + window.innerWidth + 'px;');*/
				
				let site = document.getElementById('site');
				site.innerHTML = '<object type="text/html" id="siteObj" data="https://www.grapeapp.it/mobile/"></object>';
				document.getElementById('siteObj').setAttribute('style', 'display:block; height:' + window.innerHeight + 'px; width:' + window.innerWidth + 'px;');

				console.log('Received Event: ' + id);
			break;
			case 'online':
				//Nessuna azione da compiere
				//this.receivedEvent('deviceready');
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