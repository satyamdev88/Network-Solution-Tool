import { Component } from '@angular/core';
import { TraceRouteService } from '../../services/trace-route.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trace-route',
  imports: [FormsModule, CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './trace-route.component.html',
  styleUrl: './trace-route.component.scss',
})
export class TraceRouteComponent {
  ipAddress = '';
  traceResult = '';

  constructor(private tracerouteService: TraceRouteService) {}

  trace() {
    this.traceResult = '\nPlease wait.\nTracing...';
    this.tracerouteService.runTraceroute(this.ipAddress).subscribe({
      next: (result) => {
        if (
          this.traceResult ===
          'Failed to start traceroute: spawn traceroute ENOENT'
        ) {
          this.traceResult = result;
        } else {
          this.traceResult = '';
          Swal.fire({
            icon: 'error',
            title: 'Traceroute Error',
            text: result,
          });
        }
      },
      error: (err) => {
        this.traceResult = 'Traceroute failed or server error.';

        Swal.fire({
          icon: 'error',
          title: 'Traceroute Error',
          text: 'Failed to start traceroute. Make sure traceroute is installed on the server.',
        });
      },
    });
  }
}
