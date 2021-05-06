const User = require("../models/user");

exports.addFollowing = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("successs");
    } else {
      res.status(404).send("No USER");
    }
  } catch (error) {
    next(error);
  }
};
