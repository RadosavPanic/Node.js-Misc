const express = require("express");
const indexRouter = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const PDFDocument = require("pdfkit");

// Multer File Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images"), // store images in public/images folder
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split("/")[1]}`), // rename the images
});

// File Filter config
const fileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);

  if (ext !== ".png" && ext !== ".jpg") {
    return callback(new Error("Only png and jpg files are accepted."));
  } else {
    return callback(null, true);
  }
};

// Multer initialization
const upload = multer({ storage, fileFilter });

// Routes
indexRouter.get("/", (req, res) => {
  if (req.session.imagefiles === undefined) {
    res.sendFile(path.join(__dirname, "../public/html/index.html")); // if there are no imagefiles in session, return the normal HTML page
  } else {
    res.render("index", { images: req.session.imagefiles }); // otherwise, render imagefiles within index.jade file
  }
});

indexRouter.post("/upload", upload.array("images"), (req, res) => {
  const files = req.files;

  // extract the filenames
  const imgNames = files.map((file) => {
    const index = Object.keys(file).findIndex((e) => e === "filename");
    return Object.values(file)[index];
  });

  req.session.imagefiles = imgNames; // store filenames to the session

  res.redirect("/"); // redirect request back to the root URL route
});

indexRouter.post("/pdf", (req, res) => {
  const filenames = req.body;

  // Create a new pdf
  const doc = new PDFDocument({ size: "A4", autoFirstPage: false });
  const pdfName = `pdf-${Date.now()}.pdf`;

  // Store pdf in public/pdf folder
  doc.pipe(
    fs.createWriteStream(path.join(__dirname, `../public/pdf/${pdfName}`))
  );

  // Create pdf pages and add images
  for (const name of filenames) {
    doc.addPage();
    doc.image(path.join(__dirname, `../public/images/${name}`), 20, 20, {
      width: 555.28,
      align: "center",
      valign: "center",
    });
  }

  doc.end();

  res.send(`/pdf/${pdfName}`);
});

indexRouter.get("/new", async (req, res) => {
  const fileNames = req.session.imagefiles;

  try {
    // Delete files stored in session
    const deleteFiles = async (paths) => {
      const deleting = paths.map((file) =>
        fs.promises.unlink(path.join(__dirname, `../public/images/${file}`))
      );
      await Promise.all(deleting);
    };

    await deleteFiles(fileNames);

    // Remove the data from session
    req.session.imagefiles = undefined;

    // Redirect request back to the root URL route
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Failed to delete files");
  }
});

module.exports = indexRouter;
