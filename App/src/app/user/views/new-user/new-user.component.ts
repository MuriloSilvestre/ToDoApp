import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-user',
  standalone: true,
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class NewUserComponent implements OnInit {
  public userId!: number;
  IsCompleted: string = '';

  constructor(
    private location: Location,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.userId = +id;
        this.loadUser(this.userId);
      } else {
        this.userService.initializeForm();
      }
    });
  }

  private loadUser(id: number) {
    this.userService.getOneById(id).subscribe({
      next: (resData) => {
        this.userService.fillForm(resData);
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

  public ngOnSubmit() {
    this.userService.basicForm.patchValue({
      IsCompleted: this.IsCompleted == 'true' ? true : false,
      ...this.userService.basicForm,
    });
    const controls = this.userService.basicForm.controls;
    if (this.userService.basicForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.userService.submit(this.userId);
  }

  onCancel() {
    this.userService.basicForm.reset();

    this.router.navigate(['/user']);
  }
}
