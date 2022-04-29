import {Component, ViewChild} from '@angular/core';
import {Form, NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  @ViewChild('f') formRef: NgForm;
  defaultQuestion: string = 'pet';
  answer: string = '';
  genders: string[] = ['male', 'female']
  formValues = {
    userData: {
      username: '',
      email: ''
    },
    secret: '',
    answer: '',
    gender: ''
  }
  submitted = false;

  suggestUserName() {
    const username = 'Superuser';
    /*this.formRef.setValue({ //This function clean all the fields
      userData: {
        username,
        email: ''
      },
      secret: 'pet',
      answer: '',
      gender: 'male'
    })*/

    this.formRef.form.patchValue({
      userData: {
        username
      }
    });
  }

  /*onSubmit(form: Form) {
    console.log(this.formRef)
    console.log(form)
  }*/

  onSubmit() {
    const { userData: { username, email }, secret, answer, gender } = this.formRef.value;
    this.formValues = { userData: { username, email }, secret, answer, gender };
    this.submitted = true;
  }
}
