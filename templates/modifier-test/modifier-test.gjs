import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import {{name.camel}} from '{{package.name}}/modifiers/{{name.path}}';
import { setupRenderingTest } from '{{testHelpersImportPath}}';

module('Integration | Modifier | {{name.camel}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <div {{name.camelCurlyBrackets}}></div>
      </template>
    );

    assert.ok(true);
  });
});
