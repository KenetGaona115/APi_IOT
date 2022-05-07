const admin = require('firebase-admin');
const firebase = require("firebase/app");
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");
require("firebase/firestore");

// Your web app's Firebase configuration
admin.initializeApp({ projectId: 'distribucionesgaona-50840' });

const firebaseConfig = {
    apiKey: "AIzaSyB3BqaQ0cUHG6OIyJzEcaiJJnRhQpzmGSg",
    authDomain: "iot-esp32-ca5f2.firebaseapp.com",
    projectId: "iot-esp32-ca5f2",
    storageBucket: "iot-esp32-ca5f2.appspot.com",
    messagingSenderId: "66640984883",
    appId: "1:66640984883:web:a1756ac87332c3101d5c46",
    measurementId: "G-2NCZK6VHVE"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const collectionPedidos = db.collection('PedidosNuevos');
const collectionPedidosCapturados = db.collection('PedidosCapturados');

const COMPLETE = 200
const ERROR = 500

async function createPedido(pedido) {

  try {
    let doc = collectionPedidos.doc(pedido.id);
    await doc.set({ pedido });
    return COMPLETE;
  } catch (err) {
    console.error(err);
    return ERROR
  }

}


async function deletePedido(id) {
  const snapshot = await collectionPedidos.doc(id).delete();
  return snapshot
}

async function updatePedido(pedido) {
  try {
    await collectionPedidos.doc(pedido.id).set({
      pedido
    })
    return true;
  } catch (error) {
    console.log(error)
    return false;
  }
}

async function getAllPedidosPendientes() {
  const snapshot = await collectionPedidos.where('pedido.estadoPedido', '==', '1').get();
  let array = [];
  snapshot.forEach(doc => {
    array.push(doc.data().pedido);
  });
  if (array.length != 0)
    return array
  else
    return null
}

async function getAllPedidosCapturados() {
  const snapshot = await collectionPedidos.where('pedido.estadoPedido', '==', '2').get();
  let array = [];
  snapshot.forEach(doc => {
    array.push(doc.data().pedido);
  });
  if (array.length != 0)
    return array
  else
    return null
}

async function getAllCustomerOrders(id) {
  const snapshot = await collectionPedidos.where('pedido.claveCliente', '==',id).get();
  let array = [];
  snapshot.forEach(doc => {
    array.push(doc.data().pedido);
  });
  if (array.length != 0)
    return array
  else
    return null
}

module.exports = {
  /* 
    Create 
  */
  createPedido: createPedido,
  /*
    Get
  */
  getAllPedidosPendientes: getAllPedidosPendientes,
  getAllPedidosCapturados: getAllPedidosCapturados,
  getAllCustomerOrders: getAllCustomerOrders,
  /*
    Update
  */
  updatePedido: updatePedido,
  /*
    Delete
  */
 deletePedido: deletePedido
};