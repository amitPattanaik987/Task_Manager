const express = require("express");
const app = express();
const db = require("./db");
const detailsmodel = require("./models/details");
const cors = require("cors");
const Listmodel = require("./models/list");

app.use(express.json());
app.use(cors(
  {
    origin:["https://deploy-mern-1whq.vercel.app"],
    methods:["POST","GET"],
    credentials:true
  }
));

app.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newdata = new detailsmodel(data);
    const response = await newdata.save();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
});
app.post("/NewList", async (req, res) => {
  try {
    const List = req.body;

    if (!List) {
      return res.status(400).json({ message: "List field is required" });
    }

    const newList = new Listmodel(List);
    const savedList = await newList.save();

    res.status(200).json(savedList);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

app.delete("/Lists", async (req, res) => {
  try {
    const { deleteList } = req.body;
    const response = await Listmodel.findOneAndDelete({ List: deleteList });
    if (response) {
      res.status(200).json({ message: "Item deleted", deletedItem: response });
    } else {
      res.status(404).json({ message: "List not found" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/delete/sublist", async (req, res) => {
  try {
    const { tasks, List } = req.body;

    const response =await Listmodel.findOne({List});
    const arr=response.tasks;
    console.log(arr);
    const newarr=arr.filter(item=>item!==tasks)
    console.log(newarr);
    response.tasks=newarr;
    await response.save();

    res.status(200).json("Task successfully deleted");
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/Newtask", async (req, res) => {
  const { task, List } = req.body;
  try {
    const response = await Listmodel.findOne({ List });
    console.log(response);
    response.tasks.push(task);
    await response.save();
    return res.status(200).json("Successful");
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.get("/Lists", async (req, res) => {
  try {
    const data = await Listmodel.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  console.log(Email)
  console.log(Password)
  try {
    if (!Email || !Password) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter Email and Password" });
    }
    const response = await detailsmodel.findOne({ Email });
    console.log(response)
    if (!response) {
      return res
        .status(401)
        .json({ success: false, message: "Please Enter a correct Email" });
    }
    const ispassword = response.Password === Password;
    if (!ispassword) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Password" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Login Successfully.." });
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});
