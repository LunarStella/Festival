const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Festival = require("../models/festivalModel");
const factory = require("./hadlerFactory");

exports.getAllFestival = factory.getAll(Festival);
exports.getFestival = factory.getOne(Festival);
exports.createOne = factory.createOne(Festival);
exports.updateOne = factory.updateOne(Festival);
exports.deleteOne = factory.deleteOne(Festival);
