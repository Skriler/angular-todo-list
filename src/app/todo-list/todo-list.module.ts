import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodoListComponent} from "./todo-list.component";
import {TodoListRoutingModule} from "./todo-list-routing.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    TodoListRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class TodoListModule { }
