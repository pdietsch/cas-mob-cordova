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
let app = {
    currentposition : null,
    initialize: function() {
        document.addEventListener("deviceready", this.onDeviceReady.bind(this));
    },
    onPause: function(e) { console.log(e)},
    onResume: function(e) { console.log(e)},
    onBackButton: function(e) {
        this.map.back();
        e.preventDefault();
    },
    onVolumeDownButton: function(e) { navigator.notification.alert("Psssst")},
    onVolumeUpButton: function(e){  console.log(e)},

    onDeviceReady: function() {
        document.addEventListener("pause", this.onPause.bind(this));
        document.addEventListener("resume", this.onResume.bind(this));
        document.addEventListener("backbutton", this.onBackButton.bind(this));
        document.addEventListener("volumedownbutton", this.onVolumeDownButton.bind(this));
        document.addEventListener("volumeupbutton", this.onVolumeUpButton.bind(this));
        this.initializeStorage();
        this.registerEvents();
    },

    initializeStorage : function() {
        this.storage = new GeolistStorage();
        this.storage.initializeDatabase(()=>{
            this.storage.getAll()
                .then(positions =>this.appendAllPosition(positions))
                .catch(error => console.log(error.message));
        })

    },

    appendAllPosition : function(positions) {
        let geolist = document.getElementById("geolist");
        geolist.innerHTML = "";
        for(position of positions){
            this.appendPosition(geolist, position);
        }
    },

    appendPosition : function(parent, position) {
        let template = document.createElement("template");
        template.innerHTML = '<li><a class="position-link" href="#" data-id="'+position.id+'">' + position.text+ ' ' +this.geoPositionToString(position.coordinate) +'</a><input data-id="'+position.id+'" class="position-delete" type="button" value="Delete"></li>';
        let childToAdd = template.content.firstChild;
        parent.appendChild(childToAdd);
        childToAdd.getElementsByClassName("position-link")[0].addEventListener("click",(event)=>{
            this.storage.get(event.target.dataset.id)
                .then(position=> this.map.setMarker(position.coordinate, position.text))
                .catch(error => console.log(error.message));
        });

        childToAdd.getElementsByClassName("position-delete")[0].addEventListener("click",(event)=>{
            this.storage.delete(event.target.dataset.id)
                .then(() => this.storage.getAll()
                    .then(positions =>this.appendAllPosition(positions))
                    .catch(error => console.log(error.message)))
                .catch(error => console.log(error.message));
        });
    },

    geoPositionToString : function(position) {
        return Math.round(position.coords.latitude*1000)/1000 +' '+Math.round(position.coords.longitude*1000)/1000
    },


    registerEvents : function() {
        document.getElementById("geolocation-add").addEventListener("click", ()=>{
            let text = document.getElementById('geolocation-text').value;
            if(!text){
                navigator.notification.alert("Please insert a Text");
                return;
            }
            if(!this.currentposition){
                navigator.notification.alert("Please wait for coordination");
                return;
            }
            this.storage.add(text, this.currentposition)
                .then(createdPosition => this.appendPosition(document.getElementById("geolist"), createdPosition))
                .catch(error => console.log(error.message));
        });
    },

};

app.initialize();