if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./routes");
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,            //access-control-allow-credentials:true
//   optionSuccessStatus: 200
// }

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`port berjalan dgn kekuatan ${PORT} tenaga kuda`)
);
