const {
    userModel,
    tokenBlacklistModel,
    giftModel
} = require('../models');

const utils = require('../utils');
const { authCookieName } = require('../app-config');


const bsonToJson = (data) => { return JSON.parse(JSON.stringify(data)) };
const removePassword = (data) => {
    const { password, __v, ...userData } = data;
    return userData
}

async function register(req, res, next) {
    const { tel, email, username, password, repeatPassword } = req.body;


    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ message: 'Email is already registered' });
        }

        // Create the user
        let createdUser = await userModel.create({ tel, email, username, password });

        // Remove sensitive data
        createdUser = bsonToJson(createdUser);
        createdUser = removePassword(createdUser);

        // Generate JWT token
        const token = utils.jwt.createToken({ id: createdUser._id });

        // Set the cookie based on environment
        const cookieOptions =
            process.env.NODE_ENV === 'production'
                ? { httpOnly: true, sameSite: 'none', secure: true }
                : { httpOnly: true };

        res.cookie(authCookieName, token, cookieOptions);

        // Send success response
        res.status(200).send(createdUser);
    } catch (error) {
        console.error('Error during registration:', error);
        next(error); // Pass the error to the global error handler
    }
}




function login(req, res, next) {
    const { email, password } = req.body;

    userModel
        .findOne({ email })
        .then((user) => {
            if (!user) {
                // If no user is found with the given email
                res.status(401).send({ message: 'Wrong email or password' });
                return Promise.reject('Authentication failed'); // Reject to stop further processing
            }
            return Promise.all([user, user.matchPassword(password)]);
        })
        .then(([user, isMatch]) => {
            if (!isMatch) {
                // If the password doesn't match
                res.status(401).send({ message: 'Wrong email or password' });
                return;
            }

            // Prepare the user object and token
            const sanitizedUser = removePassword(bsonToJson(user));
            const token = utils.jwt.createToken({ id: sanitizedUser._id });

            // Set the token as a cookie
            const cookieOptions =
                process.env.NODE_ENV === 'production'
                    ? { httpOnly: true, sameSite: 'none', secure: true }
                    : { httpOnly: true };

            res.cookie(authCookieName, token, cookieOptions);

            // Send successful response
            res.status(200).send(sanitizedUser);
        })
        .catch((err) => {
            // Catch any other errors and pass them to the error handler
            console.error('Error during login:', err);
            next(err);
        });
}

function logout(req, res) {
    const token = req.cookies[authCookieName];

    tokenBlacklistModel.create({ token })
        .then(() => {
            res.clearCookie(authCookieName)
                .status(204)
                .send({ message: 'Logged out!' });
        })
        .catch(err => res.send(err));
}

function getProfileInfo(req, res, next) {
    const { _id: userId } = req.user;

    userModel.findOne({ _id: userId }, { password: 0, __v: 0 })
        .populate('gifts') //finding by Id and returning without password and __v
        .populate('likedGifts')
        .populate('boughtGifts')
        .then(user => { res.status(200).json(user) })
        .catch(next);
}

function editProfileInfo(req, res, next) {
    const { _id: userId } = req.user;
    const { tel, username, email } = req.body;

    userModel.findOneAndUpdate({ _id: userId }, { tel, username, email }, { runValidators: true, new: true })
        .then(x => { res.status(200).json(x) })
        .catch(next);
}

function removeItemFromCard(req, res, next) {
    const { _id: userId } = req.user;
    const { giftId } = req.params;

    Promise.all([
        userModel.findByIdAndUpdate({ _id: userId }, { $pull: { boughtGifts: giftId } }),
        giftModel.findByIdAndUpdate(giftId, { $pull: { buyingList: userId } })
    ])
        .then((updated) => {
            res.status(200).json(updated)
        })
        .catch(next)
}

function removeItemFromWishlist(req, res, next) {
    const { _id: userId } = req.user;
    const { giftId } = req.params;

    Promise.all([
        userModel.findByIdAndUpdate({ _id: userId }, { $pull: { likedGifts: giftId } }),
        giftModel.findByIdAndUpdate(giftId, { $pull: { likesList: userId } })
    ])
        .then((updated) => {
            res.status(200).json(updated)
        })
        .catch(next)
}

function clearShopCard(req, res, next) {
    const { _id: userId } = req.user;


    userModel.findByIdAndUpdate({ _id: userId }, { $set: { boughtGifts: [] } }, { new: true })
        .then((updatedUser) => {
            res.status(200).json(updatedUser)
        }).catch(next)
}


module.exports = {
    login,
    register,
    logout,
    getProfileInfo,
    editProfileInfo,
    removeItemFromCard,
    clearShopCard,
    removeItemFromWishlist

}
