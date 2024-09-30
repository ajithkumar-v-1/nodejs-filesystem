import express from "express";
import fs from "fs";
import { format } from "date-fns";
import path from "path";
import dotenv from "dotenv";
//importing space

//initalization
const app = express();
const PORT = process.env.PORT ||10000 ;

//middlewares
app.use(express)

//routes

//First endpoint to create a text file in particular folder
app.get("/create", (req, res) => {
  //declaring current time and date using the format

  let currenttime = format(new Date(), "dd-MM-yyyy-hh-mm-ss");
  //console.log(currenttime);

  //adding content of file in the timestamp folder

  const filepath = `Timestamp/${currenttime}.txt`;
  fs.writeFileSync(filepath, `${currenttime}`, "utf8");

  //retrieving the timestamp
  let data = fs.readFileSync(filepath, "utf8");
  res.status(200).send(`<span style="font-size:2rem;">${data}</span>`);
});

//second endpoint to retrieve all the text file in the folder

app.get("/read", (req, res) => {
  const folderpath = fs.readdirSync("Timestamp");
  // console.log(folderpath);

  let data = [];

  //to get the extension portion of a file path using path.extname()
  folderpath.filter((ele) => {
    if (path.extname(ele) == ".txt") {
      data.push(ele);
    }
  });
  let files = data.join(`</br>`);
  res.status(200).send(`<h1>${files}</h1>`);
});

//running port
app.listen(PORT, () => {
  console.log(`App is listening to the port ${PORT}`);
});