import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'conta-filter',
  templateUrl: './conta-filter.component.html',
  styleUrls: ['./conta-filter.component.scss'],
})
export class ContaFilterComponent implements OnInit {
  public open: boolean = false;
  public user: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  public openMenu(): void {
    this.open = !this.open;
  }
}
