import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../entities/client.entity';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss'],
})
export class ListClientComponent implements OnInit {
  public clients!: Client[];

  constructor(
    public router: Router,
    public readonly clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.loadElements();
  }

  private loadElements() {
    this.clientService.list().subscribe((res) => {
      if (res) {
        this.clients = res;
      }
    });
  }

  public remove(id: number) {
    this.clientService.remove(id).subscribe((res) => {
      if (res) {
        this.loadElements();
      }
    });
  }

  public edit(id: number): void {
    this.router.navigate(['/client/novo', id]);
  }
}
