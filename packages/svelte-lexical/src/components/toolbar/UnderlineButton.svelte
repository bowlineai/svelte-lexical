<script lang="ts">
  import {getContext} from 'svelte';
  import pkgLexical from 'lexical';
  const {FORMAT_TEXT_COMMAND} = pkgLexical;
  import type {Writable} from 'svelte/store';
  import {getActiveEditor, getIsEditable} from '../../core/composerContext';
  import {IS_APPLE} from '../../environment/environment';
  const activeEditor = getActiveEditor();
  const isEditable = getIsEditable();
  const isUnderline: Writable<boolean> = getContext('isUnderline');
</script>
<button
  disabled={!isEditable}
  on:click={() => {
    $activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
  }}
  class={'toolbar-item spaced ' + ($isUnderline ? 'active' : '')}
  title={IS_APPLE ? 'Underline (⌘U)' : 'Underline (Ctrl+U)'}
  type="button"
  aria-label={`Format text to underlined. Shortcut: ${
    IS_APPLE ? '⌘U' : 'Ctrl+U'
  }`}>
  <i class="format underline" />
</button>