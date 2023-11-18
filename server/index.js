import express from "express";
import qr from "qr-image";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";

// Set-up Express framework
const app = express();
// Define Port
const port = 3000;

// Get current file path
const __filename = fileURLToPath(import.meta.url);
// Go up two levels to the project root
const projectRoot = path.resolve(__filename, "../..");

let URLInput;

// Serve client side static files
app.use(express.static(path.join(projectRoot, 'client/public')));

// Define HomePage path
const homePage = path.join(projectRoot, "client/public/index.html");

app.get("/", (req, res) => {
    res.sendFile(homePage);
});

// Set-up localholst
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
