import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../model/structure.js";

passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.NODE_ENV === "production"
  ? "https://job-application-portal-backend-07uw.onrender.com/auth/google/callback"
  : "http://localhost:5500/auth/google/callback",

    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ google_id: profile.id });
        if (existingUser) return done(null, existingUser);

        const newUser = await User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          google_id: profile.id,
          role:"applicant",
        });
        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user.id)
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
