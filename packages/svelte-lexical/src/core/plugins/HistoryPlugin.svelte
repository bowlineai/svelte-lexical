<script lang="ts">
  import {onMount} from 'svelte';
  import pkghistory from '@lexical/history';
  import type {HistoryState} from '@lexical/history';
  const {
    createEmptyHistoryState,
    registerHistory,
  } = pkghistory;
  import type {LexicalEditor} from 'lexical';
  import {getEditor} from '../composerContext';
  const editor: LexicalEditor = getEditor();
  export let externalHistoryState: HistoryState = createEmptyHistoryState();
  export let delay = 1000;
  // returns callback to unregister
  onMount(() => registerHistory(editor, externalHistoryState, delay));
</script>