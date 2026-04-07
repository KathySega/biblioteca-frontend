import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalConfig, ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent implements OnInit, OnDestroy {
  visible = false;
  config: ModalConfig = { title: '', message: '' };
  private sub!: Subscription;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.sub = this.modalService.open$.subscribe(config => {
      this.config = {
        confirmLabel: 'Confirmar',
        cancelLabel: 'Cancelar',
        type: 'danger',
        ...config
      };
      this.visible = true;
    });
  }

  confirm(): void {
    this.visible = false;
    this.modalService.respond(true);
  }

  cancel(): void {
    this.visible = false;
    this.modalService.respond(false);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
