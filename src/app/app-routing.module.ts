import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditComponent } from './admin/user-edit/user-edit.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { ClassesComponent } from './classes/classes.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {path: 'details/:id', component: CourseDetailsComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'enrollment', component: EnrollmentComponent},
  {path: 'classes', component: ClassesComponent},
  {path: 'admin/users', component: UserListComponent},
  {path: 'admin/users/:userId', component: UserEditComponent},
  {path: '', component: DashboardComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(
    routes,
    { enableTracing: true } 
    ) 
  ],
  
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
