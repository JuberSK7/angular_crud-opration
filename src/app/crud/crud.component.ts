import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeModule } from './crud.dashboard.module';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeModule = new EmployeModule();
  employeeData!: any;
  showAddbtn!: boolean;
  showUpdtbtn!: boolean;
  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      mobile: [''],
    });
    this.getAllEmployee();
  }

  hideButtons() {
    this.formValue.reset();
    this.showAddbtn = true;
    this.showUpdtbtn = false;
  }
  postEmplyeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.password = this.formValue.value.password;
    this.employeeModelObj.mobile = this.formValue.value.mobile;

    this.api.postEmploye(this.employeeModelObj).subscribe((res) => {
      console.log(res);
      alert('Employee Add Successfull !');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    });
  }

  getAllEmployee() {
    this.api.getEmploye().subscribe((res) => {
      this.employeeData = res;
    });
  }

  getDeleteEmployee(employe: any) {
    this.api.deleteEmploye(employe.id).subscribe((res) => {
      alert('Employee Deleted Successful !');
      this.getAllEmployee();
    });
  }

  getEditEmployee(employe: any) {
    this.showAddbtn = false;
    this.showUpdtbtn = true;
    this.employeeModelObj.id = employe.id;
    this.formValue.controls['firstName'].setValue(employe.firstName);
    this.formValue.controls['lastName'].setValue(employe.lastName);
    this.formValue.controls['email'].setValue(employe.email);
    this.formValue.controls['password'].setValue(employe.password);
    this.formValue.controls['mobile'].setValue(employe.mobile);
  }

  updateEmplyeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.password = this.formValue.value.password;
    this.employeeModelObj.mobile = this.formValue.value.mobile;

    this.api
      .updateEmploye(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe((res) => {
        alert('Employee Details Updated !');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      });
  }
}
