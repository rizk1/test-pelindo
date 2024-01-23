const { Router } = require('express')
const router = Router();

//import controller
const usersController = require('../controller/UsersController');

router.get('/getDataUser/:userid',  usersController.getDataUser)
router.post('/setDataUser',  usersController.setDataUser)
router.delete('/delDataUser/:userid',  usersController.delDataUser)

module.exports = router;