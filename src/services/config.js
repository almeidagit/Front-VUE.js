import axios from 'axios'


export const http = axios.create({

    baseURL: 'https://cafe-da-manha-java.herokuapp.com/cafe/',


});