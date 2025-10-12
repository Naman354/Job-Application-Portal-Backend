import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Step 1: Start Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Handle Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/auth/google/failure" }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Google login failed" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Get role from DB (default to applicant)
    const role = req.user.role || "applicant";

    // ✅ Define your frontend base URL correctly
    const redirectBase =
      process.env.FRONTEND_URL ||
      "http://localhost:5500"; // base directory, not /frontend

    // ✅ Redirect to frontend page (user.html) with token & role
    res.redirect(`${redirectBase}/user.html?token=${token}&role=${role}`);
  }
);

// Step 3: Handle logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: "Logged out successfully" });
  });
});

// Step 4: Handle failure
router.get("/google/failure", (req, res) => {
  res.status(401).json({ message: "Google login failed" });
});

export default router;
