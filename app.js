const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./api/users/user.router");
const cors = require("cors");
const multer = require("multer");
const userServices = require("./api/users/user.service");
const bcrypt = require("bcrypt");
const pool = require("./database");
// require("dotenv").config();

// Initialize the express
const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

// Use body parser middleware
app.use(bodyParser.json());

// Define this router inside
// If any user comes then it will pass to userRouter
app.use("/api/users", userRouter);

// // Convert the json object to the javascript
app.use(express.json());

// Multer to handle the image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/home/jimsss/Sem5/CTE306/SPIMS/Images/ProfilePictures"); // Specify the directory where the files will be stored
  },
  filename: function (req, file, cb) {
    if (!file) {
      return cb(new Error("File not received"));
    }

    // Use a unique filename, for example, the original filename with a timestamp
    const uniqueFileName = `${Date.now()}_${file.originalname}`;
    // cb(null, file.filename);
    cb(null, uniqueFileName);
    // cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// app.use(
//   "/MedicalImages",
//   express.static("/home/jimsss/Sem5/CTE306/SPIMS/Images/ProfilePictures")
// );

// Define the uploadMedical function
// const uploadMedical = (data, callBack) => {
//   pool.query(
//     `INSERT INTO Medical_Images(imagesMedical, imagesStd_id) VALUES (?, ?)`,
//     [data.imagesMedical, data.imagesStd_id],
//     (error, results, fields) => {
//       if (error) {
//         return callBack(error);
//       }
//       return callBack(null, results);
//     }
//   );
// };

// Define your route
app.post("/upload", upload.single("imagesMedical"), async (req, res) => {
  // app.post("/upload", upload.array("imagesMedical", 5), (req, res) => {

  console.log(req.files);

  const imageUrl = req.file.path;

  // Insert the file information into the MySQL database
  const data = {
    imagesMedical: imageUrl,
    imagesStd_id: req.body.imagesStd_id,
  };

  // Pass the pool object to the uploadMedical function
  userServices.uploadMedical(data, (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
    res.status(200).json({
      success: true,
      message: "File uploaded and data inserted successfully",
      imageUrl: imageUrl,
    });
  });
});

// Define a route for retrieving user details by ID
app.get("/users/:id", (req, res) => {
  // Extract the id from the URL
  const id = req.params.id;

  // Call the user services to get medical details by ID
  userServices.getMedicalById(id, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    if (!results) {
      console.log("User not found");
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Send the user profile details as JSON response
    return res.status(200).json(results);
  });
});

// Get request for medical photos by ID

// Update password
const updatePassword = (data, callBack) => {
  // Generate a salt to use for hashing
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (saltError, salt) => {
    if (saltError) {
      return callBack(saltError);
    }

    // Hash the new password using the generated salt
    bcrypt.hash(data.newPassword, salt, (hashError, hashedPassword) => {
      if (hashError) {
        return callBack(hashError);
      }

      // Execute an SQL query to update the hashed password in the 'Student' table
      pool.query(
        `UPDATE Student SET password=? WHERE student_id = ?`,
        [hashedPassword, data.student_id],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          console.log("Password updated successfully");
          return callBack(null, results);
        }
      );
    });
  });
};

const updatePasswordController = (req, res) => {
  const body = req.body;

  // Assuming you have validation logic for checking if newPassword is present in the request body
  if (!body.newPassword) {
    return res.status(400).json({
      message: "New password is required",
    });
  }

  updatePassword(body, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Error updating password",
      });
    }
    return res.status(200).json({
      message: "Password updated successfully",
      data: results,
    });
  });
};

app.patch("/updatePassword", updatePasswordController);

app.listen(8888, () => {
  console.log("Server up and running on PORT: ");
});
