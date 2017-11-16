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
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this));
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
        let self = this;
        this.storage = new GeolistStorage();
        this.storage.initializeDatabase(()=>{
            self.storage.getAll((positions) =>self.appendAllPosition(positions));
        })
    },

    appendAllPosition : function(positions) {
        $('.geolist').empty();
        for(position of positions){
            this.appendPosition(position);
        }
    },

    appendPosition : function(position) {
        $('.geolist').append('<li><a class="postion-link" href="#" data-id="'+position.id+'">' + position.text+ '</a><input data-id="'+position.id+'" class="position-delete" type="button" value="Delete"></li>');
    },


    registerEvents : function() {
        let self = this;
        $('#geolocation-add').click(()=>{
            let text = $('#geolocation-text').val();
            if(!text){
                navigator.notification.alert("Please insert a Text");
                return;
            }
            self.storage.add(text, (createdPosition) => self.appendPosition(createdPosition));
        });


        $('.geolist').on("click",".position-delete",(event)=>{
            self.storage.delete($(event.target).data("id"),()=>{
                self.storage.getAll((positions) =>self.appendAllPosition(positions));
            });
        });
    },

};

app.initialize();