import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfigProviders } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfigProviders,
  ],
})
.catch((err) => console.error(err));
