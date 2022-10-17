const router = require('express').Router();
const UserController = require('../controllers/user.controller');
const awsStorage = require("../../../utilities/s3.utility");
router
    .route("/")
        .get(UserController.getAllUsers)
        .post(awsStorage.uploadFileToS3.single("image"),UserController.createUserProfile)


router.route("/requestPasswordReset")
    .post(UserController.requestPasswordReset);

router.route("/resetPassword")
    .post(UserController.resetPassword);

router
    .route("/:id")
        .get(UserController.getUserProfile)
        .patch(awsStorage.uploadFileToS3.single("image"),UserController.updateUserProfile)
        .delete(UserController.deleteUserProfile)
    
module.exports = router;