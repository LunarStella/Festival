const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

// 자주 쓰이는 함수를 규격화

// 모델의 모든 데이터를 가져옴
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // festival 하나를 갖고 찾고 싶을 떄 filter 사용
    //<FIX REQUIRED> 뭔가 섞임
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    // 특정 조건 찾음
    const features = new APIFeatures(Model.find(filter), req.query)
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

// 모델의 특정 요소 찾음
exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    const doc = await query;

    if (!doc) {
      return next(new AppError("ID값이 올바르지 않습니다.", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

// 모델 문서 새로 생성
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("ID가 올바르지 않습니다.", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

// 모델 문서 삭제
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("ID가 올바르지 않습니다.", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
