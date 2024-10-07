import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'estoque-filter',
  templateUrl: './estoque-filter.component.html',
  styleUrls: ['./estoque-filter.component.scss'],
})
export class EstoqueFilterComponent implements OnInit {
  public open: boolean = false;
  public user: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  public openMenu(): void {
    this.open = !this.open;
  }
}
