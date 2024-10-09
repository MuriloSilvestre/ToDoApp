import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class TaskComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}
}
