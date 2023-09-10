# NgxFacebookMessenger | Angular

Angular component for Facebook Messenger Plugin

Motivation

Currently Facebook Messenger Plugin **killed** the core web vitals when load

Aprroach

- Create a fake button customizable only load the Messenger Plugin when i need

Native for Angular

# DEMO

See a [live demo](https://skyzerozx.github.io/ngx-facebook-messenger)

## Basic Usage

Init your plugin with previous register your page domain in the white list of Facebook

Set your _page_id_ in ngxFacebookMessengerOptions how the next example

```html
<ngx-facebook-messenger [fbInitParams]="{ xfbml: true, version: 'v17.0' }" [ngxFacebookMessengerOptions]="{ page_id: 'YOUR_PAGE_ID'}"> </ngx-facebook-messenger>
```

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

# API

# Inputs

- In **fbInitParams**

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

- In **NgxFacebookMessengerOptions**

```typescript
export interface NgxFacebookMessengerOptions {
  /*Your required Page Id for correctly work of real plugin facebook messenger*/
  page_id: string;
 
 /*Init Plugin Options if required showCustomerChat and showDialog*/
  initPluginOptions?: {
    showCustomerChat?: boolean;
    showDialog?: boolean;
  };

  /*Button Options for customization similar to a Facebook Plugin Official*/
  buttonOptions?: {

    /*Your Custom Text only visible when view is ICON_TEXT or TEXT*/
    text?: string; // Default is Chat

    /*Enum Options of possible view how ICON , ICON_TEXT or TEXT */
    view?: VIEW_BUTTON; // Default value ICON

    /*Enum Options of possible styles button how ROUNDED_LOGO , ROUNDED and SQUARED*/
    style?: STYLE_BUTTON; // Default value ROUNDED_LOGO

    /*Possible options of size how standard or compact similar to a Facebook Plugin Official*/
    size?: {
      
      /*Enums with options STANDARD or COMPACT*/
      desktop?: SIZE_BUTTON_DESKTOP; // Default value STANDARD
      mobile?: SIZE_BUTTON_MOBILE; // Default value COMPACT
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

| Output           | Description                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| xfbmlRender      | Emitted when xfmblRender in the DOM                                                                                         |
| customerChatShow | Emitted when the customer Chat Show ( Oficial PLugin Facebook )                                                             |
| customerChatLoad | Emitted when the customer Load , At this point, the plugin is not necessarily mounted in the DOM( Oficial PLugin Facebook ) |
| customerChatHide | Emitted when the customer chat Hide ( Oficial Plugin Facebook )                                                             |
| dialogShow       | Emitted when the customer chat show Dialog ( Oficial Plugin Facebook )                                                      |
| dialogHide       | Emitted when the customer chat hide Dialog ( Oficial Plugin Facebook )                                                      |

# Methods

This method should be after init the plugin or throw a error

| Method                                    | Description                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pluginChatShow(shouldShowDialog: boolean) | Call this function to show the plugin on your page. You can use the shouldShowDialog parameter to decide if the dialog should also be shown. For the plugin to stay hidden on initial page load, you have to set xfbml as false when initializing the SDK. Then you can call FB.XFBML.parse() to control when Customer Chat is loaded. |
| pluginChatShowDialog                      | Call this function to show the plugin dialog.                                                                                                                                                                                                                                                                                          |
| pluginChatHideDialog()                    | Call this function to hide the plugin dialog.                                                                                                                                                                                                                                                                                          |
| pluginChatHide()                          | Call this function to hide the plugin Chat.                                                                                                                                                                                                                                                                                            |
| fbXFBMLParse()                            | This function parses and renders XFBML markup in a document on the fly. This could be used if you send XFBML from your server via ajax and want to render it client side. XFBML enables you to incorporate FBML into your websites and IFrame applications.                                                                            |

Note :
The documentation take part of facebook js sdk

- https://developers.facebook.com/docs/reference/javascript
