import { module, test } from 'qunit';
import { setupTest } from '{{testHelpersImportPath}}';

module('Unit | Controller | {{name.pascal}}', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:{{name.path}}');

    assert.ok(controller);
  });
});
