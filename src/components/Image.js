import React from 'react';
import PropTypes from 'prop-types';

import {makeStyles} from '@material-ui/styles';

const useImageStyles=makeStyles({
	imageComponent: {
		objectFit: 'cover',
		width: '100%',
		height: '100%',

		// make this easier on the drag framework
		userDrag: 'none',
		userSelect: 'none',
	}
});

export default function ImageComponent(props) {
	const styles = useImageStyles();
	const {definition} = props;
	const {src} = definition;

	return <div>
		<img src={src} className={styles.imageComponent}/>
	</div>;
}
ImageComponent.propTypes = {
	definition: PropTypes.object
};
