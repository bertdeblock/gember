import { module, test } from 'qunit';
import { setupTest } from '{{testHelpersImportPath}}';

module('Unit | Service | {{name.pascal}}', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const service = this.owner.lookup('service:{{name.path}}');

    assert.ok(service);
  });
});
