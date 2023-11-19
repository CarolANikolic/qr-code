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
// Define confirmation page path
const confirmationPage = path.join(projectRoot, "client/public/confirmation.html");

const generateQRCode = (req, res, next) => {

    let qr_png = qr.image(URLInput);
    let outputQR = path.join(projectRoot, "client/public/images/outputQR", "qr-img.png");
    console.log(outputQR)
    qr_png.pipe(fs.createWriteStream(outputQR));
    
    fs.writeFile("URL.txt", URLInput, (err) => {
        if (err) throw err;
    });
    next();
};

app.get("/", (req, res) => {
    res.sendFile(homePage);
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/submit", (req, res, next) => {
    URLInput = req.body.URL;
    next();
});

app.use(generateQRCode);

app.post("/submit", (req, res) => {
    res.sendFile(confirmationPage);
});

// Set-up localholst
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
