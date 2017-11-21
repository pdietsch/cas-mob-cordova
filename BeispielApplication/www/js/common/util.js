function convertGeoLocationToPlainObject(geolocation){
    return {
        timestamp : geolocation.timestamp,
        coords : {
            accuracy: geolocation.coords.accuracy,
            altitude: geolocation.coords.altitude,
            altitudeAccuracy: geolocation.coords.altitudeAccuracy,
            heading: geolocation.coords.heading,
            latitude: geolocation.coords.latitude,
            longitude: geolocation.coords.longitude,
            speed: geolocation.coords.speed
        }
    };
}