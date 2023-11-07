import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import path from "path";

inquirer
.prompt([{
    message: "Enter your URL: ",
    name: "URL" 
}])
.then((answers) => {
    const url = answers.URL;
    let qr_png = qr.image(url);

    let outputQR = path.join("public/images/outputQR", "qr-img.png")

    qr_png.pipe(fs.createWriteStream(outputQR));
    
    fs.writeFile("URL.txt", url, (err) => {
        if (err) throw err;
    })
})
.catch((error) => {
    if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment.")
    } else {
        console.log("Something went wrong.")
    }
});

