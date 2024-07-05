const express = require('express')
const mongoose = require('mongoose');
const app = express()
app.use(express.json())

const cors = require('cors');
app.use(cors());


// Mongooosee................
mongoose.connect('mongodb://127.0.0.1:27017/web')
  .then(() => console.log('Moongose Connected!'));

  const Schema = mongoose.Schema;
  
  const TodoSchema = new Schema({
    title: String,
    status: Boolean
  });
const Todo= mongoose.model('Todo', TodoSchema)

// Mongooosee................

app.get("/api/todos", async function (req, res) {
    try {
        let todos = await Todo.find()
        res.send(todos)
    } catch (err) {
        res.status(500).send({
            msg: "server error",
        })
    }
})


app.post("/api/todos", async function (req, res) {
    try {
        let todo = await Todo.create({
            title: req.body.title,
            status: false,
        })
        res.send(todo)
    } catch (err) {
        res.status(500).send("server error")
    }
})

app.put("/api/todos/:id", async function (req, res) {
    console.log(req.params.id)
    await Todo.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        status: req.body.status,
    })

    res.send("update")
})

app.delete("/api/todos/:id", async function (req, res) {
    await Todo.findByIdAndDelete(req.params.id)
    // await Todo.deleteOne({_id:req.params.id})
    res.send("deletee")
})
app.delete("/api/todos-reset", async function (req, res) {
    await Todo.deleteMany({})
    res.send("deletee")
})


app.listen(8000, () => {
    console.log('8000 server started')
})