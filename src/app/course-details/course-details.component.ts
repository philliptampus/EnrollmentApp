import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { Course } from 'src/app/shared/course';
  import { SystemService } from 'src/app/shared/SystemService';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {
    courseIdParam: string = "";
    course: Course;
    courseForm: FormGroup;
    errorMessage: string;
  
    constructor(private route: ActivatedRoute, private fb: FormBuilder, private service: SystemService, private router: Router) {
      
    }
  
    ngOnInit(){
  
      this.route.params.subscribe((params: any) => {
        
        this.courseIdParam = params.courseId;
        
        this.initializeCourseForm();
      });
    }
  
    initializeCourseForm() {
  
      this.courseForm = this.fb.group({
        Name: ["", [Validators.required]],
        Description: ["", [Validators.required]]
      });
  
      if (this.courseIdParam == 'new') {
        // Load default form
       
      }
      else {
        // Load the user into the form
        this.service.ExecuteAPI_Get<Course>("Course/GetCourse" + this.courseIdParam).subscribe(data =>
          {
            this.initValue(data);
          }
        );
  
      }
  
      
    }
  
    save() {
      this.errorMessage = "";
      for (const i in this.courseForm.controls) {
        this.courseForm.controls[i].markAsDirty();
        this.courseForm.controls[i].updateValueAndValidity();
      }
  
      if (this.courseForm.valid) {
        if (this.courseForm.dirty) {
          this.saveCourseToDB();
        }
      }
      else {
        this.errorMessage = "Form is invalid. Please check the required field."
      }
    }
  
  
    async saveCourseToDB() {
      var me = this;
      if (this.courseIdParam == 'new') {
        // Create
        const userPayload = { ...this.course, ...this.courseForm.value };
        await this.service.ExecuteAPI_Post<Course>("Course/GetCourse", userPayload).subscribe(data =>
          {
            this.router.navigate(['/courses']);
            //this.setData(data)
          }
        );
      }
      else {
        // Update
        const userPayload = { ...this.course, ...this.courseForm.value };
        await this.service.ExecuteAPI_Put<Course>("Course/UpdateCourse", userPayload).subscribe(data => {
          this.router.navigate(['/courses']);
        });
      }
  
    }
    async delete() {
      let ans = confirm("Are you sure you want to delete this course?");
      if(ans) {
        await this.service.ExecuteAPI_Delete<boolean>("Course/DeleteCourse/" + this.courseIdParam).subscribe(success =>
          {
            if(success) {
              alert("Course deleted successfully.");
              this.router.navigate(['/courses']);
            }
            else {
              alert("Cannot delete Course. Not existing.");
            }
          }
        );
      }
    }
    close() {
      this.router.navigate(['/courses']);
    }
  
    initValue(course: Course): void {
      this.course = course;
  
      if (this.course) {
        // Reset the form back to pristine
        this.courseForm.reset();
  
        // Update the data on the form
        this.courseForm.patchValue({
          id: this.course.id,
          Name: this.course.name,
          Description: this.course
        });
      }
    }
  }


/*  courseIdParam: string = "";
courses: any;

  constructor(
    private route: ActivatedRoute,
    private systemService: SystemService,
    private location: Location
    ) {}
    
    ngOnInit(): void {
      this.getCourse();
    }

    getCourse(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.systemService.getCourse(id)
        .subscribe((course: any) => this.courses = course);
    }
  
    goBack(): void {
      this.location.back();
    }
  }*/
