import express from "express"; // hacer npm i express

const app = express();
const port = 3000;

app.get('/', (req, res) => { // EndPoint "/"
 res.send('Hello World!');
})
 
app.listen(port, () => { // Inicio el servidor WEB (escuchar)
 console.log(`Listening on http://localhost:${port}`)
})