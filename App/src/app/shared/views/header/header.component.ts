import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { TokenstorageService } from '../../../auth/service/tokenstorage.service';
import { User } from '../../../auth/entities/user.entity';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
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
