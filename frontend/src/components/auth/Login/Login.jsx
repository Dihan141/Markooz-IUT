import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import  "./loginstyles.css"

export const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const url = "http://localhost:8080/api/auth";
	// 		const { data: res } = await axios.post(url, data);
	// 		localStorage.setItem("token", res.data);
	// 		window.location = "/";
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
	const [merchant, setMerchant] = useState("");

	const handleMerchantChange = (event) =>{
		setMerchant(event.target.value)
	}
	
    return (
        <div className="login_container">
			<div className="login_form_container">
				<div className="login_left">
					<form className="login_form_container2">
                        {/* onSubmit={handleSubmit}> */}
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="login_input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="login_input"
						/>
						<div className="wrapperLevel0">
							<div className="wrapperLevel1">
								<div className="wrapper">
									<input type="radio" name="select" value="false" id="option-1" onChange={handleMerchantChange} required/>
									<input type="radio" name="select" value="true" id="option-2" onChange={handleMerchantChange} required/>
									<label for="option-1" class="option option-1">
										
										<span>Member</span>
										</label>
									<label for="option-2" class="option option-2">
										
										<span>Merchant</span>
									</label>
								</div>
							</div>
						</div>
						<Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
							<p style={{ padding: "7px 150px" }}>Forgot Password ?</p>
						</Link>
						{error && <div className="login_error_msg">{error}</div>}
						<button type="submit" className="login_green_btn">
							Sign In
						</button>
						<button className="login_green_btn">
							<Link className="login_green_btn_link" to="/">Go To Home</Link>
						</button>
					</form>
				</div>
				<div className="login_right">
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className="login_white_btn">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
    )
}
