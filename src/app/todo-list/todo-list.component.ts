import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, AfterViewInit {
  public todoItems: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);
  public todoCurrentItem: Subject<string> = new Subject<string>();

  constructor() { }

  ngOnInit(): void {
    this.getItems();

    this.todoItems.subscribe((data) => {
      this.setItems(data);
    });
    this.todoCurrentItem.subscribe((data) => {
      this.setCurrentItem(data);
    });
  }

  ngAfterViewInit() {
    this.todoCurrentItem.subscribe((data) => {
      this.setActiveBlock(data);
    });

    this.getCurrentItem();
  }

  public addItem(value: string): void {
    const currentItems = this.todoItems.getValue();
    const updatedItems = [...currentItems, value];
    this.todoItems.next(updatedItems);
  }

  public deleteItem(value: string): void {
    const currentItems: string[] = this.todoItems.getValue();

    currentItems.forEach((item, index) => {
      if (item === value)
        currentItems.splice(index, 1);
    });

    this.todoItems.next(currentItems);
  }

  public getItems(): void {
    if (localStorage.getItem('todoItems') == null)
      return;

    this.todoItems.next(JSON.parse(<string>localStorage.getItem('todoItems')));
  }

  public setItems(data: Array<string>): void {
    if (data == undefined)
      return;

    const todoItems = JSON.stringify(data);
    localStorage.setItem('todoItems', todoItems);
  }

  public makeActive(value: string): void {
    this.todoCurrentItem.next(value);
  }

  public getCurrentItem(): void {
    if (localStorage.getItem('todoCurrentItem') == null)
      return;

    this.todoCurrentItem.next(JSON.parse(<string>localStorage.getItem('todoCurrentItem')));
  }

  public setCurrentItem(data: string): void {
    if (data == undefined)
      return;

    const todoCurrentItem = JSON.stringify(data);
    localStorage.setItem('todoCurrentItem', todoCurrentItem);
  }

  public setActiveBlock(data: string): void {
    const todoItemBlocks = document.getElementsByClassName('todo-item');

    for (let i = 0; i < todoItemBlocks.length; ++i)
      todoItemBlocks[i].className = todoItemBlocks[i].className.replace('active', '');

    const todoActiveBlock = document.getElementById(data);
    todoActiveBlock?.classList.add('active');
  }
}
