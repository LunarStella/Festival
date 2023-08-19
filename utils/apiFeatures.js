class APIFeatures {
  //찾은 쿼리 객체와  url query들을 가져옴
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // 쿼리 객체를 반환한다
  filter() {
    const queryObj = { ...this.queryString };
    //뒤에서 함수로 구체적으로 다룸
    const excludedFields = ["sort", "fields", "page", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //  대소관계를 통해 filter 가능
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // 정렬
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      //<FIX REQUIRED> 나중에 지금 시간에서 가까운 기준으로 sort
      this.query = this.query.sort("-eventstartdate");
    }

    return this;
  }

  // doc의 field를 제한
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  // 검색 시 결과량 조절
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
