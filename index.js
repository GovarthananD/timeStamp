import fs from "fs";
import express from "express";
import path from "path";
const app = express();
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/getAllFiles", (req, res) => {
  const folderPath = "./currentTimestamp";

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      res.status(500).send("Error reading folder");
      return;
    }
    console.log(files);
    const textFiles = files.filter((file) => file.endsWith(".txt"));
    res.json(textFiles);
  });
});

app.get("/createFile", (req, res) => {
  const folderPath = "./currentTimestamp";
  const currentDate = new Date();
  const fileName = `${currentDate
    .toISOString()
    .replace(/:/g, "_")
    .replace(/-/g, "_")}.txt`;
  const filePath = path.join(__dirname, folderPath, fileName);
  const fileContent = currentDate.toString();
  console.log(filePath, fileContent);
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error("Error creating file:", err);
      res.status(500).send("Error creating file: " + err.message);
      return;
    }
    console.log("File created successfully:", filePath);
    res.status(201).send("File created successfully");
  });
});

app.listen(5000, (_) => {
  console.log("Server listening 5000");
});
