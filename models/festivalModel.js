const mongoose = require("mongoose");
const slugify = require("slugify");
// const validator = require('validator');

const festivalSchema = new mongoose.Schema(
  {
    addr1: String,
    addr2: String,
    // booktour: String,
    // cat1: String,
    // cat2: String,
    // cat3: String,
    contentid: String,
    contenttypeid: String,
    // createdtime: String,
    eventstartdate: Date,
    eventenddate: Date,
    firstimage: String,
    firstimage2: String,
    cpyrhtDivCd: String,
    mapx: String,
    mapy: String,
    mlevel: String,
    // modifiedtime: String,
    areacode: String,
    sigungucode: String,
    tel: String,
    title: String,
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "평점은 1점 이상이어야 합니다."],
      max: [5, "평점은 5점 이하이어햐 합니다."],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Festival = mongoose.model("Festival", festivalSchema);

module.exports = Festival;
