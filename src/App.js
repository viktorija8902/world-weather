require('dotenv').config();
import fetch from "isomorphic-fetch";


function dataGetter() {
    let promise = new Promise((resolve, reject) => {
        fetch("https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key="+process.env.API_KEY)
            .then(data => resolve(data.json()))
            .catch(error => reject(error))
    });
    promise.then(data => {
        console.log(data);
    });
    promise.catch(error => console.log(error));
}

dataGetter()
