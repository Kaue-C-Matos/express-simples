const express = require("express");
const server = express();
server.use(express.json());
const port = 3000; //N° da porta

server.listen(port, ()=>{
    console.log(`server rodando na porta ${port}`)
})

let tasks = [
    {
        id: 1, 
        nome:"comprar leite", 
        descricao: "ir até a esquina e comprar leite", 
        isDone: false
    },
    {
        id: 2, 
        nome:"lavar as janelas", 
        descricao: "lavar as janelas da cozinha e dos quartos", 
        isDone: true
    }
]

server.get("/tasks", (req, res)=>{
    res.json({tasks})
})

server.post("/tasks", (req, res)=>{
    console.log(req.body)
    const newTask={
        id: tasks.length + 1,
        nome: req.body.nome,
        descricao: req.body.descricao,
        isDone: req.body.isDone
    }
    tasks.push(newTask)
    res.json({
        tasks: newTask
    })
})

server.put("/tasks/:id", (req, res)=>{
    const id = Number(req.params.id);
    const task = tasks.find((task)=>{
        return task.id === id
    })
    task.nome = req.body.nome
    task.descricao = req.body.descricao
    task.isDone = req.body.isDone
    res.json({task})
})

server.delete("/tasks/:id", (req, res)=>{
    const id = Number(req.params.id);
    tasks = tasks.filter(task=>{
        return task.id !== id
    })
    res.status(204).send();
})