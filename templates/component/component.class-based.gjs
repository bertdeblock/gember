import Component from '@glimmer/component';

{{#if args.namedExport}}export{{else}}export default{{/if}} class {{name.pascal}} extends Component {
  <template>\{{yield}}</template>
}
