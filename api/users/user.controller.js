// Contains the logic for processing HTTP requests related to user creation.
//
const {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  getStaffByEmail,
  getUserByEmailAndRole,

  getStudents,
  getUserById,
  getUserByEmail,
  createStudent,
  updateStudent,
  deleteStudent,
  updateStudentPermanent,
  updateStudentMedical,

  createParent,
  deleteParent,
  getParent,
  updateParent,

  // getparent,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

// Creating a module
module.exports = {
  // Staff
  createStaff: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10); //generating the salt
    try {
      body.password = hashSync(body.password, salt); //Hash the password
    } catch (error) {
      console.error("Error hashing password:", error);
      return res.status(500).json({
        message: "Error hashing password",
      });
    }
    console.log("Received request to create user with body:", body);

    // calling a create service here with two parameter
    // It has a callback
    createStaff(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Database Connection error",
        });
      }
      console.log("Staff created successfully. Results:", results);
      return res.status(200).json({
        data: results,
      });
    });
  },

  getStaff: (req, res) => {
    getStaff((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        data: results,
      });
    });
  },

  updateStaff: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateStaff(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        message: "Staff data Updated Successful",
      });
    });
  },

  deleteStaff: (req, res) => {
    const data = req.body;
    deleteStaff(data, (err, results, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(404).json({
          message: "Record not found",
        });
      }
      return res.status(200).json({
        message: "Staff deleted successfully",
      });
    });
  },

  loginStaff: (req, res) => {
    const body = req.body;

    getStaffByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        console.log("Invalid email or password");
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined; //Since we dont want to sign the password to the json web token
        // Generate the web token using the sign method it takes three parameter
        // The object(results) which we want to sign and create the web token
        // Second parameter will take the key, The key used to encrypt and generating the web token
        // Third will be the optional parameter
        const jsontoken = sign({ result: results }, "qwe123", {
          expiresIn: "1h",
        });
        console.log("Generated token:", jsontoken);

        return res.status(200).json({
          message: "Login successful",
          token: jsontoken,
          userId: results.id,
        });
      } else {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
    });
  },

  // getStaffById: (req, res) => {
  //   // Extract the id from the url
  //   const id = req.params.id;
  //   getStaffById(id, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({
  //         message: "Internal Server Error",
  //       });
  //     }
  //     if (!results) {
  //       console.log("Staff not found");
  //       return res.status(404).json({
  //         message: "Staff not found",
  //       });
  //     }

  //     // Send the user profile details as JSON response
  //     return res.status(200).json({
  //       staff_id: results.staff_id,
  //       sname: results.sname,
  //       scontact_num: results.scontact_num,
  //       email: results.email,
  //     });
  //   });
  // },

  // Student
  getUserById: (req, res) => {
    // Extract the id from the url
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }
      if (!results) {
        console.log("Student not found");
        return res.status(404).json({
          message: "Student not found",
        });
      }

      // Send the user profile details as JSON response
      return res.status(200).json({
        student_id: results.student_id,
        name: results.name,
        dob: results.dob,
        sex: results.sex,
        cid: results.cid,
        contact_num: results.contact_num,
        email: results.email,
        scholarship_type: results.scholarship_type,
        year: results.year,
        sem: results.sem,
        department: results.d_name,
        parent_name: results.parent_name,
        p_cid: results.p_cid,
        p_email: results.p_email,
        relation: results.relation,
        pcontact_num: results.pcontact_num,
        dzongkhag: results.dzongkhag,
        gewog: results.gewog,
        village: results.village,
        house_no: results.house_no,
        thram_no: results.thram_no,
        country: results.country,
        image_url: results.image_url,
        blood_group: results.blood_group,
        age: results.age,
        diagnosis: results.diagnosis,
        description: results.description,
      });
    });
  },

  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10); //generating the salt
    try {
      body.password = hashSync(body.password, salt); //Hash the password
    } catch (error) {
      console.error("Error hashing password:", error);
      return res.status(500).json({
        message: "Error hashing password",
      });
    }
    console.log("Received request to create user with body:", body);

    // calling a create service here with two parameter
    // It has a callback
    createStudent(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Database Connection error",
        });
      }
      console.log("Student created successfully. Results:", results);
      return res.status(200).json({
        data: results,
      });
    });
  },

  getStudents: (req, res) => {
    getStudents((err, results) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json({
        data: results,
      });
    });
  },

  updateStudent: (req, res) => {
    const body = req.body;
    // const salt = genSaltSync(10);
    // body.password = hashSync(body.password, salt);
    updateStudent(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        message: "Student data Updated Successful",
        data: results,
      });
    });
  },

  updateStudentPermanent: (req, res) => {
    const body = req.body;
    updateStudentPermanent(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        message: "Student data Updated Successful",
        data: results,
      });
    });
  },

  updateStudentMedical: (req, res) => {
    const body = req.body;
    updateStudentMedical(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        message: "Student Medical Updated Successful",
        data: results,
      });
    });
  },

  deleteStudent: (req, res) => {
    const data = req.body;
    deleteStudent(data, (err, results, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(404).json({
          message: "Record not found",
        });
      }
      return res.status(200).json({
        message: "Student deleted successfully",
      });
    });
  },

  // Parent
  createParent: (req, res) => {
    const body = req.body;
    createParent(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Database Connection error",
        });
      }
      console.log("Parent created successfully. Results:", results);
      return res.status(200).json({
        data: results,
      });
    });
  },

  getParent: (req, res) => {
    getParent((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        data: results,
      });
    });
  },

  updateParent: (req, res) => {
    const body = req.body;
    updateParent(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.status(200).json({
        message: "Parent data Updated Successful",
      });
    });
  },

  deleteParent: (req, res) => {
    const data = req.body;
    deleteStaff(data, (err, results, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(404).json({
          message: "Record not found",
        });
      }
      return res.status(200).json({
        message: "Parent deleted successfully",
      });
    });
  },

  loginRole: (req, res) => {
    const body = req.body;

    getUserByEmailAndRole(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        console.log("Invalid email or password");
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
      console.log(results.password);

      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined; //Since we dont want to send the password in the response
        const jsontoken = sign({ result: results }, "qwe123", {
          expiresIn: "1h",
        });
        console.log("Generated token:", jsontoken);

        return res.status(200).json({
          message: "Login successful",
          token: jsontoken,
          role: results.role,
        });
      } else {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
    });
  },

  login: (req, res) => {
    const body = req.body;

    getUserByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        console.log("Invalid email or password");
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined; //Since we dont want to sign the password to the json web token
        // Generate the web token using the sign method it takes three parameter
        // The object(results) which we want to sign and create the web token
        // Second parameter will take the key, The key used to encrypt and generating the web token
        // Third will be the optional parameter
        const jsontoken = sign({ result: results }, "qwe123", {
          expiresIn: "1h",
        });
        console.log("Generated token:", jsontoken);

        return res.status(200).json({
          message: "Login successful",
          token: jsontoken,
          userId: results.id,
        });
      } else {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
    });
  },
};
