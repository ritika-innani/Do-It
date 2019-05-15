import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './components/task/task.component';
import { DeleteTaskComponent } from './components/task/delete-task/delete-task.component';
import { UpdateTaskComponent } from './components/task/update-task/update-task.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';
import { NewTaskComponent } from './components/task/new-task/new-task.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { ProjectComponent } from './components/project/project.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard} from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';


const routes: Routes=[
    {path: '', component: HomeComponent},
    {path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard]},
    {path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children:[
        {path: '', component: TaskComponent, outlet: 'childComponent'},
        {path: 'mytasks', component: TaskComponent, outlet: 'childComponent'},
        {path: 'myprojects', component: ProjectComponent, outlet: 'childComponent'},
        {path: 'inbox', component: InboxComponent, outlet: 'childComponent'},
        {path: 'profile', component: ProfileComponent, outlet: 'childComponent'}
    ]},
    {path: 'delete-task/:id', component: DeleteTaskComponent},
    {path: 'update-task/:id', component: UpdateTaskComponent},
    {path: 'filter-task/:task', component: TaskFilterComponent},
    { path: '**', component: HomeComponent }
];

@NgModule({
    declarations: [],
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule{}
