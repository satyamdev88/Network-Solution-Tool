import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { NetworkTools } from '../../data/menu';
import { DataSenderService } from '../../services/data-sender.service';

@Component({
  selector: 'app-tool-page-sm',
  imports: [CommonModule, NgFor],
  templateUrl: './tool-page-sm.component.html',
  styleUrl: './tool-page-sm.component.scss',
})
export class ToolPageSmComponent {
  tools = NetworkTools;
  cardName:any;
  constructor(private dataService: DataSenderService, private router: Router) {}

  ngOnInit(): void {
    this.cardName = this.dataService.getCardName();
  }

  openInNewTab(url: string, name: string) {
    this.dataService.sendCardName(name);
    this.router.navigateByUrl(url);
  }
}
