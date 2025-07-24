import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSenderService {
  private cardKey = 'cardName';

  private cardNameSource = new BehaviorSubject<string>(''); // Initial value
  cardName$ = this.cardNameSource.asObservable(); // Exposed observable

  constructor() {
    const savedCard = localStorage.getItem(this.cardKey);
    if (savedCard) {
      this.cardNameSource.next(savedCard); // ✅ Restore on reload
    }
  }

  sendCardName(name: string) {
    localStorage.setItem(this.cardKey, name);
    this.cardNameSource.next(name); // ✅ Notify subscribers
  }

  getCardName(): string | null {
    return localStorage.getItem(this.cardKey);
  }
}
