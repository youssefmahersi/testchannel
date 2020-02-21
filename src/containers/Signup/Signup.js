import React,{ Component } from "react";
import classes from "./Signup.module.css";
import Input from "../../components/Ui/Input/Input";
import Button from "../../components/Ui/Button/Button";
import Spinner from "../../components/Ui/Spinner/Spinner";
import P from "../../components/Ui/P/P";
class Signup extends Component{
    
        state = {
            signupForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength : 3,
                        maxLength : 9
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-Mail'
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
                        placeholder: 'Your Password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength : 4,
                        maxLength : 15
                    },
                    valid: false,
                    touched: false
                },
                confrimPassword: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Confirm your password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength : 4,
                        maxLength : 15
                    },
                    valid: false,
                    touched: false
                }
            },
            formIsValid: false,
            loading :false,
            error : null
        };
        SignupHandler = ( event ) => {
            event.preventDefault();
      
            const formData = {};
            for (let formElementIdentifier in this.state.signupForm) {
                formData[formElementIdentifier] = this.state.signupForm[formElementIdentifier].value;
            }
            
    
            // access to server
            this.setState({loading : true});
            fetch("http://localhost:8080/signup",{
                method :"POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body : JSON.stringify({
                    username : formData.name,
                    email : formData.email,
                    password : formData.password,
                    confirmPassword : formData.confrimPassword
                })
            }
            ).then(res =>{
                
                  return res.json();
                
            }).then(resData =>{
                this.setState({loading : false,error:resData.message});
            })
            
        }
        checkValidity(value, rules) {
            let isValid = true;
            if (!rules) {
                return true;
            }
            
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
    
            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid
            }
    
            if (rules.maxLength) {
                isValid = value.length <= rules.maxLength && isValid
            }
    
            if (rules.isEmail) {
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = pattern.test(value) && isValid
            }
    
            return isValid;
        }
        inputChangedHandler = (event, inputIdentifier) => {
            const updatedOrderForm = {
                ...this.state.signupForm
            };
            const updatedFormElement = { 
                ...updatedOrderForm[inputIdentifier]
            };
            updatedFormElement.value = event.target.value;
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
            updatedFormElement.touched = true;
            updatedOrderForm[inputIdentifier] = updatedFormElement;
            
            let formIsValid = true;
            for (let inputIdentifier in updatedOrderForm) {
                formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
            }
            this.setState({signupForm: updatedOrderForm, formIsValid: formIsValid});
        }
        render(){
            const formElementsArray = [];
        for (let key in this.state.signupForm) {
            formElementsArray.push({
                id: key,
                config: this.state.signupForm[key]
            });
        }
        let form = (
            <form onSubmit={this.SignupHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Signup</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        console.log(this.state.error);

        return(
        <div className={classes.Signup}>
            <h4>Signup</h4>
            {form}
            
            <P pType={this.state.error === "user created!" ? "success" : "failed "}>{this.state.error}</P>
        </div>
        );
    }
}


export default Signup;