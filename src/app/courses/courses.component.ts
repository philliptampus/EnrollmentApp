import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course} from 'src/app/shared/course';
import { SystemService } from 'src/app/shared/SystemService';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  public dataSource: Array<Course> = []
  displayedColumns: string[] = ['id', 'name', 'description'];
  constructor(public service: SystemService, public router: Router) {
    this.getCourse();
    }

  async getCourse() {
    await this.service.ExecuteAPI_Get<Course>("Course/GetCourse").subscribe(data => this.setData(data));
  }

  setData(data: any) {
    this.dataSource = data;
  }
  
  coursesOffered() {
  this.router.navigate(['/courses']);
  }
}
