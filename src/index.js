import Alumno from "./models/alumno.js"
import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"

import express from "express"; // hacer npm i express 
import cors from "cors";

const app = express();
const port = 3000;

// Agrego los Middlewares
app.use(cors()); // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON

//1
app.get("/ejercicio1", (req, res) => {
    res.status(200).send('¡Ya estoy respondiendo!');
  });
//2
app.get('/ejercicio2/:nombre', (req, res) => {
    res.status(200).send(`Hola ${req.params.nombre}.`);
});
//3
app.get('/ejercicio3/validarfecha/:ano/:mes/:dia', (req, res) => {
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

//4
app.get('/matematica/sumar', (req, res) => { // EndPoint "/"
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.parqueryams.n2);
    if (isNaN(n1) || isNaN(n2)) {
        res.status(400).send('Ambos parámetros deben ser números.');
        return;
    }
    const resultado = n1+n2;
    res.status(200).send(`El resultado de la suma es: ${resultado}`);
})
//5
app.get('/matematica/restar', (req, res) => { // EndPoint "/"
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
        res.status(400).send('Ambos parámetros deben ser números.');
        return;
    }
    const resultado = n1-n2;
    res.status(200).send(`El resultado de la resta es: ${resultado}`);
})
//http://localhost:3000/matematica/restar?n1=5&n2=7
//6
app.get('/matematica/multiplicar', (req, res) => { // EndPoint "/"
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
        res.status(400).send('Ambos parámetros deben ser números.');
        return;
    }
    const resultado = n1*n2;
    res.status(200).send(`El resultado de la multiplicación es: ${resultado}`);
})

//7
app.get('/matematica/dividir', (req, res) => { // EndPoint "/"
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1) || isNaN(n2)) {
        res.status(400).send('Ambos parámetros deben ser números.');
        return;
    }
    if (n2===0) {
        res.status(400).send('¡El divisor no puede ser 0!');
        return;
    }
    const resultado = n1/n2;
    res.status(200).send(`El resultado de la división es: ${resultado}`);
})

const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido" , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao" , "32623391", 18));
//11
app.get('/alumnos', (req, res) => { // EndPoint "/"
    res.status(200).send(alumnosArray);
})
//12
app.get('/alumnos/:dni', (req, res) => { // EndPoint "/"
    const dni=req.params.dni;
    const alumnoEncontrado = alumnosArray.find(function(alumno) {
        return alumno.DNI === dni;
    });

    if (!alumnoEncontrado) {
        res.status(404).send('Dni no encontrado.');
        return;
    }
    res.status(200).send(`El dni buscado es: ${alumnoEncontrado.dni}.`);
})

//13 Por favor, proporcione todos los datos necesarios. ME APARECE ESTO
let alumnoNuevo;
app.post('/alumnos/:username/:dni/:edad', (req, res) => {
    const username=req.params.username;
    const dni=req.params.dni;
    const edad=req.params.edad;
if (edad<=0) {
    res.status(400).send('Edad erronea');
        return;
}
if (dni.length !== 8) {
    res.status(400).send('El DNI debe tener 8 caracteres.');
    return;
}
    if (isNaN(username) || isNaN(dni) || isNaN(edad)) {
        res.status(400).send('Por favor, proporcione todos los datos necesarios.');
        return;
    }
    alumnoNuevo = new Alumno(username, dni, edad);
    alumnosArray.push(alumnoNuevo);

    res.status(201).send('Alumno creado satisfactoriamente.');
});


//14 Fijarse porque siempre aparece alumno no encontrado
app.delete('/alumnos/:dni', (req, res) => {
    const eliminarDni = req.params.dni;
    const index = alumnosArray.findIndex(alumno => alumno.dni === eliminarDni);
    if (index === -1) {
        res.status(404).send('Alumno no encontrado.');
        return;
    }
    else if( alumnosArray.splice(index, 1)){
        res.status(200).send('Alumno eliminado correctamente.');
    }
   
    
});

















  


app.get('/', (req, res) => { // EndPoint "/"
    res.send('Hello World!');
})



app.get('/Comidillas', (req, res) => { // EndPoint "/"
    const send = [[{
        nombre: "Hellmans'",
        cantidad: 3,
        esKasher: true,
        tipo: "mayonesa"
    },
    {
        nombre: "Hellmans'",
        cantidad: 4,
        esKasher: true,
        tipo: "ketchup"
    },
    {
        nombre: "Hellmans'",
        cantidad: 2,
        esKasher: false,
        tipo: "barbacoa"
    }],[
    {
        estacion: "verano",
        comidaFav: "helado",
        color: ["amarillo", "verde agua"]
    },
    {
        estacion: "otoño",
        comidaFav: "polenta",
        color: ["azul", "naranja"]
    }
    ]];
    res.send(send);
})

   

app.listen(port, () => { // Inicio el servidor WEB (escuchar)
 console.log(`Listening on http://localhost:${port}`)
})