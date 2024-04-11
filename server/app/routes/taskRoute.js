const router=require('express').Router();
const taskContorller=require('../controllers/taskContorller')


router.post('/',taskContorller.addTask);
//router.get('/tasks',taskContorller.getAllTasks);
router.get('/:taskId',taskContorller.getTask);
router.put('/:taskId',taskContorller.updateTask);
router.delete('/:taskId',taskContorller.deleteTask);
router.post('/:taskId/comments',taskContorller.addComment);

module.exports = router;