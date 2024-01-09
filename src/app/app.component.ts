import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppApiServiceService } from './app-api-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  title = "angular-demo-bitbucket";
  socialId: number = 0;
  firstName: string = '';
  salary: number = 0;
  country: string = '';
  employeeList: any[] = [];

  constructor(public appApiService: AppApiServiceService) {}

  getEmployees() {
    this.appApiService.getEmployees().subscribe(
      (employees: any) => {
        this.employeeList = employees.items;
      },
      (error) => {
        console.error('Error al obtener la lista de empleados:', error);
      }
    );
  }

  submitForm(allEmployees: boolean, idEmployee: number) {
    if (allEmployees) {
      this.getEmployees();
    } else {
      this.appApiService.getEmployee(1).subscribe(
        (employee: any) => {
          this.socialId = employee.data.personalInfo.socialId;
          this.firstName = employee.data.personalInfo.firstName;
          this.salary = employee.data.payrollInfo.salary;
          this.country = employee.data.payrollInfo.country;
        },
        (error) => {
          console.error('Error al obtener la lista de empleados:', error);
        }
      );
    }
  }

  submitPost() {
    const employee = {
      personalInfo: {
        socialId: this.socialId,
        firstName: this.firstName,
      },
      payrollInfo: {
        salary: this.salary,
        country: this.country,
      },
    };

    this.appApiService.postEmployee(employee).subscribe(
      () => {
        this.getEmployees();
      },
      (error) => {
        console.error('Error al agregar un empleado:', error);
      }
    );
  }

  submitPut() {
    const employee = {
      personalInfo: {
        socialId: this.socialId,
        firstName: this.firstName,
      },
      payrollInfo: {
        salary: this.salary,
        country: this.country,
      },
    };

    this.appApiService.putEmployee(employee, 1).subscribe(
      () => {
        this.getEmployees();
      },
      (error) => {
        console.error('Error al agregar un empleado:', error);
      }
    );
  }

  ngOnInit() {
    this.getEmployees();
  }
}
