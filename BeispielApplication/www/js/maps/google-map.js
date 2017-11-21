class GoogleMap{
    constructor(mapTag, backgroundColor){
        this.map = plugin.google.maps.Map.getMap(mapTag);
        plugin.google.maps.environment.setBackgroundColor(backgroundColor);
        this.history = [];
        
        this.currentPosition = null;
    }

    setMarker(position, text) {
        if(this.currentPosition){
            this.history.push(this.currentPosition);
        }
        this.currentPosition = {position : position, text: text};
        this.setMarkerInternal(position,text);
    }

    back(){
        if(this.history.length){
            let lastPosition = this.history.pop();
            this.setMarkerInternal(lastPosition.position, lastPosition.text);
        }
    }

    setMarkerInternal(position, text){
        let self = this;
        if (self.marker) {
            self.marker.remove();
        }
        this.map.animateCamera({
            target: {lat: position.coords.latitude, lng: position.coords.longitude},
            zoom: 17,
            tilt: 60,
            duration: 2000
        }, function () {
            self.map.addMarker({
                position: {lat: position.coords.latitude, lng: position.coords.longitude},
                title: text,
                animation: plugin.google.maps.Animation.BOUNCE
            }, function (marker) {
                self.marker = marker;
                marker.showInfoWindow();
            });
        });
    }
}