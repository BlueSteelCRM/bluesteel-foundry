import React, {useState} from 'react'

import {DisplayPane} from '../../src/index';

const rawDef = {
	components: [{
		type: 'Text',
		definition: {
			content: "Hello"
		}
	},{
		type: 'Text',
		definition: {
			content: "There",
			layout: {
				w:4,
				h:1,
				x:1,
				y:0
			}
		}
	},{
		type: 'Image',
		definition: {
			src: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png',
		}
	}]
};

const App = () => {
	const [definition,setDefinition]=useState(rawDef);
  return <React.Fragment>
		<DisplayPane editable {...{definition,setDefinition}} />
		{JSON.stringify(definition,null,2)}
	</React.Fragment>;
}

export default App;
