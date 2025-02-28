const express = require("express"), //애플리케이션에 express 모듈 추가
    app = express(), //app에 express 웹 서버 애플리케이션 할당
    router = express.Router(),
    layouts = require("express-ejs-layouts"), //모듈 설치
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    methodOverride = require("method-override");

app.set("port", process.env.PORT || 80); //포트 80으로 연결 셋팅
app.set("view engine", "ejs"); //뷰 엔진을 ejs로 설정

router.use(
    methodOverride("_method", {
      methods: ["POST", "GET"]
    })
  );

router.use(layouts);
router.use(express.static("public"));

router.use(
  express.urlencoded({
    extended: false
  })
);
router.use(express.json());

router.get("/", homeController.index);

router.use(errorController.logErrors);
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
}); //최종적으로 제대로 작동하는지 확인 