import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/omdb-wrapper.js"
import Alumno from "./models/alumno.js"
import express, { response } from "express"; 
import DateTimeHelper from "./modules/DateTimeHelper.js";
import cors from "cors";

const app = express();
const port = 3000;

// Agrego los Middlewares
app.use(cors()); // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON

//1 TERMINADO
app.get("/", (req, res) => {
    res.status(200).send('¡Ya estoy respondiendo!');
  });

//2 TERMINADO
app.get('/saludar/:nombre', (req, res) => {
    res.status(200).send(`Hola ${req.params.nombre}.`);
});

//3 TERMINADO
app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    const meses31 = [1,3,5,7,8,10,12];
    const mes = parseInt(req.params.mes,10);
    const year = parseInt(req.params.ano,10);
    const myDate = new Date(`${req.params.ano}-${req.params.mes}-${req.params.dia}`);

    if(isNaN(myDate)){
        res.status(400).send(`Elija una fecha valida.`);
    }else{
        let loEncontre = false;
        for (let i = 0; i < meses31.length; i++) {
            if(mes == meses31[i]){
                loEncontre = true;
            }
        }
        if(loEncontre == true){
            res.status(200).send(`Perfecto!`);
        }
        else if(loEncontre == false && req.params.dia < 31 && mes != 2){
            res.status(200).send(`Perfecto!`);
        }else{
            let leapYear = (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
            if(leapYear == true && req.params.dia <= 29){
                res.status(200).send(`Perfecto!`);
            }
            else if(leapYear == false && req.params.dia < 29){
                res.status(200).send(`Perfecto!`);
            }
            else{
                res.status(400).send(`Elija una fecha valida.`);
            }
        }
    }
});


/* MATEMATICA */

//4 TERMINADO
app.get('/matematica/sumar', (req, res) => { 
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
        res.status(400).send('Ambos parámetros deben ser números.');
        return;
    }
    const resultado = sumar(n1,n2);
    res.status(200).send(`El resultado de la suma es: ${resultado}`);
})

//5 TERMINADO
app.get('/matematica/restar', (req, res) => { 
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
        res.status(400).send('Ambos parámetros deben ser números.');
        return;
    }
    const resultado = restar(n1,n2);
    res.status(200).send(`El resultado de la resta es: ${resultado}`);
})

//6 TERMINADO
app.get('/matematica/multiplicar', (req, res) => { 
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
        res.status(400).send('Ambos parámetros deben ser números.');
        return;
    }
    const resultado = multiplicar(n1,n2);
    res.status(200).send(`El resultado de la multiplicación es: ${resultado}`);
})

//7 TERMINADO
app.get('/matematica/dividir', (req, res) => { 
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
        res.status(400).send('Ambos parámetros deben ser números.');
        return;
    }
    if (n2 == 0) {
        res.status(400).send('¡El divisor no puede ser 0!');
        return;
    }
    const resultado = dividir(n1,n2);
    res.status(200).send(`El resultado de la división es: ${resultado}`);
})


/* OMDB */

const APIKEY = "ef1edd31";
//8  TERMINADO
app.get('/omdb/searchbypage', async (req, res) => { 
    const search = req.query.search;
    const p = req.query.p;
    res.status(200).send(await OMDBSearchByPage(search, p));
})

//9 TERMINADO
app.get('/omdb/searchcomplete', async (req, res) => { 
    const search = req.query.search;
    res.status(200).send(await OMDBSearchComplete(search));
})

//10 TERMINADO
app.get('/omdb/getbyomdbid', async (req, res) => { 
    const imdbID = req.query.imdbID;
    res.status(200).send(await OMDBGetByImdbID(imdbID));
})



/* ALUMNO */

let alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido" , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao" , "32623391", 18));

//11 TERMINADO
app.get('/alumnos', (req, res) => { 
    res.status(200).send(alumnosArray);
})

//12 TERMINADO
app.get('/alumnos/:dni', (req, res) => { 
    const dni = req.params.dni;
    const alum = alumnosArray.find(a => a.DNI == dni);
    if (alum === -1) res.status(404).send('DNI no encontrado.')
    else res.status(200).send(`El alumno buscado es: ${alum["username"]}, DNI; ${alum["DNI"]}, ${alum["edad"]} años.`);
})

