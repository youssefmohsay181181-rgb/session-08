const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");
const Student = require("./models/Student");
mongoose.connect("mongodb://127.0.0.1:27017/university")
const connection = mongoose.connection;
connection.on('connected', () => console.log('connected'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const courses =[
  { 
  'course_name':'Networks Lab',
  'course_code': 'NETW708'
},
{
  'course_name':'Analysis and design of algorithms',
  'course_code': 'CSEN707'
},
{
  'course_name':'Performance',
  'course_code': 'NETW705'
}
]

const myMiddleware1 = (req, res, next) => {
    console.log('Middleware of adding student is executed');

    next();
};
app.use('/addstudent',myMiddleware1);
app.use((req, res, next) => {
    console.log('Middleware for all requests executed');
    next();
});
app.get('/addstudent',  async (req, res) => {
  const student = new Student({ age: 21, department: '1' });
  await student.save();
  res.send('Hello world!');
});

// get all students (without passwords)
app.get('/api/students', async (req, res) => {
  const students = await Student.find().select('-password');
  res.json(students);
});

// student signup: create and save a new student
app.post('/api/students', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const student = new Student({ name, email, password });
    await student.save();
    res.status(201).json({ _id: student._id, name: student.name, email: student.email });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(e => e.message).join(', ');
      return res.status(400).json({ message });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/', (req, res) => {
  res.send(message);
  //middleware();
});


app.get('/templatepage1', (req, res) => {
  res.render('main.ejs', {pagenumber: 'first'});
});

app.get('/templatepage2', (req, res) => {
  res.render('main.ejs', {pagenumber: 'second'});
});

app.get('/querypage', (req, res) => {
  const { q } = req.query;
  res.send(`<h1>Hello world!</h1>
    <p>this your query: ${q}</p> 
    ` + q);
});

app.get('/nextpage/:message', (req, res) => {
  const { message } = req.params;
  res.send(message + 'matched');
});


app.get('/api/courses', (req, res) => {
  res.render('courses.ejs',{courses: courses});
});

app.get('/api/courses/new', (req, res) => {
  res.render('new_course.ejs',{courses: courses});
});
app.post('/api/courses', (req, res) => {
  const {course_name, course_code} = req.body;
  courses.push({course_name, course_code});
  res.redirect('/api/courses');
});
app.get('/api/courses/delete/:id', (req, res) => {
  const { id } = req.params;
  courses.splice(courses.findIndex(c => c.course_code === id), 1);
  res.redirect('/api/courses');
});
app.delete('/api/courses/delete/:id', (req, res) => {
  const { id } = req.params;
  courses.splice(courses.findIndex(c => c.course_code === id), 1);
  res.redirect('/api/courses');
});

app.get('/api/courses/:id', (req, res) => {

  const { id } = req.params;
  const course = courses.find(c => c.course_code === id);
  res.render('course.ejs',{course_name: course.course_name, course_code: course.course_code});
});


/*app.get('/*splat', (req, res) => {
  res.send('Hello world!, default route');
});

app.use((req, res, next) => {
    res.status(404).send('Sorry, we cannot find that!');  
    console.log('not found Middleware executed');
    next();
});

app.use((req,res) => {
  console.log('We have a new request');
}); 
*/
app.use((err,req, res, next) => {
  console.log(err.name);
  if (err.name === 'ReferenceError') {
    res.send('Sorry, we will work on that!');  
    } 
  else 
   if (err.name === 'ValidationError')
   res.status(404).send('please enter name for the student'); 
  next(err); 
});
/*
app.use((req, res, next) => {
    console.log('third middleware');
    //res.status(404).send('Sorry, we cannot find that!');  
    next();
});
app.use((err, req, res, next) => {
    console.log('error middleware');
    //res.status(404).send('Sorry, we cannot find that!');  
    next();
});*/





