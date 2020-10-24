import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import firebase, { db } from '../../config/fb.config';

class SignedInLinks extends Component {
	state = {
		purchasing: false,
		userFavorits: [],
		load: false
	}

	componentDidMount () {
		const currentUser = firebase.auth().currentUser;
		  const uid = currentUser.uid;
		  const userDate = {lastlogitTime: new Date()};
		  const updatePromiss = firebase.firestore().doc(`users/${uid}`).set(userDate, {merge: true});
		  const getPromiss = firebase.firestore().doc(`users/${uid}`).onSnapshot((doc) => {
			  const userData = doc.data();
			  if (userData.favoritsList) {
				  this.setState({
					  userFavorits: userData.favoritsList,
					});
					this.setState({ load: true})
			  }
		  });
		  return Promise.all([updatePromiss, getPromiss]);
	}

	handleUserInfo = () => {
		this.setState(prevState => ({
			purchasing: !prevState.purchasing
		}));
		console.log(this.state);
	}

	hendleRedirect = () => {
		this.setState({purchasing: false });
	}

	handleUserInfoClose = () => {
		this.setState({ purchasing: false });
	};

	render() {
		const { profile } = this.props;
		let addFavorit = '';
      if (this.state.userFavorits.length != 0 && this.state.load) {
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
					{/* <li><Link to="/live-chat"><i class="material-icons">move_to_inbox</i></Link></li> */}
					<li><Link className="btn waves-effect waves-light" to="/create">Sell</Link></li>
					<li><a className="btn btn-floating pink lighten-1" onClick={this.handleUserInfo}>{profile.initials}</a></li>
					<li><Link to="/favorite"><i className="material-icons">{addFavorit}</i></Link></li>
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