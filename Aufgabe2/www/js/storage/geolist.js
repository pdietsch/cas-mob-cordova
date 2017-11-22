class GeolistStorage{

    constructor(){
        this.POSITION_TABLE = "Position";
    }

    initializeDatabase(callback){
        //Initialize DataBaseConnection
    }

    dropTable(callback){
        this.db.executeSql("DROP TABLE IF EXISTS "+this.POSITION_TABLE,[],()=>callback(),(error)=>console.log(error));
    }

    createDatabase(callback){
        //Create DataBase Table if not exist
    };

    get(id){

    };

    getAll(){

    };


    add(text){
        return new Promise((resolve, reject) =>{
            resolve(new Position(0, text));
        })
    };

    delete(id){

    };

}