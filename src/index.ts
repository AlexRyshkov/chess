import express from 'express';
import router from "src/routes";
const app = express();
const port = 3002;


app.use(router)

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});