import axios from 'axios';

const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*"
}

const connection = axios.create({
    baseURL: 'http://localhost:8080',
    headers: headers
})

export default connection;