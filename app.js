const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes");
const formatPrice = require("./helpers/formatPrice");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.locals.formatPriceToEjs = formatPrice;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
