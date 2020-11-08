import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from '../../Models/list.model'

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListComponent implements OnInit {
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {}

  createNewList(title: string) {
    this.taskService.createList(title).subscribe((list: List) => {
      this.router.navigate(['/lists', list._id]);
    });
  }
}
