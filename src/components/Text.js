import React from 'react';
import PropTypes from 'prop-types';

import tinymce from 'tinymce/tinymce';

import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';

import 'tinymce/themes/silver';

import { Editor } from '@tinymce/tinymce-react';

// otherwise tinymce-react will load from cloud
global.tinymce = tinymce;

// https://www.tiny.cloud/docs/demo/inline/
export default function TextComponent(props) {
	const {definition,setDefinition,editable} = props;
	const {content} = definition;

	if(!editable) return <div>{content}</div>;
	return <Editor
		initialValue={content}
		onEditorChange={(change) => {
			console.log('change:',change);
			setDefinition(Object.assign({},definition,{content:change}));
		}}
		init={{
			menubar: false,
			toolbar: 'undo redo | bold italic underline',
			inline: true,
		}}
	/>;
}
TextComponent.propTypes = {
	definition: PropTypes.object,
	editable: PropTypes.bool,
	setDefinition: PropTypes.func
};

TextComponent.options = {
	content: {},
};
