import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../model/structure.js";
// console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
// console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);

passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.GOOGLE_CLIENT_ID,
    //   "966183659663-8dcl6htm9pdog5nlvi21qo6l37eaqb5g.apps.googleusercontent.com",
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    //   "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",
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ google_id: profile.id });
        if (existingUser) return done(null, existingUser);

        const newUser = await User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          google_id: profile.id,
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
