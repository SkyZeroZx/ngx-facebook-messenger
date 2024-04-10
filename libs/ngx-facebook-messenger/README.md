# NgxFacebookMessenger | Angular

Angular component for Facebook Messenger Plugin

Ngx Facebook Messenger offers a lightweight alternative, optimizing user experiences by significantly reducing the initial load size, ensuring smoother page performance, and enhancing overall website efficiency

Currently Facebook Messenger Plugin **killed** the core web vitals when load

**Before** of implementation of plugin

![Sample Before](/docs/sample_before.jpg)

**After**

![Sample After](/docs/sample_after.jpg)

Native for Angular

# DEMO

See a [live demo](https://skyzerozx.github.io/ngx-facebook-messenger)

## Basic Usage

Init your plugin with previous register your page domain in the white list of Facebook

Set your _page_id_ in ngxFacebookMessengerOptions how the next example

```html
<ngx-facebook-messenger [fbInitParams]="{ xfbml: true, version: 'v17.0' }" [ngxFacebookMessengerOptions]="{ page_id: 'YOUR_PAGE_ID'}"> </ngx-facebook-messenger>
```

## Dependencies

Latest version available for each version of Angular

| ngx-facebook-messenger | Angular     |
| ---------------------- | ----------- |
| 1.0.0 - 1.2.0          | 16.xx 17.xx |
| 1.3.0                  | 17.x        |

# Usage

## Install

`npm install ngx-facebook-messenger`

## Import into Module

```typescript
import { NgxFacebookMessengerModule } from 'ngx-facebook-messenger';

@NgModule({
  imports: [
    ...,
    NgxFacebookMessengerModule
  ],
  declarations: [...],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Customization CSS

For customized position of plugin and background

In case the View Button is **ICON**

Example of position left in the plugin with botton 36px , and custom background color

```scss
#ngx-facebook-messenger {
  background: #8278ff;
}
```

In case the View Button is **ICON TEXT** or **TEXT**

Example of position left in the plugin with bottom 36px , and custom background

```scss
#ngx-facebook-messenger {
  .wrapper {
    bottom: 36px;
    right: 0;
    left: 0;
  }

  .wrapper-icon-text {
    left: 12px;
    background: #8278ff;
  }
}
```

Note : This SCSS code is valid when applied in style base of all proyect , when applied directly in component use !important

# API

# Inputs

In **fbInitParams**

```typescript
interface InitParams {
  appId?: string;
  version: string;
  cookie?: boolean;
  status?: boolean;
  xfbml?: boolean; // Default value true
  frictionlessRequests?: boolean;
  hideFlashCallback?: boolean;
  autoLogAppEvents?: boolean;
}
```

- Credits of Facebook General Interface type for [facebook-js-sdk](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/facebook-js-sdk/index.d.ts)

In **NgxFacebookMessengerOptions**

```typescript
export interface NgxFacebookMessengerOptions {
  /**
   * Your required page_id for correctly work of real plugin facebook messenger
   */
  page_id: string;
  /**
   * Optional option for defined language support by facebook plugin (review your language in documentation)
   * @default 'en_US'
   */
  language?: string;
  /**
   *  Init Plugin Options
   */
  initPluginOptions?: {
    /**
     * Init plugin by default Facebook Messenger Oficial lazy ( when click in the fake button )
     * when is false init eager ( killed your web vitals )
     * @default true
     */
    lazy?: boolean;
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
    /**
     * Property of attribute for theme_color color in oficial Facebook Plugin Messenger
     * Default take your configuration setting in Facebook Account
     * If not it's configure take blue default color
     * @default null
     */
    theme_color?: string;
    /**
     * When the user is logged with your account show a greeting text in the Facebook Plugin Messenger
     * @default 'Hello, how can we help you?'
     */
    logged_in_greeting?: string;
    /**
     * When the user not logged with your account show a greeting text in the Facebook Plugin Messenger
     * @default 'Hello, how can we help you?'
     */
    logged_out_greeting?: string;
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
```

- Enum values

```typescript
export enum VIEW_BUTTON {
  ICON = 'ICON',
  ICON_TEXT = 'ICON_TEXT',
  TEXT = 'TEXT',
}

export enum STYLE_BUTTON {
  ROUNDED_LOGO = 'ROUNDED_LOGO',
  ROUNDED = 'ROUNDED',
  SQUARED = 'SQUARED',
}

export enum SIZE_BUTTON_MOBILE {
  STANDARD = 'STANDARD_MOBILE',
  COMPACT = 'COMPACT_MOBILE',
}

export enum SIZE_BUTTON_DESKTOP {
  STANDARD = 'STANDARD_DESKTOP',
  COMPACT = 'COMPACT_DESKTOP',
}
```

# Outputs

| Output           | Description                                                                                                                                                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| xfbmlRender      | Emitted when xfmblRender in the DOM                                                                                                                                                                                                                    |
| customerChatShow | Emitted when the customer Chat Show ( Oficial PLugin Facebook )                                                                                                                                                                                        |
| customerChatLoad | Emitted when the customer Load , At this point, the plugin is not necessarily mounted in the DOM( Oficial PLugin Facebook ) , This output is replace for own implementation of mutation observer detect the Chat Plugin is load and mounted in the DOM |
| customerChatHide | Emitted when the customer chat Hide ( Oficial Plugin Facebook )                                                                                                                                                                                        |
| dialogShow       | Emitted when the customer chat show Dialog ( Oficial Plugin Facebook )                                                                                                                                                                                 |
| dialogHide       | Emitted when the customer chat hide Dialog ( Oficial Plugin Facebook )                                                                                                                                                                                 |

# Methods

This method should be after init the plugin or throw a error , except **hideNgxFacebookMessenger**

| Method                                    | Description                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pluginChatShow(shouldShowDialog: boolean) | Call this function to show the plugin on your page. You can use the shouldShowDialog parameter to decide if the dialog should also be shown. For the plugin to stay hidden on initial page load, you have to set xfbml as false when initializing the SDK. Then you can call FB.XFBML.parse() to control when Customer Chat is loaded. |
| pluginChatShowDialog()                    | Call this function to show the plugin dialog.                                                                                                                                                                                                                                                                                          |
| pluginChatHideDialog()                    | Call this function to hide the plugin dialog.                                                                                                                                                                                                                                                                                          |
| pluginChatHide()                          | Call this function to hide the plugin Chat.                                                                                                                                                                                                                                                                                            |
| fbXFBMLParse()                            | This function parses and renders XFBML markup in a document on the fly. This could be used if you send XFBML from your server via ajax and want to render it client side. XFBML enables you to incorporate FBML into your websites and IFrame applications.                                                                            |
| hideNgxFacebookMessenger()                | This function hide the library with display none with a debounce time if exist in the _options_                                                                                                                                                                                                                                        |

Note :
The documentation take part of facebook js sdk

- https://developers.facebook.com/docs/reference/javascript

## Versioning

We use [SemVer](https://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/zyra/ngx-facebook/tags).

## Contribution

- **Having an issue**? or looking for support? [Open an issue](https://github.com/SkyZeroZx/ngx-facebook-messenger) and we will get you the help you need.
- Got a **new feature or a bug fix**? Fork the repository, make your changes, and submit a pull request.

## Support this project

If you find this project useful, please star the repository to let people know that it's reliable. Also, share it with friends and colleagues that might find this useful as well. Thank you :smile:
