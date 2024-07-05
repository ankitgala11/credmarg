import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../service/UserService";
import axios from "axios"; // Import Axios for making HTTP requests

function UserManagementPage() {
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [filterType, setFilterType] = useState("Employee");

	useEffect(() => {
		fetchUsers();
	}, []);

	useEffect(() => {
		filterUsers(filterType); // Apply filter whenever users or filterType changes
	}, [users, filterType]);

	const fetchUsers = async () => {
		try {
			const token = localStorage.getItem("token"); // Retrieve the token from localStorage
			const response = await UserService.getAllUsers(token);
			setUsers(response.ourUsersList); // Assuming the list of users is under the key 'ourUsersList'
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	};

	const deleteUser = async (userId) => {
		try {
			// Prompt for confirmation before deleting the user
			const confirmDelete = window.confirm(
				"Are you sure you want to delete this user?"
			);

			const token = localStorage.getItem("token"); // Retrieve the token from localStorage
			if (confirmDelete) {
				await UserService.deleteUser(userId, token);
				// After deleting the user, fetch the updated list of users
				fetchUsers();
			}
		} catch (error) {
			console.error("Error deleting user:", error);
		}
	};

	const sendMail = async (userId) => {
		try {
			const token = localStorage.getItem("token"); // Retrieve the token from localStorage
			await axios.post(
				`http://localhost:1010/admin/send-mail/${userId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`, // Include Authorization header with JWT token
					},
				}
			);
			alert("Mail sent successfully!");
		} catch (error) {
			console.error("Error sending mail:", error);
			alert("Failed to send mail. Please try again.");
		}
	};

	const filterUsers = (type) => {
		setFilterType(type);
		const filtered = users.filter((user) => user.type === type);
		setFilteredUsers(filtered);
	};

	return (
		<div className="user-management-container">
			<h2>Users Management Page</h2>
			<button className="reg-button">
				<Link to="/register">Add User</Link>
			</button>
			<div className="filter-buttons">
				<button onClick={() => filterUsers("Employee")}>
					Employee
				</button>
				<button onClick={() => filterUsers("Vendor")}>Vendor</button>
			</div>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Type</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map((user) => (
						<tr key={user.id}>
							<td>{user.id}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.type}</td>
							<td>
								<div className="action-buttons">
									<button
										className="delete-button"
										onClick={() => deleteUser(user.id)}
									>
										Delete
									</button>
									<button>
										<Link to={`/update-user/${user.id}`}>
											Update
										</Link>
									</button>
									<button onClick={() => sendMail(user.id)}>
										Send Mail
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default UserManagementPage;
