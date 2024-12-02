const { userModel } = require('../models');
const { giftModel } = require('../models');



function getLatestsGifts(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    giftModel.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate()
        .then(gifts => {
            res.status(200).json(gifts)
        })
        .catch(next);
};

function getAllGifts(req, res, next) {
    giftModel.find()
        .populate('userId')
        .then(gifts => res.json(gifts))
        .catch(next);
}

function getGiftbyId(req, res, next) {
    const { giftId } = req.params;

    giftModel.findById(giftId)
        .then(gift => res.json(gift))
        .catch(next);
}


function createGift(req, res, next) {
    const { _id: userId } = req.user;
    const { title, description, category, delivery, price, imageUrl } = req.body;

    giftModel.create({ title, description, category, delivery, price, imageUrl, userId }).then((gift) => {
        res.status(200).json(gift)
    }).catch(next)

}

function editGift(req, res, next) {
    const { giftId } = req.params;
    const { title, description, category, delivery, price, imageUrl } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the post, the post will not be updated
    giftModel.findOneAndUpdate({ _id: giftId, userId }, { title, description, category, delivery, price, imageUrl }, { new: true })
        .then(updatedPost => {
            if (updatedPost) {
                res.status(200).json(updatedPost);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deleteGift(req, res, next) {
    const { giftId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        giftModel.findOneAndDelete({ _id: giftId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { gifts: giftId } }),

    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function like(req, res, next) {
    const { giftId } = req.params;
    const { _id: userId } = req.user;

    console.log('like')

    giftModel.updateOne({ _id: giftId }, { $addToSet: { likesList: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next)
}

function buy(req, res, next) {
    const { giftId } = req.params;
    const { _id: userId } = req.user;

    console.log('buy')

    /*giftModel.updateOne({ _id: giftId }, { $addToSet: { buyingList: userId } }, { new: true })
        return res.status(200).json()*/

    const gift = giftModel.findById(giftId);
    gift.buyingList.push(userId)
    gift.save()
    return res.json(gift)

    /* giftModel.findOneAndUpdate({_id: giftId}, {$addToSet: {buyingList: userId}}).then((gift)=>res.status(200).json(gift)).catch(next)*/
}

module.exports = {
    getLatestsGifts,
    getAllGifts,
    createGift,
    deleteGift,
    like,
    getGiftbyId, editGift,
    buy
}
