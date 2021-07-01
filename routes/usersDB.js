const router = require('express').Router();
const { auth } = require('../middlewares/auth');

const {
  getAllUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/usersDB');

router.get('/users', getAllUsers);

router.get('/users/me', auth, getCurrentUser);

router.get('/users/:userId', getUserById);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
