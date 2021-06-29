const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/usersDB');

router.get('/users', getAllUsers);

router.get('/users/:userId', getUserById);

// router.post('/users', createUser);

router.patch('/users/me', updateUser);

router.get('/users/me', getCurrentUser);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
