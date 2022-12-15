import Todo from '../models/Todo.js';

export const getAll = async (req, res) => {
    const todos = await Todo.find({});
    //console.log(todos);
    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos
    });
}

export const newTodo = (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    });
}

export const create = async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    });
    await todo.save();
    res.redirect('/');
}

export const complete = async (req, res) => {
    const todo = await Todo.findById(req.body.id);

    todo.completed = !!req.body.completed;
    await todo.save();

    res.redirect('/');
}


