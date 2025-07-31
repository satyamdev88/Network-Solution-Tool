import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { PingCheckerService } from '../../services/ping-checker.service';
import Swal from 'sweetalert2';
import { ToolPageSmComponent } from '../tool-page-sm/tool-page-sm.component';

@Component({
  selector: 'app-ping-checker',
  imports: [
    FooterComponent,
    HeaderComponent,
    FormsModule,
    CommonModule,
    ToolPageSmComponent,
  ],
  templateUrl: './ping-checker.component.html',
  styleUrl: './ping-checker.component.scss',
})
export class PingCheckerComponent {
  host = '';
  output: string[] = [];
  parts: any;
  isLoading: boolean = false;
  isVisible: boolean = false;
  result = '';
  isPingVisible: boolean = false;
  pingType = 'once';
  pingSubscription: any;
  buffer: string = '';
  pingSub: Subscription | undefined;
  clientId: string = crypto.randomUUID();
  eventSource: EventSource | null = null;

  constructor(
    private pingService: PingCheckerService,
    private cd: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  scrollToBottom() {
    setTimeout(() => {
      if (this.scrollContainer?.nativeElement) {
        this.scrollContainer.nativeElement.scrollTop =
          this.scrollContainer.nativeElement.scrollHeight;
      }
    }, 0);
  }

  hostValidate() {
    this.parts = this.host.split('.');

    if (this.parts.length !== 4) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Host',
        text: 'Must have exactly 4 octets',
      });
    } else if (this.parts.length === 4) {
      for (const part of this.parts) {
        if (part < 0 || part > 255) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Host',
            text: 'Please enter correct IP Address',
          });
          return;
        }
      }
      if (this.pingType === 'once') {
        this.startPingingOnce();
      } else {
        this.startPingingContinuous();
      }
    }
  }

  startPingingOnce() {
    this.isVisible = true;
    this.isLoading = true;
    this.isPingVisible = true;
    this.result = 'Pinging...';
    this.output = [];
    this.pingService.ping(this.host).subscribe({
      next: (res) => {
        if (res) {
          this.output.push(res);
          this.isLoading = false;
          this.isPingVisible = false;
        } else {
          this.output.push(`Request timed out.`);
        }
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Ping failed ',
          text: 'An error occurred while pinging the host.',
        });
        return;
      },
    });
  }

  startPingingContinuous() {
    this.isVisible = true;
    this.isPingVisible = true;
    this.isLoading = true;
    this.output = [];

    this.eventSource = new EventSource(
      `http://localhost:3000/ping-stream?ip=${this.host}&id=${this.clientId}`
    );
    this.eventSource.onmessage = (event) => {
      this.output.push(event.data);
      this.cd.detectChanges();
      this.scrollToBottom();
    };
    this.eventSource.onerror = (err) => {
      console.log('EventSource error:', err);
      this.stopPinging();
    };
  }
  stopPinging() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.http
        .post(
          'http://localhost:3000/ping-stop',
          { id: this.clientId },
          { responseType: 'text' }
        )
        .subscribe({
          next: (stats) => {
            this.output.push('\n' + stats);
            this.cd.detectChanges();
            this.scrollToBottom();
            this.isLoading = false;
          },
          error: (err) => {
            if (err) {
              this.isLoading = false;
            }
            Swal.fire({
              icon: 'error',
              title: 'Ping failed ',
              text: 'An error occurred while pinging the host.',
            });
            this.isLoading = false;
            this.cd.detectChanges();
            return;
          },
        });
    }
  }
  clearOutput() {
    this.host = '';
    this.output = [];
  }
}
