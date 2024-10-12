const { Router } = require("express");
const router = Router();

const {
  getUsers,
  putUsers,
  postUser,
  deleteUsers,
} = require("./../controllers/user");

router.get("/", getUsers);
router.put("/:id", putUsers);
router.post("/", postUser);
router.delete("/", deleteUsers);

module.exports = router;
