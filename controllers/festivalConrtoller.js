const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const Festival = require("../models/festivalModel");

exports.getAll = catchAsync(async (req, res, next) => {
  // festival 하나를 갖고 찾고 싶을 떄 filter 사용
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  //filter 사용
  const features = new APIFeatures(Festival.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // 검색 시 작동 자세하게 알려줌
  // const doc = await features.query.explain();
  const doc = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      doc,
    },
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  let query = Festival.findById(req.params.id);
  const doc = await query;

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.createOne = catchAsync(async (req, res, next) => {
  const doc = await Festival.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const doc = await Festival.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
