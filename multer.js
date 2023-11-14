const express = require("express");
const multer = require("multer");
const app = express();


// Multer to handle the image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/home/jimsss/Sem5/CTE306/SPIMS/Images/ProfilePictures");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(
  "/MedicalImages",
  express.static("/home/jimsss/Sem5/CTE306/SPIMS/Images/ProfilePictures")
);

// Define the uploadMedical function
const uploadMedical = (pool, data, callBack) => {
  pool.query(
    `INSERT INTO Medical_Images(imagesMedical, imagesStd_id) VALUES (?, ?)`,
    [data.imagesMedical, data.imagesStd_id],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
};

// Define your route
app.post("/upload", upload.array("imagesMedical", 5), (req, res) => {
  // Assuming you have a form field named 'image'
  console.log(req.files);
  res.send("File uploaded!");

  // Insert the file information into the MySQL database
  const data = {
    imagesMedical: req.files.map((file) => file.filename),
    imagesStd_id: req.body.imagesStd_id,
  };

  // Pass the pool object to the uploadMedical function
  uploadMedical(req.app.get("pool"), data, (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
    res.status(200).json({
      success: true,
      message: "File uploaded and data inserted successfully",
    });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
