import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  Renderer2,
  input,
  computed,
  signal,
  viewChild,
  output,
} from '@angular/core';

import {
  CUSTOMER_CHAT,
  DEFAULT_GREETING,
  SIZE_BUTTON_DESKTOP,
  SIZE_BUTTON_MOBILE,
  STYLE_BUTTON,
  VIEW_BUTTON,
} from './constant';
import {
  FacebookStatic,
  InitParams,
  NgxFacebookMessengerOptions,
} from './types';
import { Observable } from 'rxjs';

// eslint-disable-next-line no-var
declare var FB: FacebookStatic; // Asign a global variable interface of FacebookStatic

@Component({
  selector: 'ngx-facebook-messenger',
  templateUrl: './ngx-facebook-messenger.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./ngx-facebook-messenger.component.scss'],
})
export class NgxFacebookMessengerComponent implements OnInit {
  fbInitParams = input.required<InitParams>();

  ngxFacebookMessengerOptions = input<NgxFacebookMessengerOptions>();

  protected ngxFacebookMessenger = viewChild<ElementRef<HTMLElement>>(
    'ngxFacebookMessenger',
  );

  xfbmlRender = output<void>();

  customerChatShow = output<void>();

  customerChatLoad = output<void>();

  customerChatHide = output<void>();

  dialogShow = output<void>();

  dialogHide = output<void>();

  private elementRef!: HTMLElement;

  // flag for only load plugin once time
  protected isLoaded = signal(false);

  protected desktopSize = computed(() => {
    const size = this.ngxFacebookMessengerOptions()?.buttonOptions?.size;
    return size?.desktop || SIZE_BUTTON_DESKTOP.STANDARD;
  });

  protected mobileSize = computed(() => {
    const size = this.ngxFacebookMessengerOptions()?.buttonOptions?.size;
    return size?.mobile || SIZE_BUTTON_MOBILE.COMPACT;
  });

  protected styleButton = computed(() => {
    const style = this.ngxFacebookMessengerOptions()?.buttonOptions?.style;
    return style || STYLE_BUTTON.ROUNDED_LOGO;
  });

  protected viewButton = computed(() => {
    const view = this.ngxFacebookMessengerOptions()?.buttonOptions?.view;
    return view || VIEW_BUTTON.ICON;
  });

  protected textButton = computed(
    () => this.ngxFacebookMessengerOptions()?.buttonOptions?.text || 'Chat',
  );

