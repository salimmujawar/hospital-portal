require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";


let app = express();

//config view Engine
configViewEngine(app);

//Body parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//init all web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

