module.exports = (req, res, next) => {
    if (!req.session.userId) {
      const error = "please login first!";
      res.redirect(`/login?error=${error}`);
    } else {
      next();
    }
  }