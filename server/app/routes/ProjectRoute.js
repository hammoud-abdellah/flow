const router=require('express').Router();
const projectController=require('../controllers/projectController')


router.post('/:userId',projectController.createProject);
router.get('/:userId',projectController.getProject);
router.get('/:projectId/tasks',projectController.getTaskParProject);
router.delete('/:projectId',projectController.deleteProject)

module.exports = router;