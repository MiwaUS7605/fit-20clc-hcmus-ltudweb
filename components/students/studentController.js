const studentService = require('./studentService');

exports.list = (req, res) => {
  const students = studentService.getAll();
  res.render('students/list', students);
};

exports.details = (req, res) => {
  const studentId = req.params.studentId;
  // validate
  // ...

  const student = studentService.getByStudentId(studentId);
  res.render('students/details', student);
}