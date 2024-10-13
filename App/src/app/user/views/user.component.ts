import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class UserComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}
}
