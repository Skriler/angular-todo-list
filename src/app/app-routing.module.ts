import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'todo-list',
    loadChildren: () => import('./todo-list/todo-list.module').then(m => m.TodoListModule)
  },
  {
    path: '',
    redirectTo: 'todo-list',
    pathMatch: 'full'
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ]
})
export class AppRoutingModule { }
