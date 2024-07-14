import {
  VIEW_BUTTON,
  STYLE_BUTTON,
  SIZE_BUTTON_DESKTOP,
  SIZE_BUTTON_MOBILE,
} from '../constant';

export interface NgxFacebookMessengerOptions {
  /**
   * You need id to use link me to redirect to Messager Chat of Facebook Page
   * See {@link https://developers.facebook.com/docs/messenger-platform/discovery/m-me-links?locale=es_ES}
   */
  idMe?: string;
  /**
   * Flag to indicate open link when provide propertie idMe
   * @default true
   */
  openLink?: boolean;
  /**
   *  ref parameter that, when a person clicks on the link,
   *  provides your business with more context about the conversation such as a link on your website versus a link in a store.
   *  See {@link https://developers.facebook.com/docs/messenger-platform/discovery/m-me-links?locale=en_US}
   */
  ref?: string;
  /**
   * text parameter to include a customized message as well.
   * See {@link https://developers.facebook.com/docs/messenger-platform/discovery/m-me-links?locale=en_US}
   *  @default "Hello"
   */
  text?: string;
  /**
   * Button Options for customization similar to a Facebook Plugin Official
   */
  buttonOptions?: {
    /**
     * Text button when style is VIEW_BUTTON.ICON_TEXT or VIEW_BUTTON.TEXT
     * @default Chat
     */
    text?: string;
    /**
     * Enum Options of possible view.
     * @default VIEW_BUTTON.ICON
     */
    view?: VIEW_BUTTON;
    /**
     * Enum Options of possible style.
     * @default STYLE_BUTTON.ROUNDED_LOGO
     */
    style?: STYLE_BUTTON;
    /**
     * Size options if is desktop or mobile
     */
    size?: {
      /**
       * Enum Options of possible desktop size.
       * @default SIZE_BUTTON_DESKTOP.STANDARD
       */
      desktop?: SIZE_BUTTON_DESKTOP;
      /**
       * Enum Options of possible mobile size.
       * @default SIZE_BUTTON_MOBILE.COMPACT
       */
      mobile?: SIZE_BUTTON_MOBILE;
    };
  };
}
