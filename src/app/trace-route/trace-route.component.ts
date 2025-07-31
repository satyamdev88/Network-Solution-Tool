import { ChangeDetectorRef, Component } from '@angular/core';
import { TraceRouteService } from '../../services/trace-route.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ToolPageSmComponent } from '../tool-page-sm/tool-page-sm.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trace-route',
  imports: [
    FormsModule,
    CommonModule,
    FooterComponent,
    HeaderComponent,
    ToolPageSmComponent,
  ],
  templateUrl: './trace-route.component.html',
  styleUrl: './trace-route.component.scss',
})
export class TraceRouteComponent {
  ipAddress = '';
  // traceResult = '';
  traceResult: string[] = [];
  parts: any;
  isVisible: boolean = false;
  isLoading: boolean = false;
  eventSource: EventSource | null = null;
  buffer: string[] = [];

  constructor(
    private tracerouteService: TraceRouteService,
    private cd: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  get isFormInvalid(): boolean {
    return !this.ipAddress;
  }

  hostValidate() {
    this.parts = this.ipAddress.split('.');

    if (this.parts.length !== 4) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid IP',
        text: 'Must have exactly 4 octets',
      });
    } else if (this.parts.length === 4) {
      for (const part of this.parts) {
        if (part < 0 || part > 255) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid IP',
            text: 'Please enter correct IP Address',
          });
          return;
        }
      }
      this.trace();
    }
  }

  trace() {
    this.traceResult = [];
    this.buffer = [];
    this.isVisible = true;
    this.isLoading = true;

    try {
      this.eventSource = this.tracerouteService.runTracerouteStream(
        this.ipAddress
      );
      this.eventSource.onmessage = (event) => {
        const line = event.data;

        // Detect hop start (line that begins with a number and a space)
        if (/^\d+\s*$/.test(line.trim())) {
          if (this.buffer.length > 0) {
            this.traceResult.push(this.buffer.join(' '));
            this.buffer = [];
          }
        }

        this.buffer.push(line.trim());

        if (line.includes('Traceroute completed')) {
          if (this.buffer.length > 0) {
            this.traceResult.push(this.buffer.join(' '));
            this.buffer = [];
          }
          this.eventSource?.close();
          this.isLoading = false;
        }

        this.cd.detectChanges();
      };

      this.eventSource.onerror = () => {
        this.isLoading = false;
        this.eventSource?.close();
      };
    } catch {
      this.isLoading = false;
      this.eventSource?.close();
      Swal.fire({
        icon: 'error',
        title: 'Trace incomplete',
        text: 'Something happend with server',
      });
      return;
    }
  }
  stopTrace() {
    this.isLoading = false;
    this.eventSource?.close();

    this.http.get('http://localhost:3000/stop-traceroute').subscribe(() => {
      console.log('Traceroute stopped');
    });
  }
}
