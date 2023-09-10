import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NgxFacebookMessengerModule } from 'ngx-facebook-messenger';
import { DocumentationComponent } from './components/documentation/documentation.component';

@NgModule({
  declarations: [AppComponent, DocumentationComponent],
  imports: [
    BrowserModule,
    NgxFacebookMessengerModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
