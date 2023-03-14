import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './SignupStyles.css'

export const Signup = () => {
    const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const url = "http://localhost:8080/api/users";
	// 		const { data: res } = await axios.post(url, data);
	// 		setMsg(res.message);
	// 	} catch (error) {
	// 		if (
	// 			error.response &&
	// 			error.response.status >= 400 &&
	// 			error.response.status <= 500
	// 		) {
	// 			setError(error.response.data.message);
	// 		}
	// 	}
	// };
    return (
        <div className="signup_container">
			<div className="signup_form_container1">
				<div className="signup_left">
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className="signup_white_btn">
							sign in
						</button>
					</Link>
				</div>
				<div className="signup_right">
					<form className="signup_form_container">
                    {/* onSubmit={handleSubmit} */}
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className="signup_input"
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className="signup_input"
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="signup_input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="signup_input"
						/>
						<div className="wrapperLevel0">
							<div className="wrapperLevel1">
								<div className="wrapper">
									<input type="radio" name="select" id="option-1" checked />
									<input type="radio" name="select" id="option-2"/>
									<label for="option-1" class="option option-1">
										
										<span>Member</span>
										</label>
									<label for="option-2" class="option option-2">
										
										<span>Merchant</span>
									</label>
								</div>
							</div>
						</div>
						{error && <div className="signup_error_msg">{error}</div>}
						{msg && <div className="signup_success_msg">{msg}</div>}
						<button type="submit" className="signup_green_btn">
							Sign Up
						</button>
						<button className="login_green_btn">
							<Link className="login_green_btn_link" to="/">Go To Home</Link>
						</button>
					</form>
				</div>
			</div>
		</div>
    )
}
