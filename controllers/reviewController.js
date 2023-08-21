const Review = require("./../models/reviewModel");
const factory = require("./hadlerFactory");

// review에서 festival & user 설정
exports.setFestivalUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.festival) req.body.festival = req.params.festivalId;
  req.body.user = req.user.id;

  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
