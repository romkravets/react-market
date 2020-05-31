import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

class SignedInLinks extends Component {
	state = {
		purchasing: false,
	}
	handleUserInfo = () => {
		this.setState(prevState => ({
			purchasing: !prevState.purchasing
		}));
		console.log(this.state);
	}

	hendleRedirect = () => {
		// <Redirect to="/edit-profile"/>
		this.setState({purchasing: false });
	}

	handleUserInfoClose = () => {
		this.setState({ purchasing: false });
	};
	render() {
		const { profile } = this.props;
		let addFavorit = '';
		// console.log(profile);
		// console.log(profile);
		// if (profile.isLoaded) {
		// 	for (let key in profile.favoriteList) {
		// 		console.log('yes');
		// 	}
		// 	// if(profile.favoriteList.length > 0) {
		// 	// 	console.log('yes');
		// 	// }
		// 	console.log('isLoaded');
		// } 
      if (true) {
         addFavorit = 'favorite';
      } else {
         addFavorit = 'favorite_border';
      }
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.handleUserInfoClose}>
					<div className="lighten-4 grey-text">
						<h4>Profile</h4>
						<div className="btn btn-floating pink lighten-1" onClick={this.handleUserInfo}>
							{profile.initials}
						</div>
						<span> {profile.firstName} {profile.lastName}</span>
						<span>096 889 483 83</span>
						<br />
						<Link to="/edit-profile" onClick={this.hendleRedirect} className="lighten-4 grey-text">Edit profile</Link>
						<hr />
						<div>
							<a className="lighten-4 grey-text" onClick={this.props.signOut}>Log Out</a>
						</div>
					</div>
				</Modal>
				<ul className="right">
					<li><Link to="/message"><i class="material-icons">move_to_inbox</i></Link></li>
					<li><Link class="btn waves-effect waves-light" to="/create">New Product</Link></li>
					<li><a className="btn btn-floating pink lighten-1" onClick={this.handleUserInfo}>{profile.initials}</a></li>
					<li><Link to="/favorite"><i class="material-icons">{addFavorit}</i></Link></li>
				</ul>
			</Aux>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		profile: state.firebase.profile,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);