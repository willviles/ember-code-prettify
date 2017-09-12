import Component from '@ember/component';
import { get } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  codePrettify: inject(),

  didRender() {
    get(this, 'codePrettify').prettify();
  }
});
