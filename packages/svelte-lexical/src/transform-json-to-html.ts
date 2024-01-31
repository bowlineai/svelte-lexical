import lexicalHeadless from '@lexical/headless';
import lexicalHtml from '@lexical/html';
import pkglist from '@lexical/list';
import pkgrich from '@lexical/rich-text';
import {HorizontalRuleNode} from './core/plugins/HorizontalRuleNode';
import {ImageNode} from './core/plugins/Image/ImageNode';

const {HeadingNode, QuoteNode} = pkgrich;
const {ListItemNode, ListNode} = pkglist;
const {createHeadlessEditor} = lexicalHeadless;
const {$generateHtmlFromNodes} = lexicalHtml;

const getHtmlFromLexicalJSON = function (editorStateJSON: string) {
  const editor = createHeadlessEditor({
    nodes: [
      ListNode,
      ListItemNode,
      HeadingNode,
      QuoteNode,
      HorizontalRuleNode,
      ImageNode,
    ],
  });

  editor.setEditorState(editor.parseEditorState(editorStateJSON));

  const editorState = editor.getEditorState();
  return editorState.read((): string => {
    // Once you have the DOM instance it's easy to generate LexicalNodes.
    const htmlString = $generateHtmlFromNodes(editor);
    return htmlString;
  });
};

const transformLexicalJSONToHTML = (state: string): string => {
  const html = getHtmlFromLexicalJSON(state);
  return html;
};

export {transformLexicalJSONToHTML};
