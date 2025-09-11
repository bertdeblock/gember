import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import {{name.pascal}} from '{{package.name}}/components/{{name.path}}';
import { setupRenderingTest } from '{{testHelpersImportPath}}';

module('Integration | Component | {{name.pascal}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><{{name.pascal}} /></template>);

    assert.dom().hasText('');

    await render(
      <template>
        <{{name.pascal}}>
          template block text
        </{{name.pascal}}>
      </template>
    );

    assert.dom().hasText('template block text');
  });
});
