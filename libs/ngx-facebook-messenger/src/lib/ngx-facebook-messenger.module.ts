import { NgTemplateOutlet } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxFacebookMessengerComponent } from './ngx-facebook-messenger.component';

@NgModule({
  declarations: [NgxFacebookMessengerComponent],
  imports: [NgTemplateOutlet],
  exports: [NgxFacebookMessengerComponent],
})
export class NgxFacebookMessengerModule {}
