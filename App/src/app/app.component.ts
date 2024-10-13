import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorService } from './shared/Services/error.service';
import { ErrorModalComponent } from './shared/views/modal/error-modal/error-modal.component';
import { SucessService } from './shared/Services/sucess.service';
import { SucessModalComponent } from './shared/views/modal/sucess-modal/sucess-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, ErrorModalComponent, SucessModalComponent],
})
export class AppComponent {
  title = 'Tarefas';
  private errorService = inject(ErrorService);
  private sucessService = inject(SucessService);

  error = this.errorService.error;
  sucess = this.sucessService.sucess;
}