//13 TERMINADO
app.post('/alumnos/:username/:dni/:edad', (req, res) => {
    const username = req.params.username;
    const dni = req.params.dni;
    const edad = req.params.edad;

    if (edad < 0 || edad > 150) {
        res.status(400).send('Edad inexistente');
        return;
    }
    else if (dni.length > 8) {
        res.status(400).send('El DNI debe tener hasta 8 caracteres.');
        return;
    }
    else if(username === null || dni === null || edad === null) {
        res.status(400).send('Por favor, proporcione todos los datos necesarios.');
        return;
    }

    let encontrado = false;
    alumnosArray.forEach(a => { if (a.DNI == dni) encontrado = true });
        
    if(!encontrado){
        const alumnoNuevo = new Alumno(username, dni, edad);
        alumnosArray.push(alumnoNuevo);
        res.status(201).send('Alumno creado satisfactoriamente.');
    }
    else res.status(400).send('El alumno ya se encuentra en la base de datos.');
});


//14 TERMINADO 
app.delete('/alumnos/:dni', (req, res) => {
    const eliminarDni = req.params.dni;
    const index = alumnosArray.findIndex(alumno => alumno.DNI == eliminarDni);
    if (index === -1) res.status(404).send('Alumno no encontrado.');
    else {
        alumnosArray.splice(index, 1);
        res.status(200).send('Alumno eliminado correctamente.');
    }
});



/* MAS VALIDACIONES - PARTE 2 */

//1 TERMINADO
app.get('/fechas/isDate', (req, res) => {
    const fecha = req.query.fecha;

    return (DateTimeHelper.isDate(fecha) === true) ? res.status(200).send(`Perfecto! Tu fecha es valida :)`) : res.status(400).send(`Elija una fecha valida.`);
})

//2
app.get('/fechas/getEdadActual', (req, res) => {
    const fecha = req.query.fechaNacimiento;
    let miEdad = DateTimeHelper.getEdadActual(fecha);
    if(miEdad === false) return res.status(400).send("Todos los valores tienen que ser validos!");
    if(miEdad != 0) return res.status(200).send(`Felicidades! Tenes ${miEdad} años :)`);
    return res.status(200).send(`No decido si todavía no naciste, o todavía no cumplist el año. Either way, tenes cero años :$`);
})

//3
app.get('/fechas/getDiasHastaMiCumple', (req, res) => {
    const fecha = req.query.fechaNacimiento;
    let diasHastaMiCumple = DateTimeHelper.getDiasHastaMiCumple(fecha);
    if(diasHastaMiCumple === false) return res.status(400).send("Todos los valores tienen que ser validos!");
    if(diasHastaMiCumple == 0) return res.status(200).send(`AAAAAAAH! Mañana es tu cumple! Solo falta un día :)))`);
    if(diasHastaMiCumple == 364) return res.status(200).send(`Que te haces!!!! Hoy es tu cumple, felicidades :)`);
    if(diasHastaMiCumple == 1) return res.status(200).send(`Quedan 2 días hasta tu cumple! Ya llega :)`);
    return res.status(200).send(`Quedan ${diasHastaMiCumple + 1} días hasta tu cumple!`);
})

//4
app.get('/fechas/getDiaTexto', (req, res) => {
    const fecha = req.query.fecha;
    const abr = req.query.abr;

    let miDia = DateTimeHelper.getDiaTexto(fecha, abr);
    if(miDia === false) return res.status(400).send("Todos los valores tienen que ser validos!");
    return res.status(200).send(`${JSON.stringify(miDia)}`);
})

//5
app.get('/fechas/getMesTexto', (req, res) => {
    const fecha = req.query.fecha;
    const abr = req.query.abr;

    let miMes = DateTimeHelper.getMesTexto(fecha, abr);
    if(miMes === false) return res.status(400).send("Todos los valores tienen que ser validos!");
    return res.status(200).send(`${JSON.stringify(miMes)}`);
})




app.listen(port, () => { // Inicio el servidor WEB (escuchar)
 console.log(`Listening on http://localhost:${port}`)
})