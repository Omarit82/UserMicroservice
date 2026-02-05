import GoogleStrategy from 'passport-google-oauth20';
import { userModel } from '../model/user.model.js';
import passport from 'passport';


export const initializedPassport = () => {
    passport.use(new GoogleStrategy({
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`
    },
        async function (accessToken, refreshToken, profile, done) {
            try {
                let user = await userModel.findOne({ email: profile.emails[0].value });
                if (!user) {
                    user = await userModel.create({
                        email: profile.emails[0].value,
                        name: profile.name.givenName,
                        lastName: profile.name.familyName,
                        authProvider: "google",
                    })
                }
                done(null, user);
            } catch (error) {
                done(error)
            }
        }
    ))
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    })
}

export const ensureAuthenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).redirect('/auth/google');
}
