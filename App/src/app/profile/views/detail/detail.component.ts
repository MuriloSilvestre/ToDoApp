import { User } from '../../../auth/entities/user.entity';
import { Component, OnInit } from '@angular/core';
import { TokenstorageService } from '../../../auth/service/tokenstorage.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public user!: User;

  public mudarSenha: boolean = false;

  constructor(private Token: TokenstorageService) {}

  ngOnInit(): void {
    this.user = this.Token.getUser();
  }
}
