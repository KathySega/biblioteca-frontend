import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface ModalConfig {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'danger' | 'warning' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private openSubject = new Subject<ModalConfig>();
  private responseSubject = new Subject<boolean>();

  open$: Observable<ModalConfig> = this.openSubject.asObservable();

  confirm(config: ModalConfig): Observable<boolean> {
    this.openSubject.next(config);
    return new Observable(observer => {
      const sub = this.responseSubject.subscribe(result => {
        observer.next(result);
        observer.complete();
        sub.unsubscribe();
      });
    });
  }

  respond(result: boolean): void {
    this.responseSubject.next(result);
  }
}
