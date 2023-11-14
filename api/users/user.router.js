const {
  login,
  loginStaff,
  loginRole,

  createUser,
  getUserById,
  updateStudent,
  deleteStudent,
  getStudents,
  updateStudentPermanent,
  updateStudentMedical,
  createInternRecord,
  getInternById,
  // uploadMedical,
  getParticipationById,
  createParticipation,
  updateParticipation,
  updatePassword,

  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,

  createParent,
  deleteParent,
  getParent,
  updateParent,
} = require("./user.controller"); //Importing from the controller

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

// Route using the router, pass the request in the second parameter

// Checking the token before performing the tasks
// router.post("/", checkToken, createUser);

router.post("/login", login);
router.post("/loginRole", loginRole);
router.patch("/updatePassword", updatePassword);

// Router for Student
router.get("/student", getStudents);
router.get("/student/:id", getUserById);
router.get("/student/intern/:id", getInternById);
router.get("/student/participation/:id", getParticipationById);
// router.post("/student/upload/medical", uploadMedical);
router.post("/student", createUser);
router.post("/student/participation", createParticipation);
router.patch("/student", updateStudent);
router.patch("/student/permanent", updateStudentPermanent);
router.patch("/student/medical", updateStudentMedical);
router.patch("/student/participation/:recordId", updateParticipation);
router.post("/student/internship", createInternRecord);
router.delete("/student", deleteStudent);

// Router for staff
router.post("/staff", createStaff);
router.get("/staff", getStaff);
router.patch("/staff", updateStaff);
router.delete("/staff", deleteStaff);

// Router for parent
router.post("/parent", createParent);
router.get("/parent", getParent);
router.patch("/parent", updateParent);
router.delete("/parent", deleteParent);

module.exports = router;
