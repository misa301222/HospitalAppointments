import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { AuthService } from 'src/app/Core/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInOnEnterAnimation()]
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  })

  isLoggedIn: boolean = false;

  ngOnInit(): void {
  }

  async onSubmit() {
    let email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;

    console.log(email);
    console.log(password);


    await this.authService.loginEmailUser(email, password)
      .then((res) => {
        console.log(res);
        this.showSuccessLoginSwal();
      }).catch(err => console.log('err', err.message));


    // await this.firebaseService.signIn(email, password).then(response => {
    //   if (this.firebaseService.isLoggedIn) {
    //     console.log('Logged in!');
    //   }
    // }).catch(err => {
    //   console.log(err);
    // });
  }

  showSuccessLoginSwal() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Logged in Successfully!',
      showConfirmButton: false,
      timer: 1000
    }).then(res => {
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      this.onLoginRedirect();
    });
  }

  onLogout() {
    this.authService.logoutUser();
  }

  onLoginRedirect(): void {
    this.router.navigate(['home']);
  }

}
