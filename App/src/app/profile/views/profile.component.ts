import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenstorageService } from '../../auth/service/tokenstorage.service';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [RouterModule],
})
export class ProfileComponent implements OnInit {
  public user!: User;
  public token: any;

  constructor(
    public router: Router,
    private Token: TokenstorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.token = this.Token.getUser();
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
  }
  public clean(): void {
    this.userService.reset();
  }
}
