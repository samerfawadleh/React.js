import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false,
        redirectPath: null
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);

        let redirectPath = null
        for(let param of query.entries()) {
            redirectPath = param[1];
        }

        this.setState({redirectPath: redirectPath});
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
                touched: true
            }
        }

        this.setState({controls: updatedControls});
    }

    signInHandler = (event) => {
        event.preventDefault();

        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    onSwitchAuthHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        });
    }

    render() {
        const formElements = [];
        for(let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = <Spinner />;

        if(!this.props.loading) {

            form = formElements.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ));
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = <p style={{color: 'red'}}>{this.props.error.message}</p>
        }

        let authRedirect = null;
        if(this.props.isAuth) {
            authRedirect = this.state.redirectPath ? <Redirect to={'/' + this.state.redirectPath} /> : <Redirect to="/" />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                <p style={{fontWeight: 'bold'}}>{!this.state.isSignup ? 'Sign In' : 'Sign Up'}</p>
                <form onSubmit={this.signInHandler}>
                    {form}
                    {errorMessage}
                    <Button btnType="Success">{!this.state.isSignup ? 'Sign In' : 'Sign Up'}</Button>
                </form>
                <Button
                        clicked={this.onSwitchAuthHandler}
                        btnType="Danger">Switch to {this.state.isSignup ? 'Sign In' : 'Sign Up'}</Button>
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.idToken !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);