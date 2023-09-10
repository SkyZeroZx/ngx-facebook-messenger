import {
  VIEW_BUTTON,
  STYLE_BUTTON,
  SIZE_BUTTON_DESKTOP,
  SIZE_BUTTON_MOBILE,
} from '../constant';

export interface NgxFacebookMessengerOptions {
  /**
   * Your required page_id for correctly work of real plugin facebook messenger
   */
  page_id: string;
  /**
   *  Init Plugin Options
   */
  initPluginOptions?: {
    /**
     * If required showDialog
     * @default true
     */
    showDialog?: boolean;
    /**
     * Debounce time for hide the ngx facebook messenger
     * When load real plugin, time in miliseconds
     * @default 600
     */
    debounceTime?: number;
  };
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