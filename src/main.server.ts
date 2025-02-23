import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js/node'; // Required for SSR
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
