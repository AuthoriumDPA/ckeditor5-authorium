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
import {
	Image,
	ImageCaption,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	ImageTextAlternative,
	PictureEditing
} from '@ckeditor/ckeditor5-image';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Mention } from '@ckeditor/ckeditor5-mention';
import { PageBreak } from '@ckeditor/ckeditor5-page-break';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import {
	PresenceList,
	RealTimeCollaborativeComments,
	RealTimeCollaborativeEditing,
	RealTimeCollaborativeTrackChanges
} from '@ckeditor/ckeditor5-real-time-collaboration';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import {
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar
} from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { TrackChanges, TrackChangesData } from '@ckeditor/ckeditor5-track-changes';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { AIAssistant, OpenAITextAdapter } from '@ckeditor/ckeditor5-ai';

// import WProofreader from '@webspellchecker/wproofreader-ckeditor5/src/wproofreader';

import {
	type LanguageConfig,
	CodeBlockConfiguration,
	HeadingConfiguration,
	ImageConfiguration,
	MentionCustomization,
	NumericFontSizeConfig,
	TableConfiguration
} from './helpers.js';

interface MultirootEditorConfig extends EditorConfig {
	codeBlock: { languages: Array<LanguageConfig> };
}

class CustomOpenAITextAdapter extends OpenAITextAdapter {
	public override async prepareMessages( query: any, context: any, actionId: string ): Promise<any> {
		const messages = await super.prepareMessages( query, context, actionId );
		console.log( 'preparing messages for ai' );
		console.log( { query, context, actionId, messages } );
		// You can use `this.editor` to get access to the editor API
		return messages;
	}

	public override async sendRequest( requestData: any ): Promise<any> {
		const originalOnData = requestData.onData;
		const { actionId } = requestData;
		console.log( `sending ai request for ${ actionId }` );

		requestData.onData = ( content: any ) => {
			console.log( 'got data from ai' );
			console.log( content );
			originalOnData( content );
		};

		return super.sendRequest( requestData ).then( response => {
			console.log( 'request finished' );
		} );
	}
}

class Editor extends MultiRootEditorBase {
	public static override builtinPlugins = [
		Alignment,
		AnnotationsUIs,
		Autoformat,
		BlockQuote,
		Autosave,
		Bold,
		CloudServices,
		Comments,
		Essentials,
		EasyImage,
		FindAndReplace,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		Heading,
		Highlight,
		HorizontalLine,
		Image,
		ImageCaption,
		ImageResize,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		ImageTextAlternative,
		Indent,
		IndentBlock,
		Italic,
		Link,
		List,
		ListProperties,
		MediaEmbed,
		Mention,
		MentionCustomization,
		PageBreak,
		Paragraph,
		PasteFromOffice,
		PictureEditing,
		PresenceList,
		RealTimeCollaborativeComments,
		RealTimeCollaborativeEditing,
		RealTimeCollaborativeTrackChanges,
		RemoveFormat,
		Strikethrough,
		Subscript,
		Superscript,
		Table,
		TableCaption,
		TableCellProperties,
		TableColumnResize,
		TableProperties,
		TableToolbar,
		TextTransformation,
		TodoList,
		TrackChanges,
		TrackChangesData,
		Underline,
		CKFinderUploadAdapter,
		Undo,
		WideSidebar,
		AIAssistant,
		CustomOpenAITextAdapter
	];

	private static toolbarItems = [
		'aiCommands',
		'aiAssistant',
		'|',
		'undo',
		'redo',
		'|',
		'heading',
		'|',
		'fontSize',
		{
			label: 'Text Styles',
			icon: 'bold',
			items: [
				'bold',
				'strikethrough',
				'subscript',
				'superscript'
			]
		},
		'fontColor',
		'italic',
		'underline',
		'fontBackgroundColor',
		'|',
		'alignment',
		'bulletedList',
		'numberedList',
		'outdent',
		'indent',
		'pageBreak',
		'|',
		'link',
		'imageUpload',
		'insertTable',
		'|',
		'findAndReplace',
		'removeFormat',
		'blockQuote',
		'horizontalLine',
		'|',
		'comment',
		'trackChanges',
		'|',
		'commentsArchive'
	];

	public static override defaultConfig: MultirootEditorConfig = {
		toolbar: {
			items: Editor.toolbarItems
		},
		fontSize: NumericFontSizeConfig,
		language: 'en',
		codeBlock: CodeBlockConfiguration,
		list: {
			properties: {
				startIndex: true
			}
		},
		link: {
			defaultProtocol: 'https://'
		},
		image: ImageConfiguration,
		indentBlock: {
			offset: 1,
			unit: 'em'
		},
		table: TableConfiguration,
		comments: {
			editorConfig: {
				extraPlugins: [
					Autoformat,
					Bold,
					List,
					Italic
				]
			}
		},
		heading: HeadingConfiguration
	};
}

export default Editor;
