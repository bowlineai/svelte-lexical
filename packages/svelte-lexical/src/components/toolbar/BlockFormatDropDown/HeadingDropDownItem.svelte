<script lang="ts">
  import DropDownItem from '../../generic/dropdown/DropDownItem.svelte';
  import pkgLexical from 'lexical';
  const {
    $getSelection: getSelection,
    $isRangeSelection: isRangeSelection,
    DEPRECATED_$isGridSelection,
  } = pkgLexical;
  import type {HeadingTagType} from '@lexical/rich-text';
  import pkgrich from '@lexical/rich-text';
  const {
    $createHeadingNode: createHeadingNode,
  } = pkgrich;
  import pkgselection from '@lexical/selection';
  const {$setBlocksType: setBlocksType} = pkgselection;
  import type {Writable} from 'svelte/store';
  import type {blockTypeToBlockName} from './blockTypeToBlockName';
  import {getContext} from 'svelte';
  import {getEditor} from '../../../core/composerContext';
  export let headingSize: HeadingTagType;
  const blockType: Writable<keyof typeof blockTypeToBlockName> =
    getContext('blockType');
  const editor = getEditor();
  const formatHeading = (headingSize: HeadingTagType) => {
    if ($blockType !== headingSize) {
      editor.update(() => {
        const selection = getSelection();
        if (
          isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          setBlocksType(selection, () => createHeadingNode(headingSize));
        }
      });
    }
  };
</script>
<DropDownItem
  class={'item ' +
    ($blockType === headingSize ? 'active dropdown-item-active' : '')}
  on:click={() => formatHeading(headingSize)}>
  <i class="icon {headingSize}" />
  <span class="text">Heading {headingSize.charAt(1)}</span>
</DropDownItem>