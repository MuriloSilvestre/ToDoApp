import { User } from '../entities/user.entity';
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
    private Token: TokenstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.inicializaForm();
  }

  ForgotPassword() {
    this.router.navigate(['/forgotpassword']);
  }

  ngOnSubmit(): void {
    const { nome_usuario, senha } = this.authService.formularioBasico.value;
    this.authService.login(nome_usuario, senha).subscribe();

    this.router.navigate(['/home']);
  }
}
