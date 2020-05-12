import React from 'react';
import PropTypes from 'prop-types';
// import Components from './components';
// import {makeStyles} from '@material-ui/core/styles';

export default function EditorPane(props) {
	const {definition={}}=props;
	const {components=[]}=definition;

	return <div>
		{components.map((x,i) => {
			return <div key={i}>{JSON.stringify(i)}</div>;
		})}
	</div>;
}
EditorPane.propTypes = {
	definition: PropTypes.object
};
