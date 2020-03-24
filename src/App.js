import React, {Component} from 'react';
import TodoList from './components/TodoComponents/TodoList';
import TodoForm from './components/TodoComponents/TodoForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{
        // task: '',
        // id: '',
        // completed: false
      }],
      todo: ''
    }
  }
  
  render() {
    return (
      <div className="App">
        <h1>To-Do List</h1>
        <TodoList 
          todos={this.state.todos}
          toggleComplete={this.toggleComplete}
        />
        <TodoForm 
          todos={this.state.todos}
          value={this.state.todo}
          inputChangeHandler={this.inputChangeHandler}
          addTask={this.addTask}
          removeTasks={this.removeTasks}
        />
      </div>
    );
  };

  // This function is taking what you type into the input bar, and adding it to state.
  inputChangeHandler = event => {
    this.setState({[event.target.name] : event.target.value})
  }

  // Add task button
  addTask = event => {
    event.preventDefault(); // prevent the page from refreshing every time adding a new to-do item
    let newTask = {
      task: this.state.todo,
      id: Date.now(),
      completed: false
    }

    this.setState({
      todos: [...this.state.todos, newTask],  // using the spread operator to make sure only have one array
      todo: '' // reset todo to an empty string so it can be filled in again
    })
  }

  // Remove tasks
  removeTasks = event => {
    event.preventDefault(); // prevent the page from refreshing
    this.setState(prevState => {
      return {
        todos: prevState.todos.filter(todo => {
          return !todo.completed
        })
      }
    })
  }

  // Marking items as complete
  toggleComplete = itemID => {
    const todos = this.state.todos.map(todo => {
      if(todo.id === itemID) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({todos, todo: ''});
  };


}

export default App;
