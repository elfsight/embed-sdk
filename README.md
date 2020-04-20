# Elfsight Embed SDK

![](https://img.shields.io/badge/build-passed-brightgreen?style=flat-square)
![](https://img.shields.io/npm/v/@elfsight/embed-sdk?style=flat-square)
![](https://img.shields.io/npm/dt/@elfsight/embed-sdk?style=flat-square)

Elfsight Embed SDK is a tool to integrate [Elfsight 50+ widgets](http://elfsight.com/widgets) catalog directly on your platform (website theme, website/page builder, etc). Social feeds, reviews, live chats, forms, galleries and e-commerce widgets offered by Elfsight will significantly extend the functionality of your platform. Embedding the catalog will let you earn even more with the [Elfsight Affiliate Program](https://elfsight.com/affiliate-program/).

## Contents

[Getting Started](#getting-started)

 * [1. Add SDK](#1-add-sdk)

 * [2. Embed the widgets](#2-embed-the-widgets)

 * [3. Process the user’s configured widget](#3-process-the-users-configured-widget)

 * [4. Allows the users to manage their widgets](#4-allows-the-users-to-manage-their-widgets)

 * [5. Link Elfsight Affiliate Program](#5-link-elfsight-affiliate-program)

[UI Components](#ui-components)

 * [Apps Catalog](#apps-catalog)

 * [App Card](#app-card)

 * [Widget Management Panel](#widget-management-panel)

 * [Buttons](#buttons)

[API Methods](#api-methods)

 * [Get the apps list](#get-the-apps-list)

 * [Get the specific app](#get-the-specific-app)

 * [Set affiliate referral ID](#set-affiliate-referral-id)

 * [Open Create Widget window](#open-create-widget-window)

 * [Open Edit Widget window](#open-edit-widget-window)

 * [Call Remove Widget](#call-remove-widget)

 * [Display a Widget](#display-a-widget)

## Getting Started

### 1. Add SDK
First of all, add Elfsight Embed SDK to your environment. Please, make sure that you’ve added it both to the area where a users will configure their widgets and to the area where it has to be displayed.

You can add Embed SDK in two ways:

* Through our CDN:

```html
<script src="https://elfsight.com/embed-sdk.js"></script>
```

* As npm package:

```bash
npm install --save @elfsight/embed-sdk
```

Next, you’ll need to import the Embed package. If you’re using CDN, you don’t have to import the package.

```js
import { ElfsightEmbedSDK } from '@elfsight/embed-sdk';
```

### 2. Embed the widgets
Depending on your use-case, you can embed the widgets via the various components and API provided in the SDK. Let’s consider an example of embedding the [Apps Catalog](#apps-catalog) component.

Use the code below to embed the component to the right place in your platform:

```js
const container = document.querySelector('#elfsight-catalog-container');
const callback = function(response) {
    // saving logic (3. Process the user’s configured widget)
};
const options = {

};

ElfsightEmbedSDK.displayCatalog(container, callback, options);
```

1. Set the `container` to render the catalog to.
2. Pass the `callback` function, that will be called with the data about the user’s configured widget.
3. Configure component `options`, if necessary.

### 3. Process the user’s configured widget
After a user’s widget is configured, it will call the callback function described in point 2, with the following data:

```js
{
    id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    url: 'https://apps.elfsight.com/widget/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    code: '<div class="elfsight-app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"></div>',
    element: div.elfsight-app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, // instanceof HTMLElement
    app: 'application-alias'
}
```

#### 3.1. Save the widget data in your environment
You need to save the widget data in your database in order to be able to do the following:

* display the widget

* allow the users to interact with the widget

* embed components to manage the widget

#### 3.2. Display the widget
To display a user-configured widget you need to add the widget data element inside the callback to the place where you want to display the widget.

Extend the example from previous step:

```html
<div id="widget-container"></div>

<script>
    // some kind of request to backend where is your saved the user widget
    const widget = fetch('/getUserWidget/');
    // example of stored widget data
    // {
    //     user_id: 1234,
    //     id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    //     url: 'https://apps.elfsight.com/widget/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    //     code: '<div class="elfsight-app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"></div>',
    //     app: 'application-alias'
    // };

    const widgetContainer = document.querySelector('#widget-container');

    ElfsightEmbedSDK.displayWidget(widgetContainer, widget.id);
</script>
```

Please, make sure that you’ve added Embed SDK to the page with the widget.

### 4. Allows the users to manage their widgets
To allow your users to edit or remove their widgets, Elfsight Embed SDK provides [Edit](#edit-button) and [Remove](#remove-button) buttons or [Widget Management Panel](#widget-management-panel), that allows for all possible widget manipulations. To display the Widget Management Panel, add the code below next to the widget element:

Example:

```html
<div id="widget-panel-container"></div>

<!-- Here's the widget you've added in previous step -->
<div id="widget-container">
    <div class="elfsight-app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"></div>
</div>

<script>
    const panelContainer = document.getElementById('widget-panel-container');
    const callbacks = {
        onEdit: () => {
            console.log('edited!')
        },
        onRemove: () => {
            console.log('removed!')
        }
    };
    const options = {
        widgetId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' // Get the user widget id from your database
    };

    ElfsightEmbedSDK.displayPanel(container, callbacks, options);
</script>
```

### 5. Link Elfsight Affiliate Program
Earn a termless 30% with each paid subscription made via your integration. Learn more about the [affiliate program](https://elfsight.com/affiliate-program/).

1. Sign up to the program at [https://elfsight.com/affiliate-program/](https://elfsight.com/affiliate-program/)

2. Wait for confirmation from Elfsight

3. Get your referral ID and pass it to SDK right after adding it to your platform:

```js
ElfsightEmbedSDK.setReferral('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
```

## UI Components

### Apps Catalog
This component displays the complete list of Elfsight widgets. Filter by category and search functionality are also provided. Configure this component in one of two ways: let your users open an apps’ editor on a click on its card, or direct them to our website.

![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/demo-catalog.jpg)
[![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/button-jsfiddle.svg?sanitize=true)](https://jsfiddle.net/elfsight/3vzabkw7/)

<details>
<summary><code>ElfsightEmbedSDK.displayCatalog(container, callback, options)</code></summary>

####
```js
const container = document.querySelector('#elfsight-catalog-container');
const callback = function(widget) {
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
| option              | type           | default           | description                                                                                                                   |
| --------------------| -------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `title`             | string         | `'Choose Widget'` | Enter the catalog title text                                                                                                  |
| `searchEnabled`     | boolean        | `true`            | Show/hide search field in the catalog                                                                                         |
| `searchPlaceholder` | string         | `''`              | Enter placeholder text for search field                                                                                       |
| `height`            | string         | `'auto'`          | Set the catalog height in pixels, set `'auto'` to display the catalog in full height                                          |
| `category`          | string         | `''`              | For cases when you need to display only one widget category, set the alias of the category here                               |
| `promoMode`         | boolean/string | `false`           | Specify the behavior of the catalog                                                                                           |
| `promoReferral`     | string         | `''`              | Add your referral id here (if you haven't done it earler with method [Set affiliate referral ID](#set-affiliate-referral-id)  |

Available values for `category` option can be obtained [here](https://apps.elfsight.com/api/v1/public/categories).

Available values for `promoMode` option:

 * `false`  - By default opens the apps.elfsight.com service in a new window to let your users create and select a widget. The selected widget returns as argument to the specified callback and then you can embed it to the required place.

 * `'link'` - Activate this mode to display the apps catalog on your website, and to refer your visitors to elfsight.com site to earn more with Elfsight Affiliate Program.

 * `'demo'` - Activate this mode to display the apps catalog and to open widget editor right on your website, and to refer your visitors to apps.elfsight.com dashboard to earn more with Elfsight Affiliate Program.

</details>

### App Card
Embed the card component to feature a specific Elfsight app. The editor where users can configure it will open up on a click.

![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/demo-card.jpg)
[![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/button-jsfiddle.svg?sanitize=true)](https://jsfiddle.net/elfsight/yrdm45e0/)

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
| option          | type           | default | description                                                                                                                  |
| --------------- | -------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `appAlias`      | string         | `''`    | **Required**. Set the app alias you want to display as a card                                                                |
| `buttonText`    | string         | `'ADD'` | Set hover button text                                                                                                        |
| `buttonIcon`    | string         | `'add'` | Set hover button icon                                                                                                        |
| `promoMode`     | boolean/string | `false` | Specify the behavior of the card                                                                                             |
| `promoReferral` | string         | `''`    | Add your referral id here (if you haven't done it earler with method [Set affiliate referral ID](#set-affiliate-referral-id) |

Available values for `appAlias` option can be obtained [here](https://apps.elfsight.com/api/v1/public/applications)

Available values for `promoMode` option:

 * `false`  - By default opens the apps.elfsight.com service in a new window to let your users create and select a widget. The selected widget returns as argument to the specified callback and then you can embed it to the required place.

 * `'link'` - Activate this mode to display the apps catalog on your website, and to refer your visitors to elfsight.com site to earn more with Elfsight Affiliate Program.

 * `'demo'` - Activate this mode to display the apps catalog and to open widget editor right on your website, and to refer your visitors to apps.elfsight.com dashboard to earn more with Elfsight Affiliate Program.

Available values for `buttonIcon` option:

 * `'glyph'`

 * `'plus'`

 * `'edit'`

 * `'search'`

 * `'close'`

 * `'trash'`

</details>

### Widget Management Panel
Add this panel alongside the user’s widget in your admin section. This will enable the user to manage the widget (edit, remove, etc).

![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/demo-panel.jpg)
[![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/button-jsfiddle.svg?sanitize=true)](https://jsfiddle.net/elfsight/t63a9vcq/)

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
| option     | type    | default     | description                                                      |
| ---------- | ------- | ----------- | ---------------------------------------------------------------- |
| `widgetId` | string  | `null`      | **Required**. Set a user's widget id to be managed in this panel |
| `size`     | string  | `'big'`     | Select one of the available sizes                                |
| `color`    | string  | `'#fafafa'` | Set panel background color                                       |

Available values for `size` option:

 * `'big'`

 * `'medium'`

 * `'small'`

</details>

### Buttons
This component includes 3 buttons:
 * **Create** - opens the app catalog to let users choose an app,
 * **Edit** - opens the widget editor window,
 * **Remove** - remove widget from website.

![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/demo-buttons.jpg)
[![](https://raw.githubusercontent.com/elfsight/embed-sdk/master/assets/button-jsfiddle.svg?sanitize=true)](https://jsfiddle.net/elfsight/oj168u3f/)

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
| option            | type        | default               | description                                       |
| ----------------- | ----------- | --------------------- | ------------------------------------------------- |
| `type`            | string      | `'create'`            | **Required**. Indicates the button action         |
| `widgetId`        | string      | `null`                | **Required** for button types 'edit' and 'remove' |
| `size`            | string      | `'big'`               | Select one of the available sizes                 |
| `backgroundColor` | string      | `'#f93262'`           | Set button background color                       |
| `backgroundColor` | string      | `'#f93262'`           | Set button text color                             |
| `backgroundColor` | string/bool | `false`               | Set button border color (`false` for transparent) |
| `text`            | string      | `'Add Widget'`        | Set button text                                   |
| `icon`            | string      | `'glyph'`             | Select one of the available icons                 |

Available values for `type` option:

 * `'create'`

 * `'edit'`

 * `'remove'`


Available values for `size` option:

 * `'big'`

 * `'medium'`

 * `'small'`


Available values for `icon` option:

 * `'glyph'`

 * `'plus'`

 * `'edit'`

 * `'search'`

 * `'close'`

 * `'trash'`

</details>

#### Create Button
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
    appAlias: '' // set app alias to create a specific app. leave it blank to open app selection popup
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


## API Methods
Use the API endpoints to create your own components or interface to interact with Elfsight widgets.

### Get the apps list
Use this endpoint to get the list of available apps with the following data:

 * `name`

 * `alias`

 * `caption`

 * `public_id`

 * `icon`

 * `banner`

 * `category_id`

 * `tags`

 * `promo_url`

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

### Get the specific app
Use this endpoint to get the data for a specific app

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

### Set affiliate referral ID
Add your affiliate referral ID to collect affiliate fees for the subscriptions made with SDK. Learn more about [Elfsight Affiliate program](https://elfsight.com/affiliate-program/)

<details>
<summary><code>ElfsightEmbedSDK.setReferral('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')</code></summary>

####
```js
const referralID = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

ElfsightEmbedSDK.setReferral(referralID);
```
</details>

### Open Create Widget window
Use this endpoint to open a window there your user can configure and create their widget.

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

### Open Edit Widget window
Use this endpoint to open a window there your user can configure a previously created widget.

<details>
<summary><code>ElfsightEmbedSDK.editWidget(widgetId).then(callback)</code></summary>

####
```js
const widgetId = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'; // required. set the managed widget
const callback = function(response) {
    // logic on
};

ElfsightEmbedSDK.editWidget(widgetId).then(callback);
```
</details>

### Call Remove Widget
Calling this method requests user confirmation of widget removal. If the user confirms, the widget removal logic, you have set in the `callback` is executed.

<details>
<summary><code>ElfsightEmbedSDK.removeWidget(widgetId).then(callback)</code></summary>

####
```js
const widgetId = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'; // required. set the managed widget
const callback = function(response) {
    // logic on
};

ElfsightEmbedSDK.removeWidget(widgetId).then(callback);
```
</details>

### Display a Widget
Embed the specified widget into container.

<details>
<summary><code>ElfsightEmbedSDK.displayWidget(container, widgetId)</code></summary>

####
```js
const container = document.querySelector('#elfsight-widget-container');
const widgetID = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

ElfsightEmbedSDK.displayWidget(container, widgetID);
```
</details>
