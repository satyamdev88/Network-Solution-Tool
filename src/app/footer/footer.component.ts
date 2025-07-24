import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NetworkTools } from '../../data/menu';

@Component({
  selector: 'app-footer',
    imports: [CommonModule, NgFor], 
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  tools =NetworkTools;

}
