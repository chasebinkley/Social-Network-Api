const router = require('express').Router();
const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  addFriend,
  deleteFriend,
} = require('../../controllers/users-controller');

// api for users
router.route('/').get(getAllUsers).post(createUsers);

// for users Id
router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers);

// friend id post, delete
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;