import express from "express";
import qr from "qr-image";
import fs from "fs";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
