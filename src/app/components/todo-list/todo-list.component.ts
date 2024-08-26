import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  editing?: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <h2>TODO List</h2>
      <input [(ngModel)]="newTodoText" (keyup.enter)="addTodo()" placeholder="Add new todo">
      <button (click)="addTodo()">Add</button>
      
      <ul>
        @for (todo of todos(); track todo.id) {
          <li>
            <input type="checkbox" [checked]="todo.completed" (change)="toggleTodo(todo)">
            @if (!todo.editing) {
              <span [class.completed]="todo.completed" (click)="toggleTodo(todo)">{{ todo.text }}</span>
            } @else {
              <input [(ngModel)]="todo.text" (blur)="finishEditing(todo)" (keyup.enter)="finishEditing(todo)">
            }
            <button (click)="startEditing(todo)">Edit</button>
            <button (click)="deleteTodo(todo)">Delete</button>
          </li>
        } @empty {
          <li>No todos yet. Add one above!</li>
        }
      </ul>
    </div>
  `,
  styles: [
    `
    :host {
      display: block;
      max-width: 500px;
      margin: 2rem auto;
      font-family: 'Arial', sans-serif;
    }
    h2 {
      color: #2c3e50;
      text-align: center;
    }
    input[type="text"] {
      width: 70%;
      padding: 10px;
      border: none;
      border-bottom: 2px solid #3498db;
      font-size: 16px;
      transition: border-color 0.3s;
      &:focus {
        outline: none;
        border-color: #2980b9;
      }
    }
    button {
      padding: 10px 15px;
      margin-left: 10px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
      &:hover {
        background-color: #2980b9;
      }
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      padding: 10px;
      background-color: #ecf0f1;
      border-radius: 4px;
      transition: background-color 0.3s;
      &:hover {
        background-color: #e0e6e8;
      }
    }
    input[type="checkbox"] {
      margin-right: 10px;
    }
    span {
      flex-grow: 1;
      margin-right: 10px;
      cursor: pointer;
    }
    .completed {
      text-decoration: line-through;
      color: #7f8c8d;
    }
  `
  ]
})
export class TodoListComponent {
  todos = signal<Todo[]>([]);
  newTodoText = '';

  addTodo() {
    if (this.newTodoText.trim()) {
      this.todos.update(todos => [
        ...todos,
        { id: Date.now(), text: this.newTodoText, completed: false }
      ]);
      this.newTodoText = '';
    }
  }

  toggleTodo(todo: Todo) {
    this.todos.update(todos =>
      todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t)
    );
  }

  startEditing(todo: Todo) {
    this.todos.update(todos =>
      todos.map(t => t.id === todo.id ? { ...t, editing: true } : t)
    );
  }

  finishEditing(todo: Todo) {
    this.todos.update(todos =>
      todos.map(t => t.id === todo.id ? { ...t, editing: false } : t)
    );
  }

  deleteTodo(todo: Todo) {
    this.todos.update(todos => todos.filter(t => t.id !== todo.id));
  }
}