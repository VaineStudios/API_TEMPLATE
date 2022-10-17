const router = require('express').Router();
const UserController = require('../controllers/user.controller');
const awsStorage = require("../../../utilities/s3.utility");
const Middleware = require('../middlewares/middleware');
router
    .route("/")
        .get(Middleware.isAuthenticated,UserController.getAllUsers)
        .post(awsStorage.uploadFileToS3.single("image"),UserController.createUserProfile)


router.route("/requestPasswordReset")
    .post(UserController.requestPasswordReset);

router.route("/resetPassword")
    .post(UserController.resetPassword);

router
    .route("/:id")
        .get(Middleware.isAuthenticated,Middleware.isUserOrSuperAdmin,UserController.getUserProfile)
        .patch(Middleware.isAuthenticated,Middleware.isUserOrSuperAdmin,awsStorage.uploadFileToS3.single("image"),UserController.updateUserProfile)
        .delete(Middleware.isAuthenticated,Middleware.isUserOrSuperAdmin,UserController.deleteUserProfile)
    
module.exports = router;