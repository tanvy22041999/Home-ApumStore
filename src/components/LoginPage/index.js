
import React, { Component } from 'react';
import './loginStyles.css'
import { assets } from '../../constants/assetsImage';
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
// @Actions
import AuthorizationActions from '../../redux/actions/auth'
// @Components
import { GoogleLogin } from 'react-google-login';
import { FacebookProvider, Login } from 'react-facebook';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import ForgotPassword from './ForgotPass';
import { toastError } from '../../utils/toastHelper';
// @Constance
import { GOOGLE_ID, FACEBOOK_ID } from '../../constants'

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		}
	}

	onLogin = () =>{
		const { email, password } = this.state;
		const { onLogin, t } = this.props;
		const data = {
			email, 
			password
		};
		if(email && password){
			onLogin(data);
		}
		else{
			toastError(`${t('login.toastify.error')}`)
		}
	}
	onSubmit = (event) =>{
    event.preventDefault();
  }

	onChange = (event) =>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:  value
    })
	}

	componentDidMount(){ 
		document.title = "[ApumStore] Đăng nhập"
		this.improveScreen()
	}

	UNSAFE_componentWillReceiveProps(props){
		const { loggedIn, history } = props;
		if(loggedIn && loggedIn===true){
			history.push('/');
		}
	}

	improveScreen() {
		const inputs = document.querySelectorAll(".input");
		function addcl(){
			let parent = this.parentNode.parentNode;
			parent.classList.add("focus");
		}

		function remcl(){
			let parent = this.parentNode.parentNode;
			if(this.value === ""){
				parent.classList.remove("focus");
			}
		}
		inputs.forEach(input => {
			input.addEventListener("focus", addcl);
			input.addEventListener("blur", remcl);
		});
	}

	responseGoogle = (response) => {
		const {onLoginGoogle} = this.props;
		onLoginGoogle(response.accessToken);
  }

  responseFacebook = (response) => {
		const {onLoginFacebook} = this.props;
		onLoginFacebook(response.accessToken);
	}

	render() {
		const { t } = this.props;
		const { email, password } = this.state;
		return (
			<div>
				<img className="wave" src={ assets("wave.png")} alt="" />
				<div className="container_login">
					<div className="img">
						<img src={ assets("bg.png")} alt="" />
					</div>
					<div className="login-content">
						<form>
							<h2 className="title">Welcome to</h2>
							<img className="pb-4" src={assets("brand1.png")} alt=""></img>
							<div className="input-div one">
								<div className="i">
									<i className="fas fa-user" />
								</div>
								<div className="div">
									<h5>Email</h5>
									<input type="email" className="input" name="email" value={email} onChange={this.onChange}/>
								</div>
							</div>
							<div className="input-div pass">
								<div className="i">
									<i className="fas fa-lock" />
								</div>
								<div className="div">
									<h5>Password</h5>
									<input type="password" className="input" name="password" value={password} onChange={this.onChange}/>
								</div>
							</div>
							<div onClick={()=> this.onForgotPass} className="text-right" data-bs-toggle="modal" data-bs-target="#forgotPassword">Forgot Password?</div>
							<div className="row">
								<div className="col-12">
									<button type="button" className="btn" onClick={()=> this.onLogin()}>{t('header.login.button')}</button>
								</div>
								<div className="col-12">
									<form action="/user/dang-ky">
										<button type="submit" className="btn" value="Register">{t('header.signup.button')}</button>
									</form>
								</div>
								
							</div>
						</form>
					</div>x
				</div>
				
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
		loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps =(dispatch)=> {
	return {
		onLogin : (data) =>{
			dispatch(AuthorizationActions.onLogin(data))
		},
		onLoginFacebook : (token) =>{
			dispatch(AuthorizationActions.onLoginFacebook(token))
		},
		onLoginGoogle : (token) =>{
			dispatch(AuthorizationActions.onLoginGoogle(token))
		},

	}
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withTranslation())(LoginPage);
