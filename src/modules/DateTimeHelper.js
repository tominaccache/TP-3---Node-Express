import ValidacionesHelper from "./validaciones-helper.js";
class DateTimeHelper {
    leapYear = (year) => {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    getOnlyDate = (fecha = new Date()) => {
        let miFecha = fecha.split("-");
        miFecha.forEach(estaFecha => {
            if(ValidacionesHelper.getStringOrDefault(estaFecha,"-1") == "-1") return false;
        });

        const dia = (ValidacionesHelper.getIntegerOrDefault(miFecha[2]),-1) ? miFecha[2] : -1;
        const mes = (ValidacionesHelper.getIntegerOrDefault(miFecha[1]),-1) ? miFecha[1] : -1;
        const year = (ValidacionesHelper.getIntegerOrDefault(miFecha[0]),-1) ? miFecha[0] : -1;
        const myDate = (dia != -1 && mes != -1 && year != -1) ? new Date(`${year}-${mes}-${dia}`) : NaN;
        if(isNaN(myDate) == true) return false;
    };

    isDate = (fecha) => { 
        if(this.getOnlyDate(fecha) == false) return res.status(400).send("Todos los valores tienen que ser validos");
        let miFecha = fecha.split("-");
        return this.validarUnaFecha(miFecha);
    };

    getEdadActual = (fechaNacimiento) => {
        if(this.getOnlyDate(fechaNacimiento) == false) {return false};
        let miFecha = fechaNacimiento.split("-");
        let miEdad = 0;
        if (this.validarUnaFecha(miFecha)) {
            for (let i = 1; miFecha[0].length < 4; i++) {
                miFecha[0] = (("0") + miFecha[0]);
            }

            let myYear = miFecha[0];
            const miCumple = new Date(`${miFecha[0]}-${miFecha[1]}-${miFecha[2]}`);
            const hoy = new Date();
            let dias = Math.floor((hoy.getTime() - miCumple.getTime())/1000/60/60/24);

            for (let i = myYear; i <= hoy.getFullYear(); i++){
                let daysYear = this.leapYear(i) ? 366 : 365;
                if (dias >= daysYear){
                dias -= daysYear;
                miEdad++;
                }
            }
        }
        return miEdad;
    };

    getDiasHastaMiCumple = (fechaNacimiento) => { 
        if(this.getOnlyDate(fechaNacimiento) == false) return false;
        let miFecha = fechaNacimiento.split("-");
        let diasHastaMiCumple = 0;
        if (this.validarUnaFecha(miFecha)) {
            
            let miCumple = new Date(`${miFecha[0]}-${miFecha[1]}-${miFecha[2]}`);
            const hoy = new Date();
            miCumple.setFullYear(hoy.getFullYear());
            if (hoy > miCumple) {
                miCumple.setFullYear(hoy.getFullYear() + 1);
            }
            diasHastaMiCumple = Math.floor((miCumple - hoy) / (1000*60*60*24))    
        }
        return diasHastaMiCumple;
    };

    getDiaTexto = (fecha, retornarAbreviacion = false) => { 
        let dias = [ "Domingo", "Lunes", "Martes", "Miercoles", "Jueves",
                "Viernes", "Sabado"];
        let res = {
            dia : ""
        }

        if(this.getOnlyDate(fecha) == false) return false;
        let miFecha = fecha.split("-");
        if (this.validarUnaFecha(miFecha)) {
            const laFecha = new Date(fecha);
            res['dia'] = (retornarAbreviacion == true || retornarAbreviacion.toLowerCase() == "true") ? dias[laFecha.getDay()].substring(0,3) : dias[laFecha.getDay()]; 
        }
        return res;
    };

    getMesTexto = (fecha, retornarAbreviacion = false) => { 
        let meses = [ "Enero", "Febrero", "Marzo", "Abril", 
                "Mayo", "Junio", "Julio", "Agosto", "Septiembre", 
                "Octubre", "Noviembre", "Diciembre" ];
        let res = {
            mes : ""
        }

        if(this.getOnlyDate(fecha) == false) return false;
        let miFecha = fecha.split("-");
        if (this.validarUnaFecha(miFecha)) {
            res['mes'] = (retornarAbreviacion == true || retornarAbreviacion.toLowerCase() == "true") ? meses[miFecha[1] - 1].substring(0,3) : meses[miFecha[1] - 1];
        }
        return res;
    };

    validarUnaFecha = (miFecha) => {
        const dia =  miFecha[2];
        const mes = miFecha[1];
        const year = miFecha[0];


        const meses31 = [1,3,5,7,8,10,12];
        
        let loEncontre = false;
        for (let i = 0; i < meses31.length; i++) {
            if(mes == meses31[i])loEncontre = true;
        }

        if(loEncontre == true) return true;

        else if(loEncontre == false && dia < 31 && mes != 2) return true;

        else{
            if(this.leapYear(year) == true && dia <= 29) return true;
            else if(this.leapYear(year) == false && dia < 29) return true;
            else return false;
        }
    }
}
export default new DateTimeHelper();