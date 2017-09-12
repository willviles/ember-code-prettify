Ember Code Prettify ![Download count all time](https://img.shields.io/npm/dt/ember-code-prettify.svg) [![npm](https://img.shields.io/npm/v/ember-code-prettify.svg)](https://www.npmjs.com/package/ember-code-prettify)
======

Ember Code Prettify exposes a service to render [Google Code Prettify](https://github.com/google/code-prettify) syntax highlighting in Ember.js applications.

## Installation

`ember install ember-code-prettify`

## Configuration

With no configuration, Ember Code Prettify will use the default skin and languages. The following config imports the css & yaml languages extensions and uses the desert skin:

```js
// config/environment.js
ENV['ember-code-prettify'] = {
  languages: ['css', 'yaml'],
  skin: 'desert'
};
```

## Usage

Ember Code Prettify exposes a service `codePrettify`. It can be used to paint the syntax highlighting in routes and components.

Firstly ensure your code snippet is formatted like so:

```html
<pre class="prettyprint lang-js">
  console.log('This will be painted');
</pre>
```

Then get prettify to render using:

```js
get(this, 'codePrettify').prettify();
```

### Routes

If code snippets are added statically to a route template, simply fire Ember Code Prettify in an `afterRender` hook.

```javascript
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { inject } from '@ember/service';

export default Route.extend({
  codePrettify: inject(),

  init() {
    scheduleOnce('afterRender', this, function() {
      get(this, 'codePrettify').prettify();
    });
  }
});
```

### Components

For code snippets added to component templates, use the `didRender` hook. Be warned, this hook will fire on any subsequent render of the component.

```javascript
import Component from '@ember/component';
import { get } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  codePrettify: inject(),

  didRender() {
    get(this, 'codePrettify').prettify();
  }
});
```

## Contributing

### Installation

* `git clone <repository-url>` this repository
* `cd ember-code-prettify`
* `npm install`

### Test App

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`
