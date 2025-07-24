import { Routes } from '@angular/router';
import { Ipv4CalculatorComponent } from './ipv4-calculator/ipv4-calculator.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PortCheckerComponent } from './port-checker/port-checker.component';
import { MacFinderComponent } from './mac-finder/mac-finder.component';
import { PingCheckerComponent } from './ping-checker/ping-checker.component';
import { TraceRouteComponent } from './trace-route/trace-route.component';

export const routes: Routes = [
    { path: '', component:LandingPageComponent},
    { path: 'ipv4Calculator', component:Ipv4CalculatorComponent},
    { path: 'portChecker', component:PortCheckerComponent},
    { path: 'mac-finder', component:MacFinderComponent},
    { path: 'ping', component:PingCheckerComponent},
    { path: 'trace-route', component:TraceRouteComponent},
];
