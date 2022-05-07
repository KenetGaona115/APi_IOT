const express = require('express');
const router = express.Router();
const database = require('../Database/databaseAPI')

//all response 
//Retorna una llamada exitosa
const jsonAllFine = {
  'status': 200
}

//Error de base de datos
const jsonError = {
  'status': 500
}

router.get('/getAllProducts', async function (req, res, next) {
  const products = await database.getAllProducts()
  res.send(products);
})


//Post para regresar los datos del usuario
router.post('/getUser', async function (req, res, next) {
  user = await database.getUserByEmail(req.body.email)
  res.send(user)
})

module.exports = router;