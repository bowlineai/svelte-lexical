<script lang="ts">
  import pkgLexical from 'lexical';
  const {
     $getSelection: getSelection,
     $isRangeSelection: isRangeSelection,
    COMMAND_PRIORITY_EDITOR,
    } = pkgLexical;
  import pkgutils from '@lexical/utils';
  const {  $insertNodeToNearestRoot: insertNodeToNearestRoot,  } = pkgutils;
  import {onMount} from 'svelte';
  import {
    $createHorizontalRuleNode as createHorizontalRuleNode,
    INSERT_HORIZONTAL_RULE_COMMAND,
  } from './HorizontalRuleNode';
  import {getEditor} from '../composerContext';
  const editor = getEditor();
  onMount(() => {
    editor.registerCommand(
      INSERT_HORIZONTAL_RULE_COMMAND,
      (type) => {
        const selection = getSelection();
        if (!isRangeSelection(selection)) {
          return false;
        }
        const focusNode = selection.focus.getNode();
        if (focusNode !== null) {
          const horizontalRuleNode = createHorizontalRuleNode();
          insertNodeToNearestRoot(horizontalRuleNode);
        }
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  });
</script>