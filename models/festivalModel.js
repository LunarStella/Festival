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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Festival = mongoose.model("Festival", festivalSchema);

module.exports = Festival;
