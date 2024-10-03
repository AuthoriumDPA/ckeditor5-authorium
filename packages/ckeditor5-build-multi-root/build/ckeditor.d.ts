/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * This file is the Authorium Entry point for the CKEditor integration
 */
import { MultiRootEditor as MultiRootEditorBase } from '@ckeditor/ckeditor5-editor-multi-root';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autosave } from '@ckeditor/ckeditor5-autosave';
import { AnnotationsUIs, Comments, WideSidebar } from '@ckeditor/ckeditor5-comments';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Bold, Italic, Strikethrough, Underline, Subscript, Superscript } from '@ckeditor/ckeditor5-basic-styles';
import { CKFinderUploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder';
import { List, ListProperties, TodoList } from '@ckeditor/ckeditor5-list';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { MergeFields } from '@ckeditor/ckeditor5-merge-fields';
import { Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, ImageUpload, ImageTextAlternative, PictureEditing } from '@ckeditor/ckeditor5-image';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Mention } from '@ckeditor/ckeditor5-mention';
import { PageBreak } from '@ckeditor/ckeditor5-page-break';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { PresenceList, RealTimeCollaborativeComments, RealTimeCollaborativeEditing, RealTimeCollaborativeTrackChanges } from '@ckeditor/ckeditor5-real-time-collaboration';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import { Table, TableCaption, TableCellProperties, TableColumnResize, TableProperties, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { TrackChanges, TrackChangesData } from '@ckeditor/ckeditor5-track-changes';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { AIAssistant, OpenAITextAdapter } from '@ckeditor/ckeditor5-ai';
import { type LanguageConfig, MentionCustomization } from './helpers.js';
interface MultirootEditorConfig extends EditorConfig {
    codeBlock: {
        languages: Array<LanguageConfig>;
    };
}
declare class CustomOpenAITextAdapter extends OpenAITextAdapter {
    prepareMessages(query: any, context: any, actionId: string): Promise<any>;
    sendRequest(requestData: any): Promise<any>;
}
declare class Editor extends MultiRootEditorBase {
    static builtinPlugins: (typeof Alignment | typeof Autosave | typeof TextTransformation | typeof AnnotationsUIs | typeof Paragraph | typeof Heading | typeof Autoformat | typeof BlockQuote | typeof Superscript | typeof Subscript | typeof Bold | typeof Italic | typeof Strikethrough | typeof Underline | typeof CKFinderUploadAdapter | typeof List | typeof ListProperties | typeof TodoList | typeof CloudServices | typeof Undo | typeof Essentials | typeof EasyImage | typeof FindAndReplace | typeof FontBackgroundColor | typeof FontColor | typeof FontFamily | typeof FontSize | typeof Highlight | typeof HorizontalLine | typeof MergeFields | typeof Image | typeof ImageCaption | typeof ImageResize | typeof ImageStyle | typeof ImageTextAlternative | typeof ImageToolbar | typeof ImageUpload | typeof Indent | typeof IndentBlock | typeof Link | typeof MediaEmbed | typeof Mention | typeof PageBreak | typeof PasteFromOffice | typeof RemoveFormat | typeof Table | typeof TableCaption | typeof TableCellProperties | typeof TableColumnResize | typeof TableProperties | typeof TableToolbar | typeof AIAssistant | typeof PictureEditing | typeof CustomOpenAITextAdapter | typeof Comments | typeof MentionCustomization | typeof PresenceList | typeof RealTimeCollaborativeComments | typeof RealTimeCollaborativeEditing | typeof RealTimeCollaborativeTrackChanges | typeof TrackChanges | typeof TrackChangesData | typeof WideSidebar)[];
    private static toolbarItems;
    static defaultConfig: MultirootEditorConfig;
}
export default Editor;
