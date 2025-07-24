import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { PingCheckerService } from '../../services/ping-checker.service';
import Swal from 'sweetalert2';
import { ToolPageSmComponent } from "../tool-page-sm/tool-page-sm.component";

@Component({
  selector: 'app-ping-checker',
  imports: [FooterComponent, HeaderComponent, FormsModule, CommonModule, ToolPageSmComponent],
  templateUrl: './ping-checker.component.html',
  styleUrl: './ping-checker.component.scss',
})
export class PingCheckerComponent {
  host = '';
  output: string[] = [];
  intervalId: any;
  times: number[] = [];
  sent = 0;
  received = 0;
  isVisible:boolean=false;

  constructor(private pingService: PingCheckerService) {}

  startPinging() {
    if (this.intervalId) return; // already running

    this.clearStats();
    this.output.push(`Pinging ${this.host} with 32 bytes of data:`);

    this.intervalId = setInterval(() => {
      this.sent++;
      this.pingService.pingOnce(this.host).subscribe({
        next: (res) => {
          try {
            if (res.success) {
              this.received++;
              this.times.push(res.time);
              this.output.push(
                `Reply from ${res.host}: bytes=32 time=${res.time}ms TTL=116`
              );
            } else {
              this.output.push(`Request timed out.`);
            }
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Ping failed, ',
              text: 'An error occurred while pinging the host.',
            });
          }
        },
        error: (err) => {
          // Optional: handle observable errors here
          Swal.fire({
            icon: 'error',
            title: 'Ping failed ',
            text: 'An error occurred while pinging the host.',
          });
            this.stopPinging()
        },
      });
    }, 1000);
  }

  stopPinging() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.appendPingStatistics();
    }
  }

  clearOutput() {
    this.output = [];
    this.clearStats();
  }

  clearStats() {
    this.sent = 0;
    this.received = 0;
    this.times = [];
  }

  appendPingStatistics() {
    const lost = this.sent - this.received;
    const lossPercent = ((lost / this.sent) * 100).toFixed(0);

    let min = 'N/A',
      max = 'N/A',
      avg = 'N/A';

    if (this.times.length > 0) {
      min = Math.min(...this.times).toFixed(0);
      max = Math.max(...this.times).toFixed(0);
      avg = (this.times.reduce((a, b) => a + b, 0) / this.times.length).toFixed(
        1
      );
    }

    this.output.push(`\nPing statistics for ${this.host}:
    Packets: Sent = ${this.sent}, Received = ${this.received}, Lost = ${lost} (${lossPercent}% loss),
    Approximate round trip times in milli-seconds:
    Minimum = ${min}ms, Maximum = ${max}ms, Average = ${avg}ms`);
  }

  ngOnDestroy(): void {
    this.stopPinging(); // ensure interval is cleared
  }
}
