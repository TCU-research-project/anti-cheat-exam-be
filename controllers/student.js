const { handleError, handleSuccess } = require("../utils/handleResponse");
const Student = require("../models/student");

exports.getStudentByID = (req, res, next, id) => {
  Student.findById(id, (err, student) => {
    if (err || !student) handleError(res, "Student not found!", 400);
    req.student = student;
    next();
  });
};

exports.submitExam = (req, res) => {
  const { examId, answers } = req.body;

  const student = new Student(req.student);

  student.submittedExams[examId] = answers;

  student.save((err, student) => {
    if (err) handleError(res, "Error submitting Exam!");

    res.json(student.submittedExams);
  });
};

exports.assignExam = async (req, res) => {
  const { examId, studentId } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(
      studentId, 
      { $push: { assignedExams: { examId, status: "pending" } } }
    );
    if (student) {
      return res.json("ok")
    } else {
       return res.json("nok")
    }
  } catch (e) {
    console.log(e)
    return res.json("error");
  }
}
