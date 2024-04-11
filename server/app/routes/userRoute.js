const router=require('express').Router();
const userController=require('../controllers/userController')

//router.post('/',userController.saveUser);
//router.post('/login',userController.login)
//router.get('/users',userController.getAllUsers);
router.get('/:userId',userController.getUser);
router.get('/:userId/tasks',userController.getTasksForUser)
router.put('/:userId',userController.updateUser);
router.delete('/:userId',userController.deleteUser);
router.post('/logout',userController.logout)

module.exports = router;