import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ToolPageComponent } from "../tool-page/tool-page.component";

@Component({
  selector: 'app-landing-page',
  imports: [HeaderComponent, FooterComponent, ToolPageComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
