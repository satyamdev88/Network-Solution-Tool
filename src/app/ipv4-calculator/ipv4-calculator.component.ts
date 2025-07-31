import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { SunbetValue } from '../../data/ipv4';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ToolPageSmComponent } from '../tool-page-sm/tool-page-sm.component';

@Component({
  selector: 'app-ipv4-calculator',
  imports: [
    CommonModule,
    NgFor,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    ToolPageSmComponent,
  ],
  templateUrl: './ipv4-calculator.component.html',
  styleUrl: './ipv4-calculator.component.scss',
})
export class Ipv4CalculatorComponent {
  subnetValue = SunbetValue;
  selectedSubnet: string = '';
  IPAddress: string = '';
  isLoading = false;
  isVisible: boolean = false;
  myDict: { [key: string]: any } = {};
  parts: any = '';
  cidrValue: any;
  identifiedSubnet: string = '';
  binarySubnetMask: any = [];
  BroadCastIP: any;
  identifieCIDRValue: any;
  NetworkIP: any;
  totalHost: any;
  usableHost: any;
  wildmaskCard: any;
  IPType: any;
  IPClass: any;
  totalIP: { first: string; last: string } = { first: '', last: '' };


  ngOnInit(): void {
   
  }

  Calculate() {
    this.parts = this.IPAddress.split('.');

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
            title: 'Invalid IP or Subnet format',
            text: 'Please enter correct IP Address and try again',
          });
          return;
        }
      }
      this.calculateValues();
    }
  }
  calculateValues() {
    const value = this.selectedSubnet.split('/');
    this.identifiedSubnet = value[0];
    this.cidrValue = value[1];

    this.getBinarySubnetMask();
    this.getBroadcastIP();
    this.identifieCIDRValue = '/' + this.cidrValue;
    this.IPAddress;
    this.getIPClass();
    this.isPrivateIP();
    this.getNetworkIP();
    this.identifiedSubnet;
    this.getUsableTotalHosts();
    this.totalIP = this.getHostRange(this.IPAddress, this.identifiedSubnet);
    this.getWildcardMask();

    Object.assign(this.myDict, {
      'IP Address': this.IPAddress.trim(),
      'Network IP': this.NetworkIP.trim(),
      'Usable Host': `${this.totalIP.first} - ${this.totalIP.last}`,
      'Broadcast Address': this.BroadCastIP,
      'Total Number of Hosts': this.totalHost,
      'Number of Usable Hosts': this.usableHost,
      'Subnet Mask': this.identifiedSubnet.trim(),
      'Wildcard Mask': this.wildmaskCard.trim(),
      'Binary Subnet Mask': this.binarySubnetMask,
      CIDR: this.identifieCIDRValue,
      'IP Class': this.IPClass,
      'IP Type': this.IPType,
      'Short ': this.IPAddress + ' ' + this.identifieCIDRValue,
    });
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.isVisible = true;
    }, 1000);
  }

  getBinarySubnetMask() {
    for (let i = 0; i <= this.cidrValue; i++) {
      if (Number(this.cidrValue.trim()) === SunbetValue[i].Option) {
        this.binarySubnetMask = this.subnetValue[i].BinaryValue;
        return;
      }
    }
  }
  getBroadcastIP() {
    // Broadcast IP = (IP Address) OR (Bitwise NOT of Subnet Mask)
    const ipParts = this.IPAddress.split('.').map(Number);
    const maskParts = this.identifiedSubnet.split('.').map(Number);
    const broadcastParts = ipParts.map((ip, i) => {
      const mask = maskParts[i];
      return ip | (~mask & 255); // bitwise OR with inverse of mask (AND 255 to keep it unsigned)
    });
    this.BroadCastIP = broadcastParts.join('.');
  }
  getIPClass() {
    const octets = this.IPAddress.split('.').map((octet) =>
      parseInt(octet, 10)
    );
    const [first] = octets;
    if (first >= 1 && first <= 127) {
      this.IPClass = 'A';
    } else if (first >= 128 && first <= 191) {
      this.IPClass = 'B';
    } else if (first >= 192 && first <= 223) {
      this.IPClass = 'C';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid IP Address',
        text: 'Please enter valid IP Address and try again',
      });
    }
  }
  isPrivateIP() {
    const octets = this.IPAddress.split('.');
    const [a, b] = octets.map(Number);

    if (a === 10) {
      this.IPType = 'Private';
    }
    if (a === 172 && b >= 16 && b <= 31) {
      this.IPType = 'Private';
    }
    if (a === 192 && b === 168) {
      this.IPType = 'Private';
    }
  }
  getNetworkIP() {
    const ipOctets = this.IPAddress.split('.').map(Number);
    const maskOctets = this.identifiedSubnet.split('.').map(Number);
    const networkOctets = ipOctets.map((octet, i) => octet & maskOctets[i]);
    this.NetworkIP = networkOctets.join('.');
  }

  getUsableTotalHosts() {
    this.totalHost = Math.pow(2, 32 - this.cidrValue);
    if (this.cidrValue < 0 || this.cidrValue >= 32) {
      this.usableHost = 0;
    } else {
      this.usableHost = this.totalHost - 2;
    }
  }
  getHostRange(ip: string, subnet: string): { first: string; last: string } {
    const ipParts = ip.split('.').map(Number);
    const maskParts = subnet.split('.').map(Number);

    const network = ipParts.map((p, i) => p & maskParts[i]);
    const broadcast = ipParts.map((p, i) => p | (~maskParts[i] & 255));
    if (this.usableHost < 2) {
      return { first: 'N/A', last: 'N/A' };
    }

    network[3] += 1;
    broadcast[3] -= 1;

    return {
      first: network.join('.'),
      last: broadcast.join('.'),
    };
  }
  getWildcardMask() {
    const subnetOctets = this.identifiedSubnet.split('.').map(Number);
    const wildcardOctets = subnetOctets.map((octet) => 255 - octet);
    this.wildmaskCard = wildcardOctets.join('.');
  }
  getClear() {
    window.location.reload();
  }
}
