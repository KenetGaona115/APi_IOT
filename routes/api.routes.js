const express = require('express');
const router = express.Router();
const database = require('../database/databaseapi')

//all response 
//Retorna una llamada exitosa
const jsonAllFine = {
  'status': 200
}

//Error de base de datos
const jsonError = {
  'status': 500
}

router.get('/getAllData', async function (req, res, next) {
  const data = await database.getAllData()
  res.send(data);
})


//Post para regresar los datos del usuario
router.post('/sendData', async function (req, res, next) {
  user = await database.createData(req.body)
  res.send(user)
})

module.exports = router;