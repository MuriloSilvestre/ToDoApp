import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenstorageService } from '../../auth/service/tokenstorage.service';
import { User } from '../../auth/entities/user.entity';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [RouterModule],
})
export class ProfileComponent implements OnInit {
  public user!: User;

  constructor(public router: Router, private Token: TokenstorageService) {}

  ngOnInit(): void {
    this.user = this.Token.getUser();
  }
}
