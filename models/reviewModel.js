const mongoose = require("mongoose");
const Festival = require("./festivalModel");

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

reviewSchema.statics.calcAverageRatings = async function(festivalId) {
  // 리뷰 모델에서 집계를 수행하여 특정 투어의 평균 평점을 계산
  const stats = await this.aggregate([
    {
      $match: { festival: festivalId }, // 특정 투어에 대한 리뷰들만 선택
    },
    {
      $group: {
        _id: "$festival", // 투어별 그룹화
        nRating: { $sum: 1 }, // 리뷰 개수 계산
        avgRating: { $avg: "$rating" }, // 리뷰 평점 평균 계산
      },
    },
  ]);

  // 집계 결과 출력
  console.log("stats: ", stats);

  // 특정 투어에 대한 리뷰 통계를 투어 모델에 업데이트
  await Festival.findByIdAndUpdate(festivalId, {
    ratingsQuantity: stats[0].nRating, // 리뷰 개수 업데이트
    ratingsAverage: stats[0].avgRating, // 평균 평점 업데이트
  });
};

reviewSchema.post("save", function() {
  // 아직 지금 모델이 만들어지지 않아 constructor 씀
  this.constructor.calcAverageRatings(this.festival);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
