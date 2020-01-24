export class DateHelper{
    
    constructor () {
        throw new Error("DateHelper não pode ser instaciado");
    }

    static dataParaTexto(data){
        return `${data.getDate()}/${data.getMonth() +1 }/${data.getFullYear()}`;
    }

    static textoParaData(texto){

        if(!/\d{2}\/\d{2}\/\d{4}/.test(texto)) throw new Error("Deve estar no formato dd/mm/aaaa");

        return new Date(...texto.split('/').reverse().map((item, indice) => {
            if(indice == 1){
                return item-1;
            }
            return item;
        }));
    }


}