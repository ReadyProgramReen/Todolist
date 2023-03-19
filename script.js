const form = document.getElementById('data-form')
const lists = document.getElementById('data-lists')
const input = document.getElementById('input')
const removeAllbtn = document.getElementById('removeall')
const todoList = document.querySelectorAll('.todo')

//local storage

class Storage {
    static addTodoStorage(todoArray) {
      let storage = localStorage.setItem('todo', JSON.stringify(todoArray))
      return storage;
    }
    static getStorage() {
      let storage = localStorage.getItem('todo') === null ? [] : JSON.parse(localStorage.getItem('todo'))
      return storage
    }
  }
  //empty array 
  let todoArray = Storage.getStorage()
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    let id = Math.random() * 10000;
    console.log(id)
    const todo = new Todo(id, input.value)
    console.log(todo)
    todoArray = [...todoArray, todo]
    console.log(todoArray)
    Ui.displayData();
    Ui.clearinput();
    Ui.removeTodo();
    Storage.addTodoStorage(todoArray)
    // Ui.removeBtnDisplay()
  })

  class Todo {
    constructor(id, todo) {
      this.id = id;
      this.todo = todo;
    }
  }