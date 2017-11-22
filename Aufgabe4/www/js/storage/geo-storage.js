class GeolistStorage{

    constructor(){
        this.POSITION_TABLE = "Position";
    }

    initializeDatabase(callback){
        this.db = window.sqlitePlugin.openDatabase({name:'geo.db', location: 'default'});
        //this.dropTable(()=> this.createDatabase(callback));
        this.createDatabase(callback);
    }

    dropTable(callback){
        this.db.executeSql("DROP TABLE IF EXISTS "+this.POSITION_TABLE,[],()=>callback(),(error)=>console.log(error));
    }

    createDatabase(callback){
        let createScript = 'CREATE TABLE IF NOT EXISTS '+this.POSITION_TABLE+' (id INTEGER PRIMARY KEY AUTOINCREMENT,text TEXT,coordination BLOB)';
        this.db.executeSql([
                createScript
        ], [],
            () => {
                console.log("Geo db OK");
                callback();
            },
            (error) => console.log("Geo db error" + error.message)
        )
    };

    get(id){
        return new Promise((resolve, reject)=>{
            this.db.executeSql("SELECT * FROM " + this.POSITION_TABLE + " WHERE id = ?", [id],
                (resultSet) => resolve(this.createPositionFromDbItem(resultSet.rows.item(0))),
                (error) => reject(error));
        });
    };

    getAll(){
        return new Promise((resolve, reject) =>{
            this.db.executeSql("SELECT * FROM " + this.POSITION_TABLE, [],
                (resultSet) => {
                    let result = [];
                    for(let i = 0; i < resultSet.rows.length; i++){
                        result.push(this.createPositionFromDbItem(resultSet.rows.item(i)));
                    }
                    resolve(result);
                }, (error) => reject(error));
        });
    };

    createPositionFromDbItem(item){
        return new Position(item.id, item.text, JSON.parse(item.coordination));
    }

    add(text, geolocation){
        return new Promise((resolve, reject) =>{
            this.db.executeSql('INSERT INTO '+this.POSITION_TABLE+'(text,coordination) VALUES (?,?)', [text,JSON.stringify(geolocation)],
                (resultSet)=> resolve(new Position(resultSet.insertId,text,geolocation)),
                (error) =>  reject(error));
        });

    };

    delete(id){
        return new Promise((resolve, reject)=> {
                this.db.executeSql('DELETE FROM ' + this.POSITION_TABLE + ' WHERE id = ?', [id],
                    () => resolve(),
                    (error) => reject(error));
            });
    };

}