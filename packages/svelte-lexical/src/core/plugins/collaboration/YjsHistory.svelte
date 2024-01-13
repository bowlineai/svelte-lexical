<script lang="ts">
  import pkgutils from '@lexical/utils';
  const {mergeRegister} = pkgutils;
  import type {Binding} from '@lexical/yjs';
  import pkgyjs from '@lexical/yjs';
  const {createUndoManager} = pkgyjs;
  import type {LexicalEditor} from 'lexical';
  import pkgLexical from 'lexical';
  const {
    COMMAND_PRIORITY_EDITOR,
    REDO_COMMAND,
    UNDO_COMMAND,
  } = pkgLexical;
  import {onMount} from 'svelte';
  export let editor: LexicalEditor;
  export let binding: Binding;
  const undoManager = createUndoManager(binding, binding.root.getSharedType());
  onMount(() => {
    const undo = () => {
      undoManager.undo();
    };
    const redo = () => {
      undoManager.redo();
    };
    return mergeRegister(
      editor.registerCommand(
        UNDO_COMMAND,
        () => {
          undo();
          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand(
        REDO_COMMAND,
        () => {
          redo();
          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    );
  });
  export function clearHistory() {
    undoManager.clear();
  }
</script>