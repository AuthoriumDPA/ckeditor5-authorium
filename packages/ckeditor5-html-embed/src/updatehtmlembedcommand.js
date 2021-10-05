/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module html-embed/updatehtmlembedcommand
 */

import { Command } from 'ckeditor5/src/core';

/**
 * The update HTML embed value command.
 *
 * The command is registered by {@link module:html-embed/htmlembedediting~HtmlEmbedEditing} as `'updateHtmlEmbed'`.
 *
 * To update the value of the HTML embed element at the current selection, execute the command:
 *
 *		editor.execute( 'updateHtmlEmbed', '<b>HTML.</b>' );
 *
 * @extends module:core/command~Command
 */
export default class UpdateHtmlEmbedCommand extends Command {
	/**
	 * Executes the command, which updates the `value` attribute of the embedded HTML element:
	 *
	 * @fires execute
	 * @param {String} value HTML as a string.
	 */
	execute( value ) {
		const model = this.editor.model;
		const selection = model.document.selection;
		const selectedRawHtmlElement = getSelectedRawHtmlModelWidget( selection );

		// This command is stateless so the edit UI button can bind to it and stay enabled for all selections,
		// unless the command was force-disabled (e.g. via editor read-only state).
		if ( !selectedRawHtmlElement ) {
			return;
		}

		model.change( writer => {
			writer.setAttribute( 'value', value, selectedRawHtmlElement );
		} );
	}
}

// Returns the selected HTML embed element in the model, if any.
//
// @param {module:engine/model/selection~Selection} selection
// @returns {module:engine/model/element~Element|null}
function getSelectedRawHtmlModelWidget( selection ) {
	const selectedElement = selection.getSelectedElement();

	if ( selectedElement && selectedElement.is( 'element', 'rawHtml' ) ) {
		return selectedElement;
	}

	return null;
}
