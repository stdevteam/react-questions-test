const {REQUEST_URL} = require("../constants");


export const request = (url, method, data) => {
    return fetch(`${REQUEST_URL}${url}`, {
        method: method,
        body: data,
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => response.json())
        .catch((err) => console.error(err))
}