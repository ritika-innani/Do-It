import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthenticateService } from './authenticate.service';

@Injectable()

export class TaskService {
    domain = this.authenticateService.domain;
    options;

    constructor(private http: Http, private authenticateService: AuthenticateService) { }

    // function for creating authentication headers
    createAuthenticationHeaders(){
        this.authenticateService.loadToken();
        this.options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': this.authenticateService.authToken
            })
        })
    }

    // function for saving a new task
    newTask(task) {
        this.createAuthenticationHeaders();
        return this.http.post(this.domain + '/api/task', task, this.options).map(res => res.json());
    }

    // function for getting all tasks of given user id
    getAllTasks(id){
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + '/api/tasks/' + id, this.options).map(res => res.json());
    }

    //function for searching for a task
    getTaskById(id){
      this.createAuthenticationHeaders();
      return this.http.get(this.domain + '/api/task/' + id, this.options).map(res => res.json());
    }

    //function for updating a task
    updateTask(task){
      this.createAuthenticationHeaders();
      return this.http.put(this.domain + '/api/task/', task, this.options).map(res => res.json());
    }

    //function for deleting a task
    deleteTask(id){
        this.createAuthenticationHeaders();
        return this.http.delete(this.domain + '/api/task/' + id, this.options).map(res => res.json());
    }

    //to add a tem member
    addTeamMember(member) {
      this.createAuthenticationHeaders();
      return this.http.post(this.domain + '/api/team/', member, this.options).map(res => res.json());
    }

    // to get team members
    getTeamMembers(email){
      this.createAuthenticationHeaders();
      return this.http.get(this.domain + '/api/team/' + email, this.options).map(res => res.json());
    }

  // to get user notifications
    getAllMessages(email){
      this.createAuthenticationHeaders();
      return this.http.get(this.domain + '/api/message/' + email, this.options).map(res => res.json());
    }
}
