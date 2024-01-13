<script lang="ts">
  import {onMount} from 'svelte';
  import lexicalRichText from '@lexical/rich-text';
  import Decorator from '../Decorator.svelte';
  import {getEditor} from '../composerContext';
  // workaround for CommonJS module
  const { registerRichText } = lexicalRichText;
  const editor = getEditor();
  // returns callback to unregister
  onMount(() => registerRichText(editor));
  // TODO: add Dragon support - registerDragonSupport(editor)
</script>
<Decorator />