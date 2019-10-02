/* CONFIGURAÇÕES DO APLICATIVO */

// Consigurações da conexão com o Google Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCqpWi7y5mZrLF51riDU6IPGwEZsgzl5uQ",
    authDomain: "shininghouse-8d3d5.firebaseapp.com",
    databaseURL: "https://shininghouse-8d3d5.firebaseio.com",
    projectId: "shininghouse-8d3d5",
    storageBucket: "shininghouse-8d3d5.appspot.com",
    messagingSenderId: "735467682715",
    appId: "1:735467682715:web:0e4fd7e3299b27790dbf3e"
}

// Nome da 'key' que armasena as configurações locais
var localStorageKeyName = 'config';

// Configuração inicial do App
var initialConfig = {
    tema : 'light' // Tema inicial (light | dark)
}