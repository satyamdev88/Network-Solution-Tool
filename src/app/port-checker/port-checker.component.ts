import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortCheckerService } from '../../services/port-checker.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ToolPageSmComponent } from '../tool-page-sm/tool-page-sm.component';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-port-checker',
  imports: [
    FormsModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ToolPageSmComponent,
  ],
  templateUrl: './port-checker.component.html',
  styleUrl: './port-checker.component.scss',
})
export class PortCheckerComponent {
  ip: any;
  port: any;
  parts: any;
  isVisible: boolean = false;
  portTcp: any;
  portUdp: any;
  tcpResult: string = '';
  udpResult: string = '';
  statusTCP: any;
  statusUDP: any;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.isVisible = false;
  }

  constructor(private checker: PortCheckerService, private http: HttpClient) {}

  get isFormInvalid(): boolean {
  return !this.ip || !this.port || (!this.portTcp && !this.portUdp);
}

  hostValidate() {
    this.parts = this.ip.split('.');

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
      if (this.port > 65535) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Port',
          text: 'Please enter correct port number',
        });
        return;
      }
      this.checkPorts();
    }
  }

  checkPorts() {
    if (this.portTcp && this.portUdp) {
      this.checkTCP();
      this.checkUDP();
    } else if (this.portTcp) {
      this.checkTCP();
    } else if (this.portUdp) {
      this.checkUDP();
    } else {
      return;
    }
  }

  checkTCP() {
    this.checker.checkPort(this.ip, this.port, 'tcp').subscribe({
      next: (res) => {
        this.isLoading = true;
        if (this.portTcp) {
          this.statusTCP = res.status;
          this.isVisible = true;
          this.tcpResult = `TCP: Port ${res.port} is ${res.status}`;
          this.isLoading = false
        } else {
          this.statusUDP = '';
          this.udpResult = '';
          this.statusTCP = res.status;
          this.isVisible = true;
          this.tcpResult = `TCP: Port ${res.port} is ${res.status}`;
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          text: err,
        });
        return;
      },
    });
  }

  checkUDP() {
    this.checker.checkPort(this.ip, this.port, 'udp').subscribe({
      next: (res) => {
        if (this.portUdp) {
          this.statusUDP = res.status;
          this.isVisible = true;
          this.udpResult = `UDP: Port ${res.port} is ${res.status}`;
        } else {
          this.statusTCP = '';
          this.tcpResult = '';
          this.statusUDP = res.status;
          this.isVisible = true;
          this.udpResult = `UDP: Port ${res.port} is ${res.status}`;
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          text: err,
        });
        return;
      },
    });
  }
  checkBoth() {
    this.checker.checkPortBoth(this.ip, this.port).subscribe({
      next: ([tcp, udp]) => {
        this.tcpResult = `TCP: Port ${tcp.port} is ${tcp.status}`;
        this.udpResult = `UDP: Port ${udp.port} is ${udp.status}`;
      },
      error: () => {
        this.tcpResult = 'TCP check failed';
        this.udpResult = 'UDP check failed';
      },
    });
  }
}
