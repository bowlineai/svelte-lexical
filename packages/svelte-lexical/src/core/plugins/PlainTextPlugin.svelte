<script lang="ts">
  import {onMount} from 'svelte';
  import lexicalPlainText from '@lexical/plain-text';
  import {getEditor} from '../composerContext';

  // workaround for CommonJS module
  const { registerPlainText } = lexicalPlainText;

  const editor = getEditor();

  // returns callback to unregister
  onMount(() => registerPlainText(editor));

  // TODO: add Dragon support - registerDragonSupport(editor)
</script>
