const stores = ['negociacoes'];
const version = 4;
const dbName = 'aluraframe';

let connection = null;
let close = null;

export class ConnectionFactory{
    
    constructor(){
        throw new Error("Não é possível criar instancia de Connection Factory");
    }

    static getConnection(){
        return new Promise((resolve, reject) =>{
            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStore(e.target.result);
            };
            
            openRequest.onsuccess = e => {
                if (!connection) {
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function () {
                        throw new Error("Você não pode fechar uma conexão diretamente");
                    };
                }
                resolve(connection);
                
            };
            
            openRequest.onerror = e => {
                console.log(e.target.error);
                reject(e.target.error.name);
            };
        });
    }
    
    static _createStore(connection){
        
        stores.forEach(store => {
            if (connection.objetctStoresNames.contains(store)) {
                connection.deleteObjetctStore(store);
            }
    
            connection.createObjectStore(store, {
                autoIncremet: true,
            });
        });
    }

    static _closeConnection(){
        if(connection){
            close();
            connection = null;
        }
    }
}
