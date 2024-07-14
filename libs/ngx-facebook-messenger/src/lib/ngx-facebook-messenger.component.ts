import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  Inject,
  input,
  output,
  PLATFORM_ID,
  Renderer2,
  viewChild,
} from '@angular/core';

import {
  BASE_URL_ME,
  DEFAULT_GREETING,
  SIZE_BUTTON_DESKTOP,
  SIZE_BUTTON_MOBILE,
  STYLE_BUTTON,
  VIEW_BUTTON,
} from './constant';
import { NgxFacebookMessengerOptions } from './types';

@Component({
  selector: 'ngx-facebook-messenger',
  templateUrl: './ngx-facebook-messenger.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./ngx-facebook-messenger.component.scss'],
})
export class NgxFacebookMessengerComponent {
  ngxFacebookMessengerOptions = input<NgxFacebookMessengerOptions>();

  clicked = output<void>();

  protected readonly ngxFacebookMessenger = viewChild<ElementRef<HTMLElement>>(
    'ngxFacebookMessenger',
  );

  protected readonly desktopSize = computed(() => {
    const size = this.ngxFacebookMessengerOptions()?.buttonOptions?.size;
    return size?.desktop || SIZE_BUTTON_DESKTOP.STANDARD;
  });

  protected readonly mobileSize = computed(() => {
    const size = this.ngxFacebookMessengerOptions()?.buttonOptions?.size;
    return size?.mobile || SIZE_BUTTON_MOBILE.COMPACT;
  });

  protected readonly styleButton = computed(() => {
    const style = this.ngxFacebookMessengerOptions()?.buttonOptions?.style;
    return style || STYLE_BUTTON.ROUNDED_LOGO;
  });

  protected readonly viewButton = computed(() => {
    const view = this.ngxFacebookMessengerOptions()?.buttonOptions?.view;
    return view || VIEW_BUTTON.ICON;
  });

  protected readonly textButton = computed(
    () => this.ngxFacebookMessengerOptions()?.buttonOptions?.text || 'Chat',
  );

  protected readonly classButton = computed(() => {
    const classes = [
      'wrapper',
      'ngx-facebook-messeger-size',
      this.desktopSize(),
      this.mobileSize(),
      this.styleButton(),
      this.viewButton(),
    ]
      .filter((className) => className !== '')
      .join(' ');

    return classes;
  });

  private readonly isBrowser = isPlatformBrowser(this.plataformId);

  private readonly idMe = computed(
    () => this.ngxFacebookMessengerOptions()?.idMe,
  );

  private readonly shoudOpenLink = computed(
    () => this.ngxFacebookMessengerOptions()?.openLink ?? true,
  );

  private readonly ref = computed(
    () => this.ngxFacebookMessengerOptions()?.ref,
  );

  private readonly text = computed(
    () => this.ngxFacebookMessengerOptions()?.text ?? DEFAULT_GREETING,
  );

  constructor(
    @Inject(PLATFORM_ID)
    private readonly plataformId: object,
    private readonly renderer2: Renderer2,
    private readonly elementRef: ElementRef<HTMLElement>,
  ) {}

  onClickFacebookButton() {
    if (this.isBrowser) {
      this.clicked.emit();
      this.shoudOpenLink() && this.openMessengerURL();
    }
  }

  private openMessengerURL() {
    const meLink = new URL(`${BASE_URL_ME}${this.idMe()}`);
    if (this.text()) {
      meLink.searchParams.set('text', this.text());
    }

    if (this.ref()) {
      meLink.searchParams.set('ref', this.ref() as string);
    }

    window.open(meLink.toString(), '_blank');
  }

  hidePluginChat() {
    this.renderer2.setStyle(this.elementRef, 'display', 'none');
  }

  showPluginChat() {
    this.renderer2.setStyle(this.elementRef, 'display', 'block');
  }
}
