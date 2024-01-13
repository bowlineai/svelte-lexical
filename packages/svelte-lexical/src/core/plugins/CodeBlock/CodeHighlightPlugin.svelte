<script lang="ts">
  import pkgcode from '@lexical/code';
  const {registerCodeHighlighting} = pkgcode;
  import {onMount} from 'svelte';
  import {getEditor} from '../../composerContext';
  const editor = getEditor();
  onMount(() => {
    return registerCodeHighlighting(editor);
  });
</script>