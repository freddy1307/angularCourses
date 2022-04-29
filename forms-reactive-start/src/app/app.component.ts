import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  invalidUsernames: string[] = ['Test', 'Pepe'];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.validateInvalidUsernames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.validateInvalidEmailsPromise),
      }),
      gender: new FormControl('male', Validators.required),
      hobbies: new FormArray([])
    })
  }

  onSubmit() {
    console.log(this.signupForm)
  }

  getHobbiesControls(){
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  addHobbies(){
    const control =  new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  validateInvalidUsernames(control: FormControl): {[s: string]: boolean} {
    if (this.invalidUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true}
    }
    return null
  }

  validateInvalidEmailsPromise(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        }
        resolve(null)
      }, 1000)
    })
    return promise;
  }
}
