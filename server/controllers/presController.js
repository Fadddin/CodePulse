import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Pres from "../models/presModel.js";

// import { spawn } from "child_process";
import fs from "fs";
// import tesseract from "node-tesseract-ocr";


export const getPres = catchAsyncErrors( async (req, res, next) => {
    const data = req.body.prompt;
    let base64Image = data.split(';base64,').pop();
    fs.writeFile('./images/image.png', base64Image, { encoding: 'base64' }, function (err) {
        console.log('File created');
    });

    // const config = {
    //     lang: "eng",
    //     oem: 1,
    //     psm: 3,
    // }

    tesseract
        .recognize("./image.jpg", config)
        .then((text) => {
            console.log("Result:", text)
        })
        .catch((error) => {
            console.log(error.message)
        })

    // res.send("done")
    // var dataToSend;
    // const python = spawn('python', ['text_extract.py']);
    // python.stdout.on('data', function (data) {
    //     // console.log(data.toString())
    //     dataToSend = data.toString();
    // });
    // python.on('close', () => {
    //     // res.status(200).json({
    //     //     msg: dataToSend
    //     // })
    //     res.send(dataToSend)
    // });

    // const ans = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: prompt }]
    // })

    res.send("hello")
    // console.log(ans)
});