import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Pres from "../models/presModel.js";
import T from 'tesseract.js'
import OpenAI from "openai";
import fs from "fs";

const openAi = new OpenAI({
    apiKey: process.env.API_KEY,
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
        const better = fardin.filter((str) => str !== "");
        const mgx = `extract medicine names from this array ${better} in an array format`
        const faya = await openAi.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: mgx }],
        })
        if (!faya) {
            return next(new ErrorHandler("GPT Failed", 404))
        }
        let gaurav = [];
        gaurav= faya.choices[0].message.content
        const mgxy = `give information about the medicines from this array ${gaurav} and don't mention about this array or anything other than medicines`
        const maya = await openAi.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: mgxy }],
        });
        if (!maya) {
            return next(new ErrorHandler("GPT Failed", 404))
        }
        const presData = await Pres.create({
            name: gaurav,
            user: req.user.id,
            image: req.body.prompt,
            info: maya.choices[0].message.content
        })
        res.status(200).json({
            msg: maya.choices[0].message.content,
            presData,
            meds: gaurav
        })
    }); 
});

export const getHistory = catchAsyncErrors( async (req, res, next) => {
    const historyData = await Pres.find({ user: req.user.id });
    res.status(200).json({
        success: "true",
        historyData
    });
});

export const getParticular = catchAsyncErrors( async (req, res, next) => {
    const historyData = await Pres.findById(req.params.id);
    if (!historyData) {
        return next(new ErrorHandler("Failed to Find History", 404))
    }
    res.status(200).json({
        success: "true",
        historyData
    });
});

export const deleteHistory = catchAsyncErrors( async (req, res, next) => {
    const historyData = await Pres.findById(req.params.id);
    if (!historyData) {
        return next(new ErrorHandler("Failed to Delete", 500))
    }
    await Pres.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: "true",
        msg: "Deleted"
    });
});