<script lang="ts">
  import type {LexicalEditor} from 'lexical';
  import pkgtext from '@lexical/text';
  const {  $canShowPlaceholderCurry: canShowPlaceholderCurry,  } = pkgtext;
  import {getEditor} from '../composerContext';
  import {onMount} from 'svelte';
  import pkgutils from '@lexical/utils';
  const {mergeRegister} = pkgutils;
  export let className = 'Placeholder__root';
  const editor = getEditor();
  let canShowPlaceHolder = true;
  onMount(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        canShowPlaceHolder = canShowPlaceholderFromCurrentEditorState(editor);
      }),
      editor.registerEditableListener(() => {
        canShowPlaceHolder = canShowPlaceholderFromCurrentEditorState(editor);
      }),
    );
  });
  function canShowPlaceholderFromCurrentEditorState(
    editor: LexicalEditor,
  ): boolean {
    const currentCanShowPlaceholder = editor
      .getEditorState()
      .read(canShowPlaceholderCurry(editor.isComposing()));
    return currentCanShowPlaceholder;
  }
</script>
{#if canShowPlaceHolder}
  <div class={className}>
    <slot />
  </div>
{/if}
<style>
  .Placeholder__root {
    font-size: 15px;
    color: #999;
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    top: 8px;
    left: 10px; /* 10px instead of 28px as we don't have the re-arrange handle implemented yet*/
    right: 28px;
    user-select: none;
    white-space: nowrap;
    display: inline-block;
    pointer-events: none;
  }
</style>