import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ToolPageSmComponent } from '../tool-page-sm/tool-page-sm.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mac-finder',
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    ToolPageSmComponent,
  ],
  templateUrl: './mac-finder.component.html',
  styleUrl: './mac-finder.component.scss',
})
export class MacFinderComponent {
  macAddress = '';
  vendor = '';
  vendorData: { [key: string]: string } = {};
  isVisible: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{ [key: string]: string }>('assets/vendors.json')
      .subscribe((data) => {
        this.vendorData = data;
      });
  }

  lookupVendor() {
    const cleanedMac = this.macAddress
      .replace(/[^a-fA-F0-9]/g, '')
      .toUpperCase();
    const oui = cleanedMac.substring(0, 6);
    if (this.vendorData[oui]) {
      this.vendor = this.vendorData[oui];
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid IP or Subnet format',
        text: 'Please enter correct IP Address and try again',
      });
    }

    setTimeout(() => {
          this.isVisible = true;
    }, 500);
  }
}
