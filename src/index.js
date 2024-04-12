import express from "express"; // hacer npm i express 
import cors from "cors";

const app = express();
const port = 3000;

// Agrego los Middlewares
app.use(cors()); // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON



app.get("/ejercicio1", (req, res) => {
    res.status(200).send('¡Ya estoy respondiendo!');
  });

app.get('/ejercicio2/:nombre', (req, res) => {
    res.status(200).send(`Hola ${req.params.nombre}.`);
});

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