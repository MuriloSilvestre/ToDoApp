import { User } from '../../../user/entities/user.entity';
import { Component, OnInit } from '@angular/core';
import { TokenstorageService } from '../../../auth/service/tokenstorage.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../user/services/user.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class DetailComponent implements OnInit {
  public user!: User;
  public token: any;
  public mudarSenha: boolean = false;

  constructor(
    public router: Router,
    private Token: TokenstorageService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.token = this.Token.getUser();

    // Verifica se o token e userName existem antes de tentar acessar
    if (this.token && this.token.userName) {
      this.userService.initializeFormPassword();

      // Chama o serviço para buscar o usuário pelo e-mail (userName)
      this.userService.getOneByEmail(this.token.userName).subscribe({
        next: (resData) => {
          this.user = resData;
        },
        error: (error: Error) => {
          this.clean();
          this.userService.error.set(error.message);
          this.userService.isFetching.set(false);
        },
        complete: () => {
          this.userService.isFetching.set(false);
        },
      });
    } else {
      // Se o token ou o userName forem inválidos, lidar com isso
      console.error('Token ou userName não encontrado.');
      this.clean();
      this.userService.error.set('Token ou userName não encontrado.');
    }
  }

  public clean(): void {
    this.userService.reset();
  }

  public salvarNovaSenha(): void {
    if (this.userService.passwordForm.valid) {
      const currentPassword =
        this.userService.passwordForm.get('password')?.value;
      const newPassword =
        this.userService.passwordForm.get('newPassword')?.value;

      this.user.password = currentPassword;
      this.userService.fillFormPassword(this.user, newPassword);

      this.userService.submit(this.user.id);

      this.userService.passwordForm.reset();
    }
  }
}
