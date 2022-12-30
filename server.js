require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const PornModel = require("./models/videos")
const mongoose = require("mongoose")
const { ObjectId } = require("mongodb")

app.use(cors())
app.use(express.json( ))

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)

app.get("/api/videos", (req, res) => {
  PostModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});


app.post("/api/videos", async (req, res) => {
  const posting = req.body;
  const newPosting = new PostModel(posting);
  await newPosting.save();
  res.json(posting);
});


// app.delete('/getPost/:id', async (req, res) => {
//   // Get the user ID from the request parameters
//   if (typeof req.params.id != "string") req.params.id = ""
//  await PornModel.deleteOne({ _id: new ObjectId(req.params.id) });
//   res.send("data deleted")
// });

app.put("/api/videos/:id", (req, res) => {
  const newName = req.body.newName;
  const newAge = req.body.newAge;
  const newUsername = req.body.newUsername;
  const id = req.body.id;
  console.log(newName, id);

  try {
    PornModel.findByIdAndUpdate(id, (error, postToUpdate) => {
      postToUpdate.name = newName;
      postToUpdate.age = newAge;
      postToUpdate.username = newUsername;
      postToUpdate.save();
    });
  } catch (error) {
    console.log(error);
  }
  return res.send("updated");
});

app.get("/api/videos/:id", (req, res, next) => {
  PornModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Student updated successfully !");
      }
    }
  );
});
// app.put("/api/videos/:id", (req, res, next) => {
//   PornModel.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: req.body,
//     },
//     (error, data) => {
//       if (error) {
//         return next(error);
//         console.log(error);
//       } else {
//         res.json(data);
//         console.log("Student updated successfully !");
//       }
//     }
//   );
// });




app.get('/', (req, res) => {
  res.send('Hello World!');
});




const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

