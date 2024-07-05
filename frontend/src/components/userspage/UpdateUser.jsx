import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function UpdateUser() {
	const navigate = useNavigate();
	const { userId } = useParams();

	const [userData, setUserData] = useState({
		name: "",
		email: "",
		role: "",
		type: "",
	});

	useEffect(() => {
		fetchUserDataById(userId);
	}, [userId]);

	const fetchUserDataById = async (userId) => {
		try {
			const token = localStorage.getItem("token");
			const response = await UserService.getUserById(userId, token);
			const { name, email, role, type } = response.ourUsers;
			setUserData({ name, email, role, type });
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserData((prevUserData) => ({
			...prevUserData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const confirmUpdate = window.confirm(
				"Are you sure you want to update this user?"
			);
			if (confirmUpdate) {
				const token = localStorage.getItem("token");
				const res = await UserService.updateUser(
					userId,
					userData,
					token
				);
				console.log(res);
				navigate("/admin/user-management");
			}
		} catch (error) {
			console.error("Error updating user profile:", error);
			alert(error);
		}
	};

	return (
		<div className="auth-container">
			<h2>Update User</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Name:</label>
					<input
						type="text"
						name="name"
						value={userData.name}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group">
					<label>Email:</label>
					<input
						type="email"
						name="email"
						value={userData.email}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group">
					<label>Role:</label>
					<select
						name="role"
						value={userData.role}
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
						value={userData.type}
						onChange={handleInputChange}
					>
						<option value="">Select Type</option>
						<option value="Employee">Employee</option>
						<option value="Vendor">Vendor</option>
					</select>
				</div>
				<button type="submit">Update</button>
			</form>
		</div>
	);
}

export default UpdateUser;
