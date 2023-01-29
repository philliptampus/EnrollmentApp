import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './admin/user-list/user-list.component';
import { ClassesComponent } from './classes/classes.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {path: 'course/:courseId', component: CourseDetailsComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'enrollment', component: EnrollmentComponent},
  {path: 'classes', component: ClassesComponent},
  {path: 'admn/user-list', component: UserListComponent},
  {path: '', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
