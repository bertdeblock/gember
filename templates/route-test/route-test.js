import { module, test } from 'qunit';
import { setupTest } from '{{testHelpersImportPath}}';

module('Unit | Route | {{name.pascal}}', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:{{name.path}}');

    assert.ok(route);
  });
});
