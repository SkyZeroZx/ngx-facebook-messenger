# NgxFacebookMessenger | Angular

Angular component for Facebook Messenger Plugin

Ngx Facebook Messenger offers a lightweight alternative, optimizing user experiences by significantly reducing the initial load size, ensuring smoother page performance, and enhancing overall website efficiency

On May 9 , 2024 Facebook remove Facebook Messenger Plugin chat without replacement

See https://developers.facebook.com/docs/messenger-platform/discovery/facebook-chat-plugin/

As an alternative to the change made by Facebook, consider making a change to the library's API to support Link Me for use with Facebook Messenger.

See https://developers.facebook.com/docs/messenger-platform/discovery/m-me-links?locale=en_US

# DEMO

See a [live demo](https://skyzerozx.github.io/ngx-facebook-messenger)

## Basic Usage

Init your plugin with previous register your page domain in the white list of Facebook

Set your _page_id_ in ngxFacebookMessengerOptions how the next example

```html
<ngx-facebook-messenger [ngxFacebookMessengerOptions]="{ idMe: 'YOUR_ID_ME_LINK'}"> </ngx-facebook-messenger>
```

## Dependencies

Latest version available for each version of Angular

| ngx-facebook-messenger | Angular     |
| ---------------------- | ----------- |
| 1.0.0 - 1.2.0          | 16.xx 17.xx |
| 1.3.0 - 2.0.0          | 17.xx 18.xx |

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

In **NgxFacebookMessengerOptions**

```typescript
export interface NgxFacebookMessengerOptions {
  /**
   * See{@link https://developers.facebook.com/docs/messenger-platform/discovery/m-me-links?locale=es_ES}
   * You need id to use link me to redirect to Messager Chat of Facebook Page
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
| clicked      | Emitted when clicked in Facebook Messenger Icon                                                                                                                                                                                                |

# Methods

This method should be after init the plugin or throw a error , except **hideNgxFacebookMessenger**

| Method                                    | Description                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |        
| hidePluginChat()                          | Call this function to hide the plugin Chat.                                                                                                                                                                   
| showPluginChat()                          | Call this function to show the plugin Chat.    
Note :
The documentation of Link Me Facebook Messenger

- https://developers.facebook.com/docs/messenger-platform/discovery/m-me-links?locale=en_US

## Versioning

We use [SemVer](https://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/zyra/ngx-facebook/tags).

## Contribution

- **Having an issue**? or looking for support? [Open an issue](https://github.com/SkyZeroZx/ngx-facebook-messenger) and we will get you the help you need.
- Got a **new feature or a bug fix**? Fork the repository, make your changes, and submit a pull request.

## Support this project

If you find this project useful, please star the repository to let people know that it's reliable. Also, share it with friends and colleagues that might find this useful as well. Thank you :smile:
