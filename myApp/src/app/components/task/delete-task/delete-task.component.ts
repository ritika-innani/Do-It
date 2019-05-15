import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AuthenticateService } from '../../../services/authenticate.service';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {
    public id;

    @ViewChild('deletePopup') public deletePopup:ModalDirective;

    @Output()
    taskDeleted: EventEmitter<string> = new EventEmitter<string>();

    constructor(private authenticateService: AuthenticateService,
    private taskService: TaskService,
    private router: Router ) { }

    ngOnInit() {}

    show(taskId){
        this.id = taskId;
        this.deletePopup.show();
    }

    hide(){
        this.deletePopup.hide();
    }

    deleteTask(){
    this.taskService.deleteTask(this.id).subscribe(data => {
        var self = this;
        if (!data.success) {
                console.log(data.message);
                this.hide();
                alert('cannot delete');
            } else {
                console.log(data.message);
                this.hide();
                this.taskDeleted.emit('deleted');
            }
    });
    }
}
