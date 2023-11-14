// It will call the services from the controller
const pool = require("../../database.js");
const bcrypt = require("bcrypt");

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

  // // Define the uploadMedical function
  // uploadMedical: (data, callBack) => {
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
  // },

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
      Student.password,
      Department.department_id, 
      Department.d_name,
      Parents_Guardian.p_cid,
      Parents_Guardian.pname,
      Parents_Guardian.p_email,
      Parents_Guardian.relation,
      Parents_Guardian.pcontact_num,
      MedicalRecord.blood_group,
      MedicalRecord.age,
      MedicalRecord.diagnosis,
      MedicalRecord.description,
      InternshipRecord.Company_name,
      InternshipRecord.Start_date,
      InternshipRecord.End_date,
      InternshipRecord.iDescription
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
  LEFT JOIN
      InternshipRecord
  ON
      InternshipRecord.iStd_id = Student.student_id
  WHERE
      Student.student_id = ?;
  `,
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
      `UPDATE MedicalRecord

SET   blood_group=?, age=?,description=?, diagnosis=?
WHERE mStudent_id = ?`,
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

  createInternRecord: (data, callBack) => {
    pool.query(
      `INSERT INTO InternshipRecord(Company_name,Start_date,End_date,iDescription,iStd_id)
VALUES(?,?,?,?,?)`, //At runtime it will be replaced by the values,
      [
        //Values for each question marks
        data.Company_name,
        data.Start_date,
        data.End_date,
        data.iDescription,
        data.iStd_id,
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

  getInternById: (id, callBack) => {
    //console.log([id]);
    pool.query(
      `Select * from InternshipRecord where iStd_id=?;`,
      [id],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  uploadMedical: (data, callBack) => {
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
  },

  getMedicalById: (id, callBack) => {
    pool.query(
      `SELECT * FROM Medical_Images WHERE imagesStd_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getParticipationById: (id, callBack) => {
    pool.query(
      `SELECT * FROM Participation WHERE participation_Std_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  createParticipation: (data, callBack) => {
    pool.query(
      `INSERT INTO Participation( participation_name, year, rank_position, participation_Std_id, grade_year)
VALUES(?,?,?,?,?)`, //At runtime it will be replaced by the values,
      [
        //Values for each question marks
        data.participation_name,
        data.year,
        data.rank_position,
        data.participation_Std_id,
        data.grade_year,
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

  updateParticipation: (data, callBack) => {
    pool.query(
      `Update Participation SET  participation_name=?, year=?, rank_position=?, grade_year=?, participation_Std_id=?
      WHERE record_id = ?`,
      [
        data.participation_name,
        data.year,
        data.rank_position,
        data.grade_year,
        data.participation_Std_id,
        data.record_id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        console.log("Participation record data updated successfully");
        console.log("Updated participation record data:", results[0]);
        return callBack(null, results);
      }
    );
  },

  updatePassword: (data, callBack) => {
    // Generate a salt to use for hashing
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (saltError, salt) => {
      if (saltError) {
        return callBack(saltError);
      }

      // Hash the password using the generated salt
      bcrypt.hash(data.password, salt, (hashError, hashedPassword) => {
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
  },

  // Parent
  createParent: (data, callBack) => {
    pool.query(
      `INSERT INTO Parents_Guardian( pcontact_num, pname, p_cid, p_email,relation, pstudent_num
)
VALUES(?,?,?,?,?,?)`, //At runtime it will be replaced by the values,
      [
        //Values for each question marks
        data.pcontact_num,
        data.pname,
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
SET pname=?,pcontact_num=?, p_cid=?, p_email=?, relation=?
WHERE pstudent_num = ?`,
      [
        data.pname,
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
