import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, TodoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new todo', () => {
    component.newTodoText = 'New Todo';
    component.addTodo();
    expect(component.todos().length).toBe(1);
    expect(component.todos()[0].text).toBe('New Todo');
    expect(component.newTodoText).toBe('');
  });

  it('should not add an empty todo', () => {
    component.newTodoText = '   ';
    component.addTodo();
    expect(component.todos().length).toBe(0);
  });

  it('should toggle todo completion', () => {
    component.newTodoText = 'Test Todo';
    component.addTodo();
    const todo = component.todos()[0];
    
    component.toggleTodo(todo);
    expect(todo.completed).toBe(true);
    
    component.toggleTodo(todo);
    expect(todo.completed).toBe(false);
  });

  it('should start editing a todo', () => {
    component.newTodoText = 'Test Todo';
    component.addTodo();
    const todo = component.todos()[0];
    
    component.startEditing(todo);
    expect(todo.editing).toBe(true);
  });

  it('should finish editing a todo', () => {
    component.newTodoText = 'Test Todo';
    component.addTodo();
    const todo = component.todos()[0];
    
    component.startEditing(todo);
    todo.text = 'Updated Todo';
    component.finishEditing(todo);
    
    expect(todo.editing).toBe(false);
    expect(todo.text).toBe('Updated Todo');
  });

  it('should delete a todo', () => {
    component.newTodoText = 'Test Todo';
    component.addTodo();
    expect(component.todos().length).toBe(1);
    
    const todo = component.todos()[0];
    component.deleteTodo(todo);