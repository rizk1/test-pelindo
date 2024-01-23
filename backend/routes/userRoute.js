const { Router } = require('express')
const router = Router();

//import controller
const usersController = require('../controller/UsersController');

router.get('/getDataUser/',  usersController.getDataUser)
router.get('/getDetailUser/:userid',  usersController.getDetailUser)
router.post('/setDataUser',  usersController.setDataUser)
router.delete('/delDataUser/:userid',  usersController.delDataUser)

module.exports = router;