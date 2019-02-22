const express = require("express");
const bp = require("body-parser");
const app = express();
const PORT = 8080;
const path = require("path");
const bW = { buzzwords: [] };
let total = 0;

app.use(bp.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app
  .route("/buzzwords")
  .get((req, res) => {
    res.json(bW);
  })
  .post((req, res) => {
    console.log(req.body);
    let arr = bW.buzzwords.filter(x => x.buzzWord === req.body.buzzWord);
    if (bW.buzzwords.length < 5 && arr.length === 0) {
      bW.buzzwords.push(req.body);
      console.log(bW);
      res.json("success : true");
    } else {
      res.json("succss: false");
    }
  })
  .put((req, res) => {
    const bWlen = bW.buzzwords.length;
    let arr = bW.buzzwords.filter(x => {
      x.buzzWord !== req.body.buzzWord;
    });
    if (bWlen > arr.length) {
      bW.buzzwords = arr;
      bW.buzzwords.push(req.body);
      res.json("success :  true");
      console.log(bW);
    } else {
      res.json("success : false");
    }
  })
  .delete((req, res) => {
    const bWlen = bW.buzzwords.length;
    let arr = bW.buzzwords.filter(x => x.buzzWord !== req.body.buzzWord);
    console.log("arr after", arr);
    console.log(arr.length);
    if (bWlen > arr.length) {
      bW.buzzwords = arr;
      res.json("success: true");
      bW.buzzwords = arr;
      console.log(bW);
    } else {
      res.json("success:false");
    }
  });
app.post("/reset", (req, res) => {
  bW.buzzwords = [];
  total = 0;
  res.json("success:true");
});
app.post("/heard", (req, res) => {
  console.log("req", req.body.buzzWord);
  let arr = bW.buzzwords.filter(x => x.buzzWord !== req.body.buzzWord);
  console.log(arr);
  if (arr.length > 0) {
    total += req.body.points;
    res.json("total:" + total);
  } else {
    res.json("Buzzword does not exist!");
  }
});

app.listen(PORT, () => {
  console.log("Port Open");
});
