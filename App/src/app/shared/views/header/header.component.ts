import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { TokenstorageService } from '../../../auth/service/tokenstorage.service';
import { User } from '../../../user/entities/user.entity';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class HeaderComponent implements OnInit {
  public user: any;

  constructor(
    private location: Location,
    public router: Router,
    private Token: TokenstorageService
  ) {}

  ngOnInit(): void {
    this.user = this.Token.getUser();
  }

  logout() {
    this.Token.signOut();
    this.user = this.Token.getUser();
  }

  back(): void {
    this.location.back();
  }
}
