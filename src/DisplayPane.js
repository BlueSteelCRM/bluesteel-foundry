import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import GridLayout from 'react-grid-layout';
import Components from './components';
import 'react-grid-layout/css/styles.css';
import {makeStyles} from '@material-ui/styles';
import {v4} from 'uuid';

const uuid = v4;

function RenderedComponent(props) {
	const {editable=false, component,setComponent} = props;
	const {type, definition} = component;

	const Component = Components[type];
	if (!Component) return 'Invalid object type: ' + type;

	const setDefinition = n => {
		console.log('updating definition:',n);
		setComponent(Object.assign({},component,{definition:n}));
	};
	return React.createElement(Component, {definition,setDefinition,editable});
}
RenderedComponent.propTypes={
	component: PropTypes.object,
	setComponent: PropTypes.func,
	editable: PropTypes.bool
};

const useStyles = makeStyles({
	editableContainer: {
		'&:hover': {
			borderStyle: 'solid',
			borderWidth: '1px',
			marginTop: '-1px',
			marginLeft: '-1px'
		}
	}
});

export default function DisplayPane(props) {
	const {definition,setDefinition} = props;
	const {editable=false} = props;
	const {components=[]} = definition;
	const styles = useStyles();

	useEffect(() => {
		if(!editable || !setDefinition) return;
		const withIds = definition.components.map(x => {
			if(x.id) return x;
			return Object.assign({},x,{id:uuid()});
		});
		setDefinition(Object.assign({},definition, {
			components:withIds
		}));
	}, []);

	const layout = components.map((x,i) => {
		const l = x.layout || {
			w:1,
			h:1,
			x:i,
			y:0,
		};
		return Object.assign({},l,{
			i:(x.id||i).toString()
		});
	});

	const renders=components.map((component, i) => {
		const setComponent = n => {
			const c = components.concat([]);
			c[i]=n;
			setDefinition(Object.assign({},definition,{components:c}));
		};
		return (<div key={(component.id||i).toString()} className={styles.editableContainer}>
			<RenderedComponent {...{component,setComponent, editable}} />
		</div>);
	});

	const isDraggable = editable;
	const isResizable = editable;

	let onLayoutChange;
	if(editable && setDefinition) onLayoutChange = n => {
		console.log(n);
		const byId = {};
		n.forEach(x=>byId[x.i]=x);

		const nDefinition = Object.assign({},definition,{
			components: definition.components.map(x => {
				return Object.assign({},x,{
					layout: byId[x.id]
				});
			})
		});
		setDefinition(nDefinition);
	};

	return <GridLayout className="layout" cols={12} rowHeight={30} width={1200} {
		...{layout,isDraggable,isResizable,onLayoutChange}
	}>
		{renders}
	</GridLayout>;
}
DisplayPane.propTypes = {
	definition: PropTypes.object,
	editable: PropTypes.bool,
	setDefinition: PropTypes.func
};
