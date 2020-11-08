import { WebRequestService } from '../../web-request.service';
import { Task } from './../../Models/task.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/Models/list.model';
import { TaskService } from 'src/app/task.service';
import { unescapeIdentifier } from '@angular/compiler';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  lists: List[];
  tasks: Task[];

  selectedListId: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.listId) {
        this.selectedListId = params.listId;
        this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
          this.tasks = tasks;
        });
      } else {
        this.tasks = undefined;
      }
    });

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    });
  }

  onTaskclick(task: Task) {
    this.taskService.complete(task).subscribe(() => {
      task.completed = !task.completed;
    });
  }

  onDeleteListClick() {
    this.taskService.deletelist(this.selectedListId).subscribe((response) => {
      this.router.navigate(['/lists']);
    });
  }

  onTaskDeleteClick(id: string) {
    this.taskService
      .deleteTask(this.selectedListId, id)
      .subscribe((response) => {
        this.tasks = this.tasks.filter((val) => val._id !== id);
      });
  }
}
