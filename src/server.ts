import express from "express";
import bodyParser from "body-parser";

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());

app.listen(port, function () {
  console.log(`starting app on: http://localhost:${port}`);
});

export default app;
