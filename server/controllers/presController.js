import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Pres from "../models/presModel.js";
import T from 'tesseract.js'
import OpenAI from "openai";
import fs from "fs";

const openAi = new OpenAI({
    apiKey: "my key",
});

export const getPres = catchAsyncErrors(async (req, res, next) => {
    const data = req.body.prompt;
    let base64Image = data.split(';base64,').pop();
    fs.writeFile('./images/image.png', base64Image, { encoding: 'base64' }, async function (err) {
        if (err) {
            return next(new ErrorHandler("Process Failed", 404))
        }
        let fardin  = []
        const far = await T.recognize('./images/image.png', 'eng')
        fardin = far.data.text.split("\n")
        fardin.pop()
        const mgx = `extract medicine names from this array ${fardin} and give information about them but don't mention this array in your response` 
        const faya = await openAi.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: mgx }],
        })
        res.status(200).json({
            msg: faya.choices[0].message.content,
            meds: fardin
        })
    });
    
});