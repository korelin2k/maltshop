import * as express from "express";
import * as exphbs from "express-handlebars";
import * as handlebars from "handlebars";
import db from "./models";
import router from "./routes/api-routes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

handlebars.registerHelper("ifEquals", function(a, options) {
    if (a.substring(0, 4) === "http") {
      return options.fn(this);
    }

    return options.inverse(this);
  });

app.use(router);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
});
