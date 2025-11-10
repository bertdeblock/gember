import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import {{name.camel}} from '{{package.name}}/helpers/{{name.path}}';
import { setupRenderingTest } from '{{testHelpersImportPath}}';

module('Integration | Helper | {{name.camel}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const inputValue = '1234';

    await render(<template>\{{{{name.camel}} inputValue}}</template>);

    assert.dom().hasText('1234');
  });
});