  protected classButton = computed(() => {
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

  // flag for detect if load lazy or not the oficial plugin
  protected isLazy = signal<boolean>(true);

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    this.eagerLoadPlugin();
  }

  /**
   * Checks if the plugin should be loaded lazily and if not, it loads the
   * plugin and hides the NgxFacebookMessenger.
   */
  private eagerLoadPlugin() {
    this.isLazy.set(
      this.ngxFacebookMessengerOptions()?.initPluginOptions?.lazy ?? true,
    );
    if (!this.isLazy()) {
      this.initPlugin();
    }
  }

  loadPlugin() {
    if (!this.isLoaded() && isPlatformBrowser(this.platformId)) {
      this.isLoaded.set(true);
      this.addLoader();
      this.initPlugin();
    }
  }

  /**
   * The function fbXFBMLParse() is used to parse and render Facebook XFBML elements on a webpage.
   */
  fbXFBMLParse() {
    FB.XFBML.parse();
  }

  /**
   * The function `pluginChatShow` is used to show or hide the Facebook Customer Chat dialog based on the
   * value of the `shouldShowDialog` parameter.
   * @param {boolean} shouldShowDialog - A boolean value that determines whether the chat dialog should
   * be shown or hidden.
   */
  pluginChatShow(shouldShowDialog: boolean) {
    FB.CustomerChat.show(shouldShowDialog);
  }

  /**
   * The function `pluginChatShowDialog()` shows the Facebook Customer Chat dialog.
   */
  pluginChatShowDialog() {
    FB.CustomerChat.showDialog();
  }

  /**
   * The function `pluginChatHideDialog()` hides the dialog box for the Facebook Customer Chat plugin.
   */
  pluginChatHideDialog() {
    FB.CustomerChat.hideDialog();
  }

  /**
   * The function `pluginChatHide()` hides the Facebook customer chat plugin.
   */
  pluginChatHide() {
    FB.CustomerChat.hide();
  }

  /**
   * The function initializes a Facebook Messenger plugin by adding a class to an element with spinner loader, creating a div
   * for the plugin, injecting the Facebook SDK asynchronously, and initializing the Facebook SDK.
   */
  private initPlugin() {
    this.createDivPlugin();
    this.injectFbSdkAsync();
    this.fbAsyncInit();
  }

  /**
   * Add the 'active' class to the ngxFacebookMessenger element to show loading action
   */
  private addLoader() {
    this.elementRef = this.ngxFacebookMessenger()?.nativeElement as HTMLElement;
    this.elementRef.classList.add('active');
  }

  /**
   * The function `fbAsyncInit` initializes the Facebook SDK asynchronously and subscribes to Facebook
   * events.
   */
  private fbAsyncInit() {
    (window as any)['fbAsyncInit'] = () => {
      const xfbml = this.fbInitParams().xfbml ?? true;
      const initParams = { ...this.fbInitParams(), xfbml };
      FB.init(initParams);
      this.fbEventSubscribe();
    };
  }

  /**
   * The function `fbEventSubscribe` subscribes to various Facebook events and emits corresponding events
   */
  private fbEventSubscribe() {
    FB.Event.subscribe('xfbml.render', () => {
      this.xfbmlRender.emit();
    });

    FB.Event.subscribe(CUSTOMER_CHAT.SHOW, () => {
      this.customerChatShow.emit();
    });

    FB.Event.subscribe(CUSTOMER_CHAT.HIDE, () => {
      this.customerChatHide.emit();
    });

    FB.Event.subscribe(CUSTOMER_CHAT.DIALOG_HIDE, () => {
      this.dialogHide.emit();
    });

    FB.Event.subscribe(CUSTOMER_CHAT.DIALOG_SHOW, () => {
      this.dialogShow.emit();
    });

    // use this helper functin because CHAT_LOAD Event Of Facebook not detect when real element attach to the DOM
    this.observeFacebookElement().subscribe(() => {
      this.customerChatLoad.emit();
      this.hideNgxFacebookMessenger();
    });
  }

  hideNgxFacebookMessenger() {
    // only hide when is lazy , not show when is eager load plugin oficial facebook
    if (this.isLazy()) {
      const debounceTime =
        this.ngxFacebookMessengerOptions()?.initPluginOptions?.debounceTime ??
        600;

      setTimeout(() => {
        this.setDisplayNone();
        // Default is true
        const showDialog =
          this.ngxFacebookMessengerOptions()?.initPluginOptions?.showDialog ??
          true;

        this.pluginChatShow(showDialog);
      }, debounceTime);
    }
  }

  private setDisplayNone() {
    this.renderer2.setStyle(this.elementRef, 'display', 'none');
  }

  /**
   * The function injects the Facebook SDK asynchronously into the document.
   */
  private injectFbSdkAsync(): void {
    const language = this.ngxFacebookMessengerOptions()?.language ?? 'en_US';
    const fjs = this.document.getElementsByTagName('script')[0];
    if (this.document.getElementById('facebook-jssdk')) return;
    const js = this.document.createElement('script');
    js.id = 'facebook-jssdk';
    js.async = false;
    js.defer = false;
    js.crossOrigin = 'anonymous';
    js.src = `https://connect.facebook.net/${language}/sdk/xfbml.customerchat.js`;
    fjs?.parentNode?.insertBefore(js, fjs);
  }

  /**
   * The function creates a div element with the id 'fb-root' and another div element with the id
   * 'fb-customer-chat' and adds them to the body of the document.
   */
  private createDivPlugin() {
    const bodyElement = this.document.getElementsByTagName('body')[0];

    const fbRootElement = this.document.createElement('div');
    fbRootElement.id = 'fb-root';

    const fbCustomerChat = this.document.createElement('div');
    fbCustomerChat.id = 'fb-customer-chat';
    fbCustomerChat.classList.add('fb-customerchat');

    // Configure attribute in HTML
    // See https://developers.facebook.com/docs/messenger-platform/discovery/facebook-chat-plugin/customization

    fbCustomerChat.setAttribute(
      'page_id',
      this.ngxFacebookMessengerOptions()?.page_id || '',
    );

    fbCustomerChat.setAttribute('attribution', 'biz_inbox');

    const pluginOptions = this.ngxFacebookMessengerOptions()?.initPluginOptions;

    fbCustomerChat.setAttribute(
      'logged_in_greeting',
      pluginOptions?.logged_in_greeting || DEFAULT_GREETING,
    );

    if (pluginOptions?.theme_color) {
      fbCustomerChat.setAttribute('theme_color', pluginOptions?.theme_color);
    }

    fbCustomerChat.setAttribute(
      'logged_out_greeting',
      pluginOptions?.logged_out_greeting || DEFAULT_GREETING,
    );

    bodyElement.appendChild(fbRootElement);

    bodyElement.appendChild(fbCustomerChat);
  }

  /**
   * The function observes the Facebook element in the DOM and emits an event when specific conditions
   * are met is useful for detect when real plugin facebook its load because the Events Facebook SDK not sync with the real DOM.
   * @returns returns an Observable that emits an HTMLElement
   */
  observeFacebookElement(): Observable<HTMLElement> {
    return new Observable<HTMLElement>((observer) => {
      const mutationObserver = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
          const element = mutation?.target as HTMLElement;

          const isRoot = element?.id.trim() === 'fb-root';

          const containsReset = element.className.trim() === 'fb_reset';

          const previousSibling = (
            mutation?.previousSibling as HTMLElement
          )?.classList?.contains('fb_iframe_widget');

          if (isRoot && containsReset && previousSibling) {
            observer.next(element);
            observer.complete();
            mutationObserver.disconnect();
          }
        });
      });

      mutationObserver.observe(this.document, {
        childList: true,
        subtree: true,
      });
    });
  }
}
