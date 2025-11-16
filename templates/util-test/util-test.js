import {{name.camel}} from '{{package.name}}/utils/{{name.path}}';
import { module, test } from 'qunit';

module('Unit | Util | {{name.camel}}', function () {
  test('it works', function (assert) {
    const result = {{name.camel}}();

    assert.ok(result);
  });
});
