import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User_Model } from 'src/app/shared/models';
import { SystemService } from 'src/app/shared/SystemService';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  userIdParam: string = "";
  userModel: User_Model;
  userForm: FormGroup;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private service: SystemService, private router: Router) {
    
  }

  ngOnInit(){

    this.route.params.subscribe((params: any) => {
      
      this.userIdParam = params.userId;
      
      this.initializeUserForm();
    });
  }

  initializeUserForm() {

    this.userForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      emailAddress: ["", [Validators.required]],
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });

    if (this.userIdParam == 'new') {
      // Load default form
     
    }
    else {
      // Load the user into the form
      this.service.ExecuteAPI_Get<User_Model>("Admin/User/" + this.userIdParam).subscribe(data =>
        {
          this.initValue(data);
        }
      );

    }

    
  }

  save() {
    this.errorMessage = "";
    for (const i in this.userForm.controls) {
      this.userForm.controls[i].markAsDirty();
      this.userForm.controls[i].updateValueAndValidity();
    }

    if (this.userForm.valid) {
      if (this.userForm.dirty) {
        this.saveUserToDB();
      }
    }
    else {
      this.errorMessage = "Form is invalid. Please check the required field."
    }
  }


  async saveUserToDB() {
    var me = this;
    if (this.userIdParam == 'new') {
      // Create
      const userPayload = { ...this.userModel, ...this.userForm.value };
      await this.service.ExecuteAPI_Post<User_Model>("Admin/User", userPayload).subscribe(data =>
        {
          this.router.navigate(['admin/users']);
          //this.setData(data)
        }
      );
    }
    else {
      // Update
      const userPayload = { ...this.userModel, ...this.userForm.value };
      await this.service.ExecuteAPI_Put<User_Model>("Admin/UpdateUser", userPayload).subscribe(data => {
        this.router.navigate(['admin/users']);
      });
    }

  }
  async delete() {
    let ans = confirm("Are you sure you want to delete this user?");
    if(ans) {
      await this.service.ExecuteAPI_Delete<boolean>("Admin/DeleteUser/" + this.userIdParam).subscribe(success =>
        {
          if(success) {
            alert("User deleted successfully.");
            this.router.navigate(['admin/users']);
          }
          else {
            alert("Cannot delete user. Not existing.");
          }
        }
      );
    }
  }
  close() {
    this.router.navigate(['admin/users']);
  }

  initValue(user: User_Model): void {
    this.userModel = user;

    if (this.userModel) {
      // Reset the form back to pristine
      this.userForm.reset();

      // Update the data on the form
      this.userForm.patchValue({
        id: this.userModel.id,
        firstName: this.userModel.firstName,
        lastName: this.userModel.lastName,
        emailAddress: this.userModel.emailAddress,
        userName: this.userModel.userName,
        password: this.userModel.password
      });
    }
  }
}
