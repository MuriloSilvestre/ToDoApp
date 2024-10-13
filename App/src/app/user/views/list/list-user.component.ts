import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user.entity';

@Component({
  selector: 'app-list-user',
  standalone: true,
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ListUserComponent implements OnInit {
  public users!: User[];
  public filteredUsers: User[] = [];
  public paginatedUsers: User[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 12;
  public totalPages: number = 0;

  public selectedName: string = '';

  constructor(
    private router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadElements();
  }

  private loadElements() {
    this.userService.list().subscribe({
      next: (resData) => {
        this.users = resData;
        this.filteredUsers = this.users;
        this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
        this.updatePaginatedUsers();
      },
      error: (error: Error) => {
        this.userService.error.set(error.message);
        this.userService.isFetching.set(false);
      },
      complete: () => {
        this.userService.isFetching.set(false);
      },
    });
  }

  public remove(id: number) {
    this.userService.remove(id).subscribe({
      next: () => {},
      error: (error: Error) => {
        this.loadElements();
        this.userService.error.set(error.message);
        this.userService.isFetching.set(false);
      },
      complete: () => {
        this.loadElements();
        this.resetFilters();
        this.userService.isFetching.set(false);
      },
    });
  }

  public edit(id: number): void {
    this.router.navigate(['/user/new-user', id]);
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter((user: User) => {
      let matchesName = true;

      // Filtrar por nome do usuário
      if (this.selectedName) {
        matchesName = user.name
          .toLowerCase()
          .includes(this.selectedName.toLowerCase());
      }

      return matchesName;
    });

    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedUsers();
  }

  resetFilters(): void {
    this.selectedName = '';
    this.filteredUsers = this.users;
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.updatePaginatedUsers();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }

  updatePaginatedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }
}
