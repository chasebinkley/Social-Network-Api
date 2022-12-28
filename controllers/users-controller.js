const User = require('../models/Users');

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getUsersById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new users
  createUsers(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // update users
  updateUsers({params, body}, res) {
    Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .then(dbUsersData => {
        if(!dbUsersData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err))
  },
  // delete users
  deleteUsers({params}, res) {
    Users.findOneAndDelete({_id: params.id})
    .then(dbUsersData => {
        if(!dbUsersData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => res.status(400).json(err));
  },
  // add friend
  addFriend({params}, res) {
    Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
    .populate({path: 'friends', select: ('-__v')})
    .select('-__v')
    .then(dbUsersData => {
        if (!dbUsersData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return;
        }
    res.json(dbUsersData);
    })
    .catch(err => res.json(err));
  },
  // delete friend
  deleteFriend({ params }, res) {
    Users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
    .then(dbUsersData => {
        if(!dbUsersData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => res.status(400).json(err));
  }
};
// Export module users controller
module.exports = usersController; 
