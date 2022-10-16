const router = require("express").Router();


router.use("/authenticate", require("./routes/auth.routes"));
router.use("/users", require("./routes/user.routes"));

module.exports = router;