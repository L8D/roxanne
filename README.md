Roxanne
=======

A JavaScript application framework that gives structure to FRP.

The pseudo-documentation, please ignore for now:

Actions 
-------
`Roxanne.Action(type, [value])`

Actions are one of the core components in Roxanne. An action represents a
create-update-destroy style change to be made to a model. It can be used to
wrap any value or object you'd like as long as you model knows how to read
and use it; you can even use no value at all!

```javascript
var newTodo = Roxanne.Action('create', {
  title: 'write better documentation',
  completed: false
});

myModel = myModel.update(newTodo);
```

Sources
-------
`Roxanne.Source([parent])`

Sources are essentially what observables are in FRP frameworks like Bacon.js
or Rx.js, except they (should) emit actions. The API attempts to closely mock
that of Bacon.js, so there is a plethora of methods to create sources in
Roxanne.

```javascript
Roxanne.Source.fromEvent($('#my-input'), 'keydown');
Roxanne.Source.fromEvent(document.getElementById('my-input'), 'keydown');
Roxanne.Source.fromPromise($.get('http://jsonip.com'));

Roxanne.Source.fromBinder(function(sink) {
  http.get('http://jsonip.com', function(res) {
    res.on('data', sink);
  });
});

Roxanne.Source.fromNodeCallback(function(sink) {
  request('http://jsonip.com', sink);
});
```

Models
------
`Roxanne.Model(accumulator, [initial])`

Models in Roxanne are very different than the models in MV* frameworks. A
model in Roxanne is only an accumulator function that takes a state and an
action and returns a new state based on that action. This means that your
"state" value can be anything you want it to be, and it can (and should) be
immutable. You may pass a starting value that will be used when constructor
is called with no value.

```javascript
var Todos = Roxanne.Model(function(todos, action) {
  switch (action.type) {
  case 'create':
    return todos.concat([action.value]);

  case 'update':
    return todos.map(function(todo) {
      if (todo.title === action.value.title) {
        return action.value;
      } else {
        return todo;
      }
    });

  case 'destroy':
    return todos.filter(function(todo) {
      return todo.title !== action.value.title;
    });

  default:
    return todos;
  }
});

var myTodos = Todos([]);

myTodos = myTodos.update(Roxanne.Action('create', {
  title: 'do the laundry',
  completed: false
}));

console.log(myTodos.value);
// => [{title: 'do the laundry', completed: false}]
```

Views
-----
`Roxanne.View(renderer, [parameters...])`

Views are just data-rendering callbacks. Whenever a model updates, the view's
renderer is called with the new model, plus any additional parameters that
were passed to either the constructor or creator (more specifically these are
usually callbacks used to push events upstream to sources).

```javascript
var TodoView = Roxanne.View(function(todos) {
  React.renderComponent(TodoComponent({todos: todos}, $('#todos'));
});

var view = TodoView(myTodos);
```

12345678901256789012345678901234567890123456789012345678901234578901234567890
