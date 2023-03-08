const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
const lessondb = JSON.parse(fs.readFileSync("./lessons.json", "utf-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

server.listen(3004, () => {
  console.log('JSON Server is running .')
  console.log('http://127.0.0.1:3004')
});


const SECRET_KEY = "72676376";

const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function isLoginAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

function isRegisterAuthenticated({ email }) {
  return userdb.users.findIndex((user) => user.email === email) !== -1;
}

// server.post("/api/auth/register", (req, res) => {
//   const { email, password } = req.body;
//   if (isRegisterAuthenticated({ email })) {
//     const status = 401;
//     const message = "Email already exist";
//     res.status(status).json({ status, message });
//     return;
//   }

//   fs.readFile("./users.json", (err, data) => {
//     if (err) {
//       const status = 401;
//       const message = err;
//       res.status(status).json({ status, message });
//       return;
//     }
//     data = JSON.parse(data.toString());

//     let last_item_id = data.users[data.users.length - 1].id;

//     data.users.push({ id: last_item_id + 1, email: email, password: password });
//     let writeData = fs.writeFile(
//       "./users.json",
//       JSON.stringify(data),
//       (err, result) => {
//         if (err) {
//           const status = 401;
//           const message = err;
//           res.status(status).json({ status, message });
//           return;
//         }
//       }
//     );
//   });
//   const access_token = createToken({ email, password });
//   res.status(200).json({ access_token });
// });





server.post("/api/auth/login", (req, res) => {
  setTimeout(()=>{
  
  const { email, password } = req.body;
  
  if (!isLoginAuthenticated({ email, password })) {
    const status = 401;
    const message = "Incorrect Email or Password";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
  },1000)
});

server.post("/api/auth/verify", (req, res) => {
  setTimeout(()=>{
    const { token, } = req.body;
    try{
      const data =   jwt.verify(token, SECRET_KEY,{complete:true});
      res.status(200).json({ auth: true });
    }catch(error){
      res.status(200).json({ auth: false });
    }
  },1000)
});


server.post("/api/auth/profile", (req, res) => {
  setTimeout(()=>{
  const { token, } = req.body;
  try{
    const data =   jwt.verify(token, SECRET_KEY,{complete:true});
    const user = userdb.users.find((user)=>{
      return data.payload.email === user.email;
    })   
    res.status(200).json({ user });
  }catch(error){ 
  }
},1000)
});



server.post("/api/auth/profile/update", (req, res) => {  
  setTimeout(()=>{
    res.status(200).json(req.body );
  },1000)
  
});



server.post("/api/lessons", (req, res) => {  
  setTimeout(()=>{
    const lessons = lessondb.lessons
    res.status(200).json(lessons);
  },1000)
  
});


server.post("/api/lesson/single", (req, res) => {  
  setTimeout(()=>{
    const lessons = lessondb.single
    res.status(200).json(lessons);
  },1000)
  
});


server.post("/api/lesson/arrang-hear", (req, res) => {  
  setTimeout(()=>{
    // const lessons = lessondb.arrang_hear
    const lessons = lessondb.arrang_a
    res.status(200).json(lessons);
  },1000)
  
});


server.post("/api/lesson/write-hear", (req, res) => {  
  setTimeout(()=>{
    const lessons = lessondb.arrang_hear
    res.status(200).json(lessons);
  },1000)
  
});



server.post("/api/lesson/arrange_a", (req, res) => {  
  setTimeout(()=>{
    const lessons = lessondb.arrang_a
    res.status(200).json(lessons);
  },1000)
  
});
