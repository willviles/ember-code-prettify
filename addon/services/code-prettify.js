import Service from '@ember/service';

export default Service.extend({
  prettify() {
    if (typeof FastBoot !== 'undefined') { return; }
    window.PR.prettyPrint();
  }
});
