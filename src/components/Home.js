import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
class Home extends Component{
	render(){
		<h1>MorassAlbum</h1>
        <ul role="nav">
          <li><Link to="/">About</Link></li>
          <li><Link to="/">Repos</Link></li>
        </ul>
	}
}