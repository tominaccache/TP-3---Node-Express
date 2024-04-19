import ValidacionesHelper from "./validaciones-helper.js";

const validarFecha = (miFecha) => {
    const meses31 = [1,3,5,7,8,10,12];
    const dia = (ValidacionesHelper.getIntegerOrDefault(miFecha[2]),-1) ? miFecha[2] : -1;
    const mes = (ValidacionesHelper.getIntegerOrDefault(miFecha[2]),-1) ? miFecha[1] : -1;
    const year = (ValidacionesHelper.getIntegerOrDefault(miFecha[2]),-1) ? miFecha[0] : -1;
    const myDate = (dia != -1 && mes != -1 && year != -1) ? new Date(`${year}-${mes}-${dia}`) : NaN;

    if(isNaN(myDate)){
        return false;
    }else{
        let loEncontre = false;
        for (let i = 0; i < meses31.length; i++) {
            if(mes == meses31[i])loEncontre = true;
        }

        if(loEncontre == true)return true;

        else if(loEncontre == false && dia < 31 && mes != 2) return true

        else{
            let leapYear = (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
            if(leapYear == true && dia <= 29)return true;
            else if(leapYear == false && dia < 29) return true;
            else return false;
        }
    }
}

const leapYear = (year) => {
    return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
}

const miEdad = (miFecha) => {
    
    let miEdad = 0;
    const miCumple = new Date(`${miFecha[0]}-${miFecha[1]}-${miFecha[2]}`);
        const hoy = new Date();
        let dias = Math.floor((hoy.getTime() - miCumple.getTime())/1000/60/60/24);
        for (let i = miCumple.getFullYear(); i <= hoy.getFullYear(); i++){
            let daysYear = leapYear(i) ? 366 : 365;
            if (dias >= daysYear){
            dias -= daysYear;
            miEdad++;
            }
        }
    return miEdad;
}

export { validarFecha, leapYear, miEdad };