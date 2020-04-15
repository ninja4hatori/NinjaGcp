const express = require("express");
//const upload = require("./upload");
var multer = require('multer')
const cors = require("cors");

const server = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("here")
  cb(null, 'public')
},
filename: function (req, file, cb) {

  const extension = file.originalname.toString().substr(file.originalname.toString().lastIndexOf("."));
  cb(null, "transactionDetails"+extension);
}
})

var upload = multer({ storage: storage }).single('file')

server.post('/upload',function(req, res) {
     
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)

  })

});

server.post("/upload", upload);

server.listen(3001, () => {
  console.log("Server started!");
});
