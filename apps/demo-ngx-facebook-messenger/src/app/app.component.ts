import { ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import {
  NgxFacebookMessengerComponent,
  NgxFacebookMessengerOptions,
  SIZE_BUTTON_DESKTOP,
  SIZE_BUTTON_MOBILE,
  STYLE_BUTTON,
  VIEW_BUTTON,
} from 'ngx-facebook-messenger';

@Component({
  selector: 'ngx-facebook-messenger-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(NgxFacebookMessengerComponent)
  ngxFacebookMessengerComponent!: NgxFacebookMessengerComponent;

  inputText = 'Chat';

  listEvents: string[] = [];

  options: NgxFacebookMessengerOptions = {
    idMe : '110145950848846',
    buttonOptions: {
      text: this.inputText,
      view: VIEW_BUTTON.ICON,
      style: STYLE_BUTTON.ROUNDED_LOGO,
      size: {
        desktop: SIZE_BUTTON_DESKTOP.STANDARD,
      },
    },
  };

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  pushEvent(eventName: string) {
    console.log(`Event : [ ${eventName} ]`);
    this.listEvents = [...this.listEvents, `Event : [ ${eventName} ]`];
    this.changeDetectorRef.detectChanges();
  }

  onChangeText(event: any) {
    const text = event.target.value as string;
    this.inputText = text;
    this.options = {
      ...this.options,
      buttonOptions: {
        ...this.options.buttonOptions,
        text: this.inputText,
      },
    };
  }

  standardDesktop() {
    this.options = {
      ...this.options,
      buttonOptions: {
        ...this.options.buttonOptions,
        size: {
          ...this.options.buttonOptions?.size,
          desktop: SIZE_BUTTON_DESKTOP.STANDARD,
        },
      },
    };
  }

  compactDesktop() {
    this.options = {
      ...this.options,
      buttonOptions: {
        ...this.options.buttonOptions,
        size: {
          ...this.options.buttonOptions?.size,
          desktop: SIZE_BUTTON_DESKTOP.COMPACT,
        },
      },
    };
  }

  standardMobile() {
    this.options = {
      ...this.options,
      buttonOptions: {
        ...this.options.buttonOptions,
        size: {
          ...this.options.buttonOptions?.size,
          mobile: SIZE_BUTTON_MOBILE.STANDARD,
        },
      },
    };
  }

  compactMobile() {
    this.options = {
      ...this.options,
      buttonOptions: {
        ...this.options.buttonOptions,
        size: {
          ...this.options.buttonOptions?.size,
          mobile: SIZE_BUTTON_MOBILE.COMPACT,
        },
      },
    };
  }

  viewButtonIcon() {
    this.options = {
      ...this.options,
      buttonOptions: {
        ...this.options.buttonOptions,
        view: VIEW_BUTTON.ICON,
      },
    };
  }

  viewButtonIconText() {
    this.options = {
      ...this.options,
      buttonOptions: {
        ...this.options.buttonOptions,
        view: VIEW_BUTTON.ICON_TEXT,
      },
    };
  }

  viewButtonText() {
    this.options = {
      ...this.options,
      buttonOptions: {
        ...this.options.buttonOptions,
        view: VIEW_BUTTON.TEXT,
      },
    };
  }

  styleButtonRounded() {
    this.options = {
      ...this.options,
      buttonOptions: {
        ...this.options.buttonOptions,
        style: STYLE_BUTTON.ROUNDED,
      },
    };
  }

  styleButtonRoundedLogo() {
    this.options = {
      ...this.options,
      buttonOptions: {
        ...this.options.buttonOptions,
        style: STYLE_BUTTON.ROUNDED_LOGO,
      },
    };
  }

  styleButtonSquared() {
    this.options = {
      ...this.options,
      buttonOptions: {
        ...this.options.buttonOptions,
        style: STYLE_BUTTON.SQUARED,
      },
    };
  }
}
