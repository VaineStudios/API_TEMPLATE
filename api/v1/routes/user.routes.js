const router = require('express').Router();
const UserController = require('../controllers/user.controller');

router
    .route("/")
        .get(UserController.getAllUsers)
        .post(UserController.createUserProfile)


router.route("/requestPasswordReset")
    .post(UserController.requestPasswordReset);

router.route("/resetPassword")
    .post(UserController.resetPassword);

router
    .route("/:id")
        .get(UserController.getUserProfile)
        .patch(UserController.updateUserProfile)
        .delete(UserController.deleteUserProfile)
    
module.exports = router;