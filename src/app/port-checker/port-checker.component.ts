import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortCheckerService } from '../../services/port-checker.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-port-checker',
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './port-checker.component.html',
  styleUrl: './port-checker.component.scss',
})
export class PortCheckerComponent {
  ip: any;
  port: any;
  status: any;
  isVisible: boolean = false;

  
  ngOnInit(): void {
      this.isVisible = false;
  }

  constructor(private checker: PortCheckerService) {}
  

  check() {
    this.checker.checkPort(this.ip, this.port).subscribe((data) => {
      this.status = data.status;
        this.isVisible = true;
    });
  }
}
