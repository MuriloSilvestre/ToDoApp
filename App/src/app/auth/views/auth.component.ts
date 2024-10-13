import { User } from '../../user/entities/user.entity';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { TokenstorageService } from '../service/tokenstorage.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [FormsModule, ReactiveFormsModule],
})
export class AuthComponent implements OnInit {
  public isSuccessful: boolean = false;
  public isSignUpFailed: boolean = false;
  public errorMessage: string = '';
  public user!: User;

  constructor(
    public authService: AuthenticationService,
    private token: TokenstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.inicializaForm();
  }

  ForgotPassword() {
    this.router.navigate(['/forgotpassword']);
  }

  ngOnSubmit(): void {
    this.authService.login().subscribe({
      next: (resData) => {
        this.router.navigate(['/home']);
        this.token.saveUser(resData);
      },
      error: (error: Error) => {
        this.authService.error.set(error.message);
        this.authService.isFetching.set(false);
      },
      complete: () => {
        this.authService.isFetching.set(false);
      },
    });
  }
}
