import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToPayService } from '../../../services/to-pay.service';
import { ToPay } from '../../../entities/to-pay.entity';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListToPayComponent implements OnInit {
  public toPay!: ToPay[];
  public date!: any;
  constructor(
    public router: Router,
    public readonly toPayService: ToPayService
  ) {}

  ngOnInit(): void {
    this.loadElements();
  }

  private loadElements() {
    this.toPayService.list().subscribe((res) => {
      if (res) {
        this.toPay = res;
      }
    });
    this.date = Date.now();
  }

  public remove(id: number) {
    this.toPayService.remove(id).subscribe((res) => {
      if (res) {
        this.loadElements();
      }
    });
  }

  public edit(id: number): void {
    this.router.navigate(['/fornecedor/novo', id]);
  }
}
