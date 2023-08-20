const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: [true, "리뷰를 적지 않았습니다."],
    },

    createAt: {
      type: Date,
      default: Date.now,
    },
    festival: {
      type: mongoose.Schema.ObjectId,
      ref: "Festival",
      required: [true, "리뷰는 축제에 속해 있어야 합니다."],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "리뷰는 유저에 속해 있어야 합니다."],
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: "user",
    select: "nickname",
  });
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
