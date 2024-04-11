const router=require('express').Router();
const groupController=require('../controllers/groupController');

router.post('/:groupId/invite',groupController.invite);
router.post('/',groupController.createGroup);
router.get('/invite',groupController.accepteInvite)


module.exports = router;