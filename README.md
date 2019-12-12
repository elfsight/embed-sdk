# Elfsight Embedding SDK

![](https://img.shields.io/badge/build-passed-brightgreen?style=flat-square)
![](https://img.shields.io/badge/version-0.1.0-brightgreen?style=flat-square)

INTRO DESCRIPTION


## Contents

[Getting Started](#getting-started)

 * [1. Include SDK](#1-include-sdk)
 
 * [2. Display the Catalog](#2-display-applications-catalog)
 
 * [3. Operate the widget](#3-operate-the-widget)
 
 * [4. Widget management](#4-widget-management)
 
 * [5. Affiliate Program](#5-affiliate-program)

[UI Components](#ui-components)

 * [Applications Catalog](#applications-catalog)
 
 * [Application Card](#application-card)
 
 * [Widget Management Panel](#widget-management-panel)
 
 * [Buttons](#buttons)

[API Methods](#api-methods)

 * [Get the applications list](#get-applications)
 
 * [Get the specific application](#get-application)
 
 * [Open the application widget create window](#open-create-widget)
 
 * [Open the application widget edit window](#open-edit-widget)
 
 * [Remove widget](#remove-widget)

## Getting Started

### 1. Include SDK
First include Elfsight Embed SDK in your environment

#### Script?
Include with our CDN

```html
<script src="https://elfsight.com/embed-sdk.js"></script>
```

And use right on your page

```js
window.ElfsightEmbedSDK.METHOD()
```

#### Package Manager
Include out package from npmjs

```bash
npm install --save-dev @elfsight/embed-sdk
```

And use as dependency

```js
// ES6
import * as ElfsightEmbedSDK from '@elfsight/embed-sdk';
// or
import { displayCatalog } from '@elfsight/embed-sdk';
```

### 2. Display Applications Catalog
Output an Catalog with component [Applications Catalog](#applications-catalog):

 * Set the `container`, there is catalog will be rendered 
 * Set the `callback`, what is need to do, when user created the widget 
 * Set up the additional `options` for appearance

```js
const container = document.querySelector('#elfsight-catalog-container');
const callback = function(response) {
    // saving logic (3. Operate Widget)
};
const options = {

};

ElfsightEmbedSDK.displayCatalog(container, callback, options);
```

### 3. Operate Widget
DESCRIPTION

When user creates a widget, use receive in callback the following data:

```js
{
    id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    url: 'https://apps.elfsight.com/widget/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    code: '<div class="elfsight-app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"></div>',
    element: div.elfsight-app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, // instanceof HTMLElement
    app: 'application-alias'
}
```

#### 3.1. Save users widget
Save the widget

#### 3.2. Display widget for user
Show the widget

### 4. Display Widget Management Panel
For the user to be able to control his widget, you need to output the Widget Management Panel with component [Widget Management Panel](#widget-management-panel) next to widget in your backend.

### 5. Affiliate Program
Affiliate Program Description, [link](https://elfsight.com/affiliate-program/)

For set up the referral parameter use the method:

```js
ElfsightEmbedSDK.setReferral('');
``` 
 
Right after including SDK

## UI Components

### Applications Catalog
DESCRIPTION

![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/catalog.jpg)
[![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/button-jsfiddle.png)](https://jsfiddle.net/elfsight/3vzabkw7/)

<details>
<summary><code>ElfsightEmbedSDK.displayCatalog(container, callback, options)</code></summary>

####
```js
const container = document.querySelector('#elfsight-catalog-container');
const callback = function(response) {
    // saving logic
};
const options = {

};

ElfsightEmbedSDK.displayCatalog(container, callback, options);
```
</details>

<details>
<summary>OPTIONS</summary>

####
| option              | type    | default        | description                                |
| --------------------| ------- | -------------- | ------------------------------------------ |
| `title`             | string  | `'Add Widget'` |                                            |
| `searchEnable`      | boolean | `true`         |                                            |
| `searchPlaceholder` | string  | `''`           |                                            |
| `height`            | string  | `''`           |                                            |
| `category`          | string  | `''`           |                                            |
| `promo`             | boolean | `false`        |                                            |
| `promoReferral`     | string  | `''`           |                                            |

`category` option available values can be obtained from [public API request](https://apps.elfsight.com/api/v1/public/categories)
</details>

### Application Card
DESCRIPTION

![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/card.jpg)
[![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/button-jsfiddle.png)](https://jsfiddle.net/elfsight/yrdm45e0/)

<details>
<summary><code>ElfsightEmbedSDK.displayCard(container, callback, options)</code></summary>

####
```js
const container = document.querySelector('#elfsight-app-card-container');
const callback = function(response) {
    // saving logic
};
const options = {
    appAlias: '' // required
};

ElfsightEmbedSDK.displayCard(container, callback, options);
```
</details>

<details>
<summary>OPTIONS</summary>

####
| option          | type    | default | description                         |
| --------------- | ------- | ------- | ----------------------------------- |
| `appAlias`      | string  | `''`    |                                     |
| `buttonText`    | string  | `'ADD'` | Set up the text for button on hover |
| `buttonIcon`    | string  | `'add'` | Set up the icon for button on hover |
| `promo`         | boolean | `false` |                                     |
| `promoReferral` | string  | `''`    |                                     |
</details>

### Widget Management Panel
DESCRIPTION

![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/panel.jpg)
[![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/button-jsfiddle.png)](https://jsfiddle.net/elfsight/t63a9vcq/)

<details>
<summary><code>ElfsightEmbedSDK.displayPanel(container, callbacks, options)</code></summary>

####
```js
const container = document.querySelector('#elfsight-widget-panel-container');
const callbacks = {
    onEdit: function(response) {
        // on edit logic
    },
    onRemove: function(response) {
        // on remove logic
    }
};
const options = {
    widgetId: '' // required
};

ElfsightEmbedSDK.displayPanel(container, callbacks, options);
```
</details>

<details>
<summary>OPTIONS</summary>

####
| option     | type    | default     | description                                 
| ---------- | ------- | ----------- | ------------------------------------------ |
| `widgetId` | string  | `null`      | **Required**. Indicates the managed widget |
| `size`     | string  | `'big'`     |                                            |
| `color`    | string  | `'#fafafa'` | Panel background color                     |

`size` option available values:
 * `'big'`
 * `'medium'`
 * `'small'`
</details>

### Buttons
DESCRIPTION

![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/button.jpg)
[![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/button-jsfiddle.png)](https://jsfiddle.net/elfsight/oj168u3f/)

<details>
<summary><code>ElfsightEmbedSDK.displayButton(container, callback, options)</code></summary>

####
```js
const container = document.querySelector('#elfsight-button-container');
const callback = function(response) {
    // button callback logic
};
const options = {

};

ElfsightEmbedSDK.displayButton(container, callback, options);
```
</details>

<details>
<summary>OPTIONS</summary>

####
| option      | type    | default               | description                                        |
| ----------- | ------- | --------------------- | -------------------------------------------------- |
| `type`      | string  | `'create'`            | **Required**. Indicates the button action.         |
| `widgetId`  | string  | `null`                | **Required** for button types 'edit' and 'remove'. |
| `size`      | string  | `'big'`               |                                                    |
| `colors`    | array   | `['#f93262', '#fff']` |                                                    |
| `text`      | string  | `'Add Widget'`        |                                                    |
| `icon`      | string  | `'glyph'`             |                                                    |
| `copyright` | boolean | `true`                | Disable the copyright 'by Elfsight'                |
         
`type` option available values:
 * `'create'`
 * `'edit'`
 * `'remove'`
                                           
`size` option available values:
 * `'big'`
 * `'medium'`
 * `'small'`
 
`icon` option available values:
 * `'glyph'`
 * `'plus'`
 * `'edit'`
 * `'search'`
 * `'close'`
 * `'trash'`
</details>

#### Add Button
Predefined button with type `'create'`

<details>
<summary><code>ElfsightEmbedSDK.displayCreateButton(container, callback, options)</code></summary>

####
```js
const container = document.querySelector('#elfsight-button-container');
const callback = function(response) {
    // button callback logic
};
const options = {
    appAlias: '' // specify application optionally, display the popup 
};

ElfsightEmbedSDK.displayCreateButton(container, callback, options);
```
</details>

#### Edit Button
Predefined button with type `'edit'`

<details>
<summary><code>ElfsightEmbedSDK.displayEditButton(container, callback, options)</code></summary>

####
```js
const container = document.querySelector('#elfsight-button-container');
const callback = function(response) {
    // button callback logic
};
const options = {
    widgetId: '' // required
};

ElfsightEmbedSDK.displayEditButton(container, callback, options);
```
</details>

#### Remove Button
Predefined button with type `'remove'`

<details>
<summary><code>ElfsightEmbedSDK.displayRemoveButton(container, callback, options)</code></summary>

####
```js
const container = document.querySelector('#elfsight-button-container');
const callback = function(response) {
    // button callback logic
};
const options = {
    widgetId: '' // required
};

ElfsightEmbedSDK.displayRemoveButton(container, callback, options);
```
</details>

### Application Preview
DESCRIPTION

![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/preview.jpg)
[![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/button-jsfiddle.png)](https://jsfiddle.net/elfsight/fmdsL54h/)

<details>
<summary><code>ElfsightEmbedSDK.displayPreview(container, options)</code></summary>

####
```js
const container = document.querySelector('#elfsight-application-preview-container');
const options = {
    appAlias: '' // required
};

ElfsightEmbedSDK.displayPreview(container, options);
```
</details>

<details>
<summary>OPTIONS</summary>

####
| option          | type    | default     | description                                 
| --------------- | ------- | ----------- | ------------------------------------------------- |
| `appAlias`      | string  | `null`      | **Required**. Indicates the previewed application |
| `ref`           | string  | `''`        | Set up your referral id to earn money!            |
| `hideTemplates` | boolean | `false`     | Enable/Disable templates in preview               |
| `templateId`    | string  | `null`      |                                                   |

`templateId` option available values can be obtained from [public API request](https://apps.elfsight.com/api/v1/public/applications)
</details>


## API Methods
DESCRIPTION 

The following API methods are used in UI components, but you can use it directly to build UI yourself

### Get the applications list

<details>
<summary><code>ElfsightEmbedSDK.getApplications()</code></summary>

####
```js
const callback = function(response) {
    // logic on 
};

ElfsightEmbedSDK.getApplications().then(callback);
```
</details>

### Get the specific application

<details>
<summary><code>ElfsightEmbedSDK.getApplication(appAlias)</code></summary>

####
```js
const appAlias = 'instashow'; // required. alias for specified application
const callback = function(response) {
    // logic on
};

ElfsightEmbedSDK.getApplication(appAlias).then(callback);
```
</details>

### Open the widget create window

<details>
<summary><code>ElfsightEmbedSDK.createWidget(appAlias).then(callback)</code></summary>

####
```js
const appAlias = 'instashow'; // optional. alias for specified application, displays the popup if not specified
const callback = function(response) {
    // logic on
};

ElfsightEmbedSDK.createWidget(appAlias).then(callback);
```
</details>

### Open the widget edit window

<details>
<summary><code>ElfsightEmbedSDK.editWidget(widgetId).then(callback)</code></summary>

####
```js
const widgetId = ''; // required. indicated the managed widget
const callback = function(response) {
    // logic on
};

ElfsightEmbedSDK.editWidget(widgetId).then(callback);
```
</details>

### Call the widget remove

Method only shows the confirm, all removing logic you manage in the callback. 

<details>
<summary><code>ElfsightEmbedSDK.removeWidget(widgetId).then(callback)</code></summary>

####
```js
const widgetId = ''; // required. indicated the managed widget
const callback = function(response) {
    // logic on
};

ElfsightEmbedSDK.removeWidget(widgetId).then(callback);
```
</details>
