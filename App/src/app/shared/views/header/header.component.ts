import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TokenstorageService } from '../../../auth/service/tokenstorage.service';
import { User } from '../../../auth/entities/user.entity';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public user!: User;

  constructor(
    private location: Location,
    public router: Router,
    private Token: TokenstorageService
  ) {}

  ngOnInit(): void {
    this.user = this.Token.getUser();
    console.log(this.user.Name);
  }

  back(): void {
    this.location.back();
  }
}
