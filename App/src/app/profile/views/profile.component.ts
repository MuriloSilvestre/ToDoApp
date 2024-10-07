import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenstorageService } from '../../auth/service/tokenstorage.service';
import { User } from '../../auth/entities/user.entity';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public user!: User;

  constructor(public router: Router, private Token: TokenstorageService) {}

  ngOnInit(): void {
    this.user = this.Token.getUser();
  }
}
