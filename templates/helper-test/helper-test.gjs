import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from '{{package.name}}/tests/helpers';

module('Integration | Helper | {{name.camel}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const inputValue = '1234';

    await render(<template>\{{{{name.camel}} inputValue}}</template>);

    assert.dom().hasText('1234');
  });
});
