
const firebase = require("firebase/compat/app");
const { response } = require("express");
require("firebase/compat/firestore");

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
const collection = db.collection('Datos');

const COMPLETE = 200
const ERROR = 500

async function createData(data) {
  try {
    let doc = collection.doc(Date.now().toString());
    await doc.set(data);
    return COMPLETE;
  } catch (err) {
    console.error(err);
    return ERROR
  }

}

async function getAllData() {
  const snapshot = await collection.get();
  let array = [];
  snapshot.forEach(doc => {
    array.push(doc.data());
  });
  if (array.length != 0)
    return array
  else
    return null
}


module.exports = {
  createData: createData,
  getAllData: getAllData,
};