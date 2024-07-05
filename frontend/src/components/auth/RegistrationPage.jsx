import React, { useState } from "react";
import UserService from "../service/UserService";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "",
		type: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Call the register method from UserService

			const token = localStorage.getItem("token");
			await UserService.register(formData, token);

			// Clear the form fields after successful registration
			setFormData({
				name: "",
				email: "",
				password: "",
				role: "",
				type: "",
			});
			alert("User registered successfully");
			navigate("/admin/user-management");
		} catch (error) {
			console.error("Error registering user:", error);
			alert("An error occurred while registering user");
		}
	};

	return (
		<div className="auth-container">
			<h2>Registration</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Name:</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Email:</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Password:</label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Role:</label>
					<select
						name="role"
						value={formData.role}
						onChange={handleInputChange}
					>
						<option value="">Select Role</option>
						<option value="ADMIN">ADMIN</option>
						<option value="USER">USER</option>
					</select>
				</div>
				<div className="form-group">
					<label>Type:</label>
					<select
						name="type"
						value={formData.type}
						onChange={handleInputChange}
					>
						<option value="">Select Type</option>
						<option value="Employee">Employee</option>
						<option value="Vendor">Vendor</option>
					</select>
				</div>

				<button type="submit">Register</button>
			</form>
		</div>
	);
}

export default RegistrationPage;
