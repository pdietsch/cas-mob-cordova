class Position{
    constructor(id, text, coordinate){
        this.id = id;
        this.text = text;
        this.coordinate = convertGeoLocationToPlainObject(coordinate);
    }
}