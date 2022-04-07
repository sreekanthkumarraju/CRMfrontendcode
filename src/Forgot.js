


import React ,{Component} from "react";
import './forgot.css'

import axios from 'axios'

import { Link } from "react-router-dom";
export default class Forgot extends Component{
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
         console.log(this.state.email)

         if(this.state.email==='')
           {
               this.setState({
                  showError:false,
                  messageFromServer:"",
               });
           }
           else{
               console.log(this.state.email,'inside')
               axios.post("http://localhost:8080/api/forgotpassword",{
                   email:this.state.email
               })
               .then(response =>{
                   console.log(response.data)
                     if(response.data==='email not in db')
                      {
                          this.setState({
                              showError:true,
                              messageFromServer:"",
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
         <div >
			<div >
                <h1 className="header">Password Reset</h1>
				<div >
                    <p className="para">To request password resest link please enter your email address in the form</p>
					<form onSubmit={this.sendEmail} className="form_container">
						
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={this.handleChange('email')}
							value={email}
							required
                            className="inputtext"
                           
							
						/>
                        <button type="submit" className="reset_btn">
                             Send Password Reset Email
                          </button>
                     </form>
                     {showNullError && (
                         <div>
                             <p>The email address cannot be null</p>
                         </div>

                     )}
                     {showError  &&(
                         <div>
                             <p className="">The email address isn't recognised</p>                   
					    <Link to="/signup">
						   <button type="button" className="signup_btn">
						       Signup
						   </button>
					    </Link>
                        </div>
                     )}
                     {messageFromServer ==='recovery email sent' &&(
                         <div className="">
                             <h3>
                                 Password reset Email sent successfully
                             </h3>
                         </div>
                     )}
                     <Link to="/signup">
                     <button type="button" className="home_btn">
                         Home
                     </button>
                     </Link>
				</div>

			</div>
		</div>
         )
    }
}