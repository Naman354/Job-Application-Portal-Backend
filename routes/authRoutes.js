import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/auth/google/failure" }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Google login failed" });
    }

    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const role = req.user.role || "applicant";

    const redirectBase =
      process.env.FRONTEND_URL ||
      "http://localhost:5500"; 

    res.redirect(`${redirectBase}/user.html?token=${token}&role=${role}`);
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: "Logged out successfully" });
  });
});

router.get("/google/failure", (req, res) => {
  res.status(401).json({ message: "Google login failed" });
});

export default router;
