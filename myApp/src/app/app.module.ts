import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalDirective,ModalModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { MdDatepickerModule } from '@angular/material';
import { MdFormFieldModule, MdInputModule, MdNativeDateModule, DateAdapter } from '@angular/material';

//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TaskComponent } from './components/task/task.component';
import { SubnavbarComponent } from './components/subnavbar/subnavbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UpdateTaskComponent } from './components/task/update-task/update-task.component';
import { DeleteTaskComponent } from './components/task/delete-task/delete-task.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';
import { HeaderComponent } from './components/home/header/header.component';
import { NewTaskComponent } from './components/task/new-task/new-task.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { ProjectComponent } from './components/project/project.component';
import { AccountComponent } from './components/account/account.component';
import { MemberFilterPipe } from './components/task/memberFilter.pipe';
import { ProfileComponent } from './components/profile/profile.component';

// Services
import { AuthenticateService } from './services/authenticate.service';
import { TaskService } from './services/task.service';
import { AuthGuard} from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TaskComponent,
    SubnavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    UpdateTaskComponent,
    DeleteTaskComponent,
    TaskFilterComponent,
    HeaderComponent,
    NewTaskComponent,
    DashboardComponent,
    InboxComponent,
    ProjectComponent,
    AccountComponent,
    MemberFilterPipe,
    ProfileComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdFormFieldModule,
    MdInputModule,
    ModalModule.forRoot()
  ],
  providers: [
    AuthenticateService,
    TaskService,
    AuthGuard,
    NotAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
