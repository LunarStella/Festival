const express = require("express");
const globalErrorHandler = require("./controllers/errorController");
const festivalRouter = require("./routes/festivalRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reveiwRoutes");

// http 앱 생성
const app = express();

// json 파일 js 객체로 변한 및 입력 데이터 량 제어
app.use(express.json({ limit: "100kb" }));

app.use(express.static(`${__dirname}/public`));

// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// ROUTES
app.use("/api/v1/festivals", festivalRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler, festivalRouter);

module.exports = app;
