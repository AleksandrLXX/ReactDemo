import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './stores/configureStore.js';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore} from 'react-router-redux';
// Render the main component into the dom
const store=configureStore();
const history=syncHistoryWithStore(browserHistory,store);
ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App} />
		</Router>
	</Provider>, 
	document.getElementById('app')
);
