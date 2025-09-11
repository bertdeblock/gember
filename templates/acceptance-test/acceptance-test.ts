import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from '{{testHelpersImportPath}}';

module('Acceptance | {{name.path}}', function (hooks) {
  setupApplicationTest(hooks);

  test('it visits /{{name.path}}', async function (assert) {
    await visit('/{{name.path}}');

    assert.strictEqual(currentURL(), '/{{name.path}}');
  });
});
