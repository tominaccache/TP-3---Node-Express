/* Módulo OMDBWrapper*/
import axios from "axios";
const APIKEY = "ef1edd31";

const OMDBSearchByPage = async (searchText, page = 1) => {
    let returnObject = {
        respuesta : false,
        cantidadTotal : 0,
        datos : {}
    };

    const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`;
    try {
        const response = await axios.get(requestString);
        if (response.data.Response === "True") {
            returnObject.respuesta = true;
            returnObject.cantidadTotal = parseInt(response.data.totalResults);
            returnObject.datos = response.data.Search;
            return returnObject;
        }
    } catch (error) {
        console.error(error);
    }
};

const OMDBSearchComplete = async (searchText) => {
let returnObject = {
    respuesta : false,
    cantidadTotal : 0,
    datos : {}
    };
        
    const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`;
    try {
        const response = await axios.get(requestString);
        if (response.data.Response === "True") {
            returnObject.respuesta = true;
            returnObject.cantidadTotal = parseInt(response.data.totalResults);
            returnObject.datos = response.data.Search;
            return returnObject;
        }
    } catch (error) {
        console.error(error);
    }
};

const OMDBGetByImdbID = async (imdbID) => {
let returnObject = {
        respuesta : false,
        cantidadTotal : 0,
        datos : {}
    };
    
    const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`;
    try {
        const response = await axios.get(requestString);
        if (response.data.Response === "True") {
            returnObject.respuesta = true;
            returnObject.cantidadTotal = 1;
            returnObject.datos = response.data.Search;
            return returnObject;
        }
    } catch (error) {
        console.error(error);
    }
};

// Exporto todo lo que yo quiero exponer del módulo:
export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID};