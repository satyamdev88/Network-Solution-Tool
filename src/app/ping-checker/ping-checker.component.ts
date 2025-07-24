import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private pingService: PingCheckerService) {}

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
    this.pingService.ping(this.host, this.pingType).subscribe({
      next: (res) => {
        if (res) {
          this.output.push(res);
          console.log(res);
          this.isLoading = false;
          this.isPingVisible = false;
        } else {
          this.output.push(`Request timed out.`);
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Ping failed ',
          text: 'An error occurred while pinging the host.',
        });
        this.stopPinging();
      },
    });
  }

  startPingingContinuous() {
    this.isVisible = true;
    this.isPingVisible = true;
    this.result = 'Work is in progress\nPlease use Ping once';

  }

  stopPinging() {
    this.isLoading = false;
    this.output = [];
    console.log(this.host);
  }

  clearOutput() {
    this.host = '';
    console.log(this.host);
  }

  // output: string[] = [];
  // intervalId: any;
  // times: number[] = [];
  // sent = 0;
  // received = 0;
  // isVisible:boolean=false;

  // constructor(private pingService: PingCheckerService) {}

  // startPinging() {
  //   if (this.intervalId) return; // already running

  //   this.clearStats();
  //   this.output.push(`Pinging ${this.host} with 32 bytes of data:`);

  //   this.intervalId = setInterval(() => {
  //     this.sent++;
  //     this.pingService.pingOnce(this.host).subscribe({
  //       next: (res) => {
  //         try {
  //           if (res.success) {
  //             this.received++;
  //             this.times.push(res.time);
  //             this.output.push(
  //               `Reply from ${res.host}: bytes=32 time=${res.time}ms TTL=116`
  //             );
  //           } else {
  //             this.output.push(`Request timed out.`);
  //           }
  //         } catch (error) {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Ping failed, ',
  //             text: 'An error occurred while pinging the host.',
  //           });
  //         }
  //       },
  //       error: (err) => {
  //         // Optional: handle observable errors here
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Ping failed ',
  //           text: 'An error occurred while pinging the host.',
  //         });
  //           this.stopPinging()
  //       },
  //     });
  //   }, 1000);
  // }

  // stopPinging() {
  //   if (this.intervalId) {
  //     clearInterval(this.intervalId);
  //     this.intervalId = null;
  //     this.appendPingStatistics();
  //   }
  // }

  // clearOutput() {
  //   this.output = [];
  //   this.clearStats();
  // }

  // clearStats() {
  //   this.sent = 0;
  //   this.received = 0;
  //   this.times = [];
  // }

  // appendPingStatistics() {
  //   const lost = this.sent - this.received;
  //   const lossPercent = ((lost / this.sent) * 100).toFixed(0);

  //   let min = 'N/A',
  //     max = 'N/A',
  //     avg = 'N/A';

  //   if (this.times.length > 0) {
  //     min = Math.min(...this.times).toFixed(0);
  //     max = Math.max(...this.times).toFixed(0);
  //     avg = (this.times.reduce((a, b) => a + b, 0) / this.times.length).toFixed(
  //       1
  //     );
  //   }

  //   this.output.push(`\nPing statistics for ${this.host}:
  //   Packets: Sent = ${this.sent}, Received = ${this.received}, Lost = ${lost} (${lossPercent}% loss),
  //   Approximate round trip times in milli-seconds:
  //   Minimum = ${min}ms, Maximum = ${max}ms, Average = ${avg}ms`);
  // }

  // ngOnDestroy(): void {
  //   this.stopPinging(); // ensure interval is cleared
  // }
}
