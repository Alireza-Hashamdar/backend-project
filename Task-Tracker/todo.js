const inquirer = require("inquirer")
const fs = require("fs");
const path = require("path");

const taskFile = path.join(__dirname, "todo.json");

const mainMenu = async()=>{
    const answer = await inquirer.prompt({
        type: "list",
        name: "action",
        message: "what do you want do",
        choices:[
            "add",
            "list",
            "mark as done",
            "delete",
            "exit"
        ]
    })
    switch(answer.action){
        case "add":
            await  add();
                 break;
        case "list":
            list();
            break;
        case "mark as done":
            await  markAsDone();
            break;
        case "delete":
           await  deleteTask();
            break;
        case "exit":
            console.log("bye");
            process.exit();
            break;
    }
}

const readFile = () => {
    if (!fs.existsSync(taskFile)) {
        fs.writeFileSync(taskFile, "[]");
        return [];
    }
    const data = fs.readFileSync(taskFile, "utf8");
    return JSON.parse(data);
}

const writeTask = (tasks) => {
    fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2));
}


const add =async () => {
    const task = readFile();
   const answer = await inquirer.prompt({
    type: "input",
    name: "title",
    message: "task name :"
   })
   task.push({id: Date.now(),
    title: answer.title,
    done: false
});
   writeTask(task)
   console.log("task added");
}

const list = () => {
    const tasks = readFile();
    if (tasks.length === 0) {
        console.log("There is no task.");
    } else {
        console.log("Your tasks:");
        tasks.forEach((task, index) => {
            
            console.log(`${index + 1}.${task.title},${task.done}`);
        });
    }
};

const markAsDone = async () => {
    const tasks = readFile();
    if (tasks.length === 0) {
        console.log("there is no task");
        return;
    }
    const answer = await inquirer.prompt({
        type: "list",
        name: "index",
        message: "Which todo do you want to mark as done?",
        choices: tasks.map((task, index) => ({
            name: task.title,
            value: index
        }))
    });

    tasks[answer.index].done = true;
    writeTask(tasks);
    console.log("Task marked as done");
};

const deleteTask = async () => {
    const tasks = readFile();
    if (tasks.length === 0) {
        console.log("There is no task.");
        return;
    }

    const answer = await inquirer.prompt({
        type: "list",
        name: "index",
        message: "Which task do you want to delete?",
        choices: tasks.map((task, index) => ({
            name: task.title,
            value: index
        }))
    });

    const removed = tasks.splice(answer.index, 1);
    writeTask(tasks);
    console.log(`Task "${removed[0].title}" deleted.`);
};

mainMenu()