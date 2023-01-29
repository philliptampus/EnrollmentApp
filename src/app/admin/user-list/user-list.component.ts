import { Component } from '@angular/core';
import { User_Model } from 'src/app/shared/models';
import { SystemService } from 'src/app/shared/SystemService';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  public dataSource: Array<User_Model> = [];
  displayedColumns: string[] = ['ID', 'Name', 'Email Address', 'User Name'];
  constructor(public service: SystemService) {
    this.getUsers();
  }

  async getUsers() {
    await this.service.ExecuteAPI_Get<User_Model>("Admin").subscribe(data => this.setData(data));
  }

  setData(data: any) {
    this.dataSource = data;
  }
}


