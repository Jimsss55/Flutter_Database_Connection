// It will call the services from the controller
const pool = require("../../database.js");

module.exports = {
  // Creating a method called create
  // Which receives a data fromt the controller and one callback

  // Staff
  createStaff: (data, callBack) => {
    pool.query(
      `INSERT INTO Staff(staff_id, sname, scontact_num, sdepartment, username, password, role,email)
VALUES(?,?,?,?,?,?,?,?)`, //At runtime it will be replaced by the values,
      [
        //Values for each question marks
        data.staff_id,
        data.sname,
        data.scontact_num,
        data.sdepartment,
        data.susername,
        data.spassword,
        data.role,
        data.email,
      ],
      // Callback function
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getStaff: (callBack) => {
    pool.query(`SELECT * FROM Staff`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },

  getStaffByEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM Staff WHERE email=?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getStaffById: (id, callBack) => {
    pool.query(
      // `Select * from Student where student_id=?`,
      `SELECT * from Staff where staff_id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateStaff: (data, callBack) => {
    pool.query(
      `UPDATE Staff 
SET sname=?, scontact_num=?, sdepartment=?, password=?, role=?, email=?
WHERE staff_id = ?`,
      [
        data.sname,
        data.scontact_num,
        data.sdepartment,
        data.password,
        data.role,
        data.email,
        data.staff_id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  deleteStaff: (data, callBack) => {
    pool.query(
      `DELETE FROM Staff WHERE staff_id=?`,
      [staff_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  // Student

  createStudent: (data, callBack) => {
    pool.query(
      `INSERT INTO Student(student_id, name, dob, sex, cid, contact_num, email, scholarship_type, year, sem, department, password)
VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`, //At runtime it will be replaced by the values,
      [
        //Values for each question marks
        data.student_id,
        data.name,
        data.dob,
        data.sex,
        data.cid,
        data.contact_num,
        data.email,
        data.scholarship_type,
        data.student_id,
        data.name,
        data.dob,
        data.sex,
        data.cid,
        data.contact_num,
        data.email,
        data.scholarship_type,
        data.year,
        data.sem,
        data.department,
        data.password,
      ],
      // Callback function
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getUserByEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM Student WHERE email=?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getUserByEmailAndRole: (email, callBack) => {
    pool.query(
      `SELECT * FROM Student WHERE email=? `,
      [email],
      (error, studentResults, fields) => {
        if (error) {
          return callBack(error);
        }

        if (studentResults.length > 0) {
          return callBack(null, {
            email: studentResults[0].email,
            password: studentResults[0].password,
            role: studentResults[0].role,
          });
        }

        pool.query(
          `SELECT * FROM Staff WHERE email=? `,
          [email],
          (error, staffResults, fields) => {
            if (error) {
              return callBack(error);
            }

            if (staffResults.length > 0) {
              return callBack(null, {
                email: staffResults[0].email,
                password: staffResults[0].password,
                role: staffResults[0].role,
              });
            }

            return callBack(null, null); // No matching user found
          }
        );
      }
    );
  },

  getUserById: (id, callBack) => {
    pool.query(
      // `Select * from Student where student_id=?`,
      `SELECT 
      Student.student_id, 
      Student.name, 
      Student.dob, 
      Student.sex, 
      Student.cid, 
      Student.contact_num, 
      Student.email, 
      Student.scholarship_type, 
      Student.year, 
      Student.sem,
      Student.dzongkhag,
      Student.gewog,
      Student.village,
      Student.house_no,
      Student.thram_no,
      Student.country, 
      Student.image_url,
      Department.department_id, 
      Department.d_name,
      Parents_Guardian.name AS parent_name,
      Parents_Guardian.p_cid,
      Parents_Guardian.p_email,
      Parents_Guardian.relation,
      Parents_Guardian.pcontact_num,
      MedicalRecord.blood_group,
      MedicalRecord.age,
      MedicalRecord.diagnosis,
      MedicalRecord.description
    FROM 
      Student 
    JOIN 
      Department 
    ON 
      Student.department = Department.department_id
    JOIN
      Parents_Guardian
    ON
      Parents_Guardian.pstudent_num = Student.student_id
    LEFT JOIN
      MedicalRecord
    ON
      MedicalRecord.mStudent_id = Student.student_id
    WHERE
      Student.student_id = ?;`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //       // Student.present_add,
  // Student.permanent_add,
  // Student.house_no,
  // Student.thram_no,

  // SET name=?, dob=?, sex=?,cid=?, contact_num=?, scholarship_type=? year=?, department=?, password=?
  // SET name=?, dob=?, sex=?,cid=?, contact_num=?, scholarship_type=?, year=?, sem=?
  //password=?
  //
  updateStudent: (data, callBack) => {
    pool.query(
      `UPDATE Student

SET   name=?, sex=?,cid=?, contact_num=?, scholarship_type=?, year=?, sem=?
WHERE student_id = ?`,
      [
        data.name,
        // data.dob,
        data.sex,
        data.cid,
        data.contact_num,
        data.scholarship_type,
        data.year,
        data.sem,
        // data.password,
        data.student_id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log("Student data updated successfully");
        console.log("Updated student data:", results);
        return callBack(null, results[0]);
      }
    );
  },

  updateStudentPermanent: (data, callBack) => {
    pool.query(
      `UPDATE Student

SET   dzongkhag=?, gewog=?,village=?, thram_no=?, house_no=?, country=?
WHERE student_id = ?`,
      [
        data.dzongkhag,
        data.gewog,
        data.village,
        data.thram_no,
        data.house_no,
        data.country,
        data.student_id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log("Student data updated successfully");
        console.log("Updated student data:", results);
        return callBack(null, results[0]);
      }
    );
  },

  updateStudentMedical: (data, callBack) => {
    pool.query(
      `UPDATE Student

SET   blood_group=?, age=?,description=?, diagnosis=?
WHERE student_id = ?`,
      [
        data.blood_group,
        data.age,
        data.description,
        data.diagnosis,
        data.student_id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log("Student data updated successfully");
        console.log("Updated student data:", results);
        return callBack(null, results[0]);
      }
    );
  },

  getStudents: (callBack) => {
    pool.query(`SELECT * FROM Student`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },

  deleteStudent: (data, callBack) => {
    pool.query(
      `DELETE FROM Student WHERE student_id=?`,
      [student_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  // Parent
  createParent: (data, callBack) => {
    pool.query(
      `INSERT INTO Parents_Guardian( pcontact_num, name, p_cid, p_email,relation, pstudent_num
)
VALUES(?,?,?,?,?,?)`, //At runtime it will be replaced by the values,
      [
        //Values for each question marks
        data.pcontact_num,
        data.name,
        data.p_cid,
        data.p_email,
        data.relation,
        data.pstudent_num,
      ],
      // Callback function
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getParent: (callBack) => {
    pool.query(
      `SELECT * FROM Parents_Guardian`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateParent: (data, callBack) => {
    pool.query(
      `UPDATE Parents_Guardian
SET name=?,pcontact_num=?, p_cid=?, p_email=?, relation=?
WHERE pstudent_num = ?`,
      [
        data.name,
        data.pcontact_num,
        data.p_cid,
        data.p_email,
        data.relation,
        data.pstudent_num,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  deleteParent: (data, callBack) => {
    pool.query(
      `DELETE FROM Parents_Guardian WHERE pstudent_num=?`,
      [staff_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
