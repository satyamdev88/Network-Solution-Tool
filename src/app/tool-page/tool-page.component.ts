import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {  Router } from '@angular/router';

import { NetworkTools } from '../../data/menu';
import { DataSenderService } from '../../services/data-sender.service';

@Component({
  selector: 'app-tool-page',
  imports: [CommonModule, NgFor],
  templateUrl: './tool-page.component.html',
  styleUrl: './tool-page.component.scss',
})
export class ToolPageComponent {
  tools = NetworkTools;

  constructor(private dataService: DataSenderService, private router: Router){}
  openInNewTab(url: string, name:string) {
    this.dataService.sendCardName(name);
    this.router.navigateByUrl(url);
  }
}
