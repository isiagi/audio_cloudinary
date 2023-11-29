const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

require("dotenv").config();

const app = express();

app.use(express.json());

app.post("/audio/upload", async (req, res) => {
  // Get the file name and extension with multer

  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".").pop();
      const filename = `${new Date().getTime()}.${fileExt}`;

      cb(null, filename);
    },
  });

  //Filter the file to validate if it meets the required audio extension
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "audio/mpeg" || file.mimetype === "audio/mp3") {
      cb(null, true);
    } else {
      cb({ message: "Unsupported file format" }, false);
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  }).single("audio");

  //   uload to cloudinary server

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).send({
        message: "Error uploading audio",
        error: err,
      });
    }

    //send file to cloudinary server

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const path = req.file;

    console.log("paath", path);

    const fName = req.file.originalname.split(".")[0];
    cloudinary.uploader.upload(
      path.path,
      {
        resource_type: "raw",
        public_id: `AudioUploads/${fName}`,
      },
      //send cloudinaryresponse or catch error

      (error, audio) => {
        if (error) {
          return res.status(400).send({
            message: "Error uploading audio",
            error: error,
          });
        }

        // fs.unlinkSync(path);
        res.send(audio);
      }
    );
  });
});

module.exports = app;
