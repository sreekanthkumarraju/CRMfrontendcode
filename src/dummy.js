import React ,{Component} from "react";

import axios from 'axios'
import styles from './forgot_styles'
import { Link } from "react-router-dom";
export default class ForgotPassword extends Component{
     constructor(){
         super()
          
         this.state={
             email:"",
             showError:false,
             messageFromServer:"",
         };
     }

    handleChange=name =>event =>{
          
        this.setState({
            [name]:event.target.value,
        })
    }

    sendEmail = e=>{
         e.preventDefault()

         if(this.state.email==='')
           {
               this.setState({
                  showError:false,
                  messageFromServer:""
               })
           }
           else{
               axios .post('http://localhost:8080/api/users',{
                   email:this.state.email
               })
               .then(response =>{
                   console.log(response.data)
                     if(response.data==='email not in db')
                      {
                          this.setState({
                              showError:true,
                              messageFromServer:""
                          })
                      }
                      else if(response.data==='recovery email sent')
                        {
                            this.setState({
                                showError:false,
                                messageFromServer:"recovery email sent"
                            })
                        }
               })
               .catch(error =>{
                   console.log(error.data)
               })
           }
    };

    render(){
        const {email ,messageFromServer,showNullError,showError}=this.state;
         return(
            <div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={this.sendEmail}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={this.handleChange('email')}
							value={email}
							required
							className={styles.input}
						/>
					
						<button type="submit" className={styles.green_btn}>
							Sing In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sing Up
						</button>
					</Link>
				</div>
			</div>
		</div>
         )

}

}