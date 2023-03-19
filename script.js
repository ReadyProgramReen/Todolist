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

  //display in the  dom 
class Ui {
    static displayData() {
      let displayData = todoArray.map(item => {
        return `<div class="todo">
        
          <p class='ptag'>${item.todo}
          </p>
        <div>  
      <span class="remove" id=${item.id}>🗑️</span> 
        <span class="edit" id=${item.id}>🖊️</span> 
         </div>
          </div>`
  
      })
      lists.innerHTML = displayData.join('')
      Ui.removeBtnDisplay()
    }
    static clearinput() {
      input.value = '';
    }
    static removeTodo() {
      lists.addEventListener('click', (e => {
        if (e.target.classList.contains("remove")) {
          console.log('Remove it ')
          e.target.parentElement.parentElement.remove()
          let btnId = e.target.id;
          console.log(btnId)
          Ui.removeArrayTodo(btnId)
          Ui.removeBtnDisplay()
  
        }
  
  
  
      }))
    }
    static removeArrayTodo(id) {
      todoArray = todoArray.filter(item => item.id != id)
      Storage.addTodoStorage(todoArray)
    }
    static editBtn() {
      let iconChange = true;
      lists.addEventListener('click', (e => {
        if (e.target.classList.contains('edit')) {
          console.log('edit')
          let p = e.target.parentNode.parentNode.firstElementChild
          console.log(p)
          const btnId = e.target.id
          if (iconChange) {
            p.setAttribute('contenteditable', true)
            p.focus()
            e.target.textContent = 'save';
            p.style.color = 'blue';
          } else {
            e.target.textContent = '🖊️';
            p.style.color = 'black';
            p.removeAttribute('contenteditable')
            const newArr = todoArray.findIndex(item => item.id === +btnId)
            todoArray[newArr].todo = p.textContent;
            Storage.addTodoStorage(todoArray)
          }
        }
        iconChange = !iconChange
      }))
    }
    static removeAll() {
      removeAllbtn.addEventListener('click', () => {
        console.log('testing')
        todoArray.length = 0;
        localStorage.clear()
        Ui.displayData()
      })
    }
    static removeBtnDisplay() {
      return todoArray.length > 0 ? removeAllbtn.style.display = 'initial' : removeAllbtn.style.display = 'none'
    }
  }