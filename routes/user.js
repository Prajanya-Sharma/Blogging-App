const { Router } = require("express");
const User = require('../models/user');
const router = Router();

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        await User.create({ fullName, email, password });
        res.redirect('/');
    } catch (error) {
        console.error("Error during signup:", err);
        res.status(500).send("Error creating user.");
    }
});


router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
      const token = await User.matchPasswordAndGenerateToken(email, password);

      if (token.error) {
          return res.render('signin', { error: 'Invalid password' });
      }

      // Set the cookie with options
      res.cookie('token', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,  // 1 day expiration
          path: '/',  // Make sure the cookie is accessible across all routes
      });

      console.log("Token generated:", token);
      return res.redirect("/");  // Redirect after setting the cookie
  } catch (error) {
      return res.render("signin", {
          error: "Incorrect Email or Password"
      });
  }
});


module.exports = router;