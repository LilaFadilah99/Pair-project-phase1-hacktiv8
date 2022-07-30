const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes");
const formatPrice = require("./helpers/formatPrice");
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);
app.use(express.static("views"));
app.use("/", router);
app.locals.formatPriceToEjs = formatPrice;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
