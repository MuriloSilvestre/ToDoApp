import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'venda-filter',
  templateUrl: './venda-filter.component.html',
  styleUrls: ['./venda-filter.component.scss'],
})
export class VendaFilterComponent implements OnInit {
  public open: boolean = false;
  public user: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  public openMenu(): void {
    this.open = !this.open;
  }
}
