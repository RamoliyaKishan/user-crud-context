import React, { useState, useEffect, useContext } from "react";
import {
	TextField,
	Button,
	Container,
	Box,
	Paper,
	Typography,
	InputAdornment,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { useFormik } from "formik";
import * as yup from "yup";

import { userFormStyles } from "./style";
import { UsersContext } from "../../context/UsersContext";

const UserForm = () => {
	const classes = userFormStyles();
	const history = useHistory();
	const { id } = useParams();
	const [oneUser, setOneUser] = useState();

	const { usersList, setUsersList } = useContext(UsersContext);

	useEffect(() => {
		getuser(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getuser = async (id) => {
		const result = await usersList.find((u) => {
			return u.id === id;
		});
		await setOneUser(result);
	};
	const addUser = async (values) => {
		setUsersList([...usersList, values]);
		toast.success("User Added Successfully....");
	};
	const editUser = async (values) => {
		setUsersList(usersList.map((u) => (u.id === id ? values : u)));
		toast.success("User Edited Successfully....");
	};

	const userValidationSchema = yup.object({
		name: yup
			.string()
			.required("Username is required")
			.max(100, "maximum 100 character is required"),
		contact: yup
			.string()
			.matches(
				/^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/,
				"Enter a valid phone number"
			)
			.required("Contact number is required"),
		email: yup
			.string()
			.email("Enter a valid email")
			.max(60, "Email address must not be more than 100 characters")
			.matches(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+$/, "Enter a valid email")
			.required("Email is required"),
		password: yup
			.string()
			.min(8, "Password should be of minimum 8 characters length")
			.required("Password is required"),
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: id ? oneUser?.name : "",
			email: id ? oneUser?.email : "",
			contact: id ? oneUser?.contact : "",
			password: id ? oneUser?.password : "",
		},
		validationSchema: userValidationSchema,
		onSubmit: (values) => {
			values = id ? { ...values, id: id } : { ...values, id: uuid() };
			id ? editUser(values) : addUser(values);
			history.push("/");
		},
	});

	const handleCancel = () => {
		formik.handleReset();
		history.push("/");
	};

	return (
		<Container className={classes.root} disableGutters>
			<Paper component={Box} className="main-container">
				<Typography variant="h3" align="center" color="primary">
					{id ? "Edit User" : "Add User"}
				</Typography>

				<div className="form-wrapper">
					<form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
						<TextField
							type="text"
							id="name"
							name="name"
							label="UserName"
							placeholder="Enter your userName"
							variant="outlined"
							fullWidth
							margin="normal"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircleIcon color="secondary" />
									</InputAdornment>
								),
							}}
							onChange={formik.handleChange}
							value={formik.values.name}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
						/>
						<TextField
							type="number"
							id="contact"
							name="contact"
							label="Contact Number"
							placeholder="Enter Contact Number"
							variant="outlined"
							fullWidth
							margin="normal"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<PhoneIcon color="secondary" />
									</InputAdornment>
								),
							}}
							onChange={formik.handleChange}
							value={formik.values.contact}
							error={formik.touched.contact && Boolean(formik.errors.contact)}
							helperText={formik.touched.contact && formik.errors.contact}
						/>
						<TextField
							type="email"
							id="email"
							name="email"
							label="Email"
							placeholder="Enter your emailId"
							variant="outlined"
							fullWidth
							margin="normal"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<EmailIcon color="secondary" />
									</InputAdornment>
								),
							}}
							onChange={formik.handleChange}
							value={formik.values.email}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
						/>

						<TextField
							type="password"
							id="password"
							name="password"
							label="Password"
							placeholder="Enter your password"
							variant="outlined"
							fullWidth
							margin="normal"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<VisibilityIcon color="secondary" />
									</InputAdornment>
								),
							}}
							onChange={formik.handleChange}
							value={formik.values.password}
							error={formik.touched.password && Boolean(formik.errors.password)}
							helperText={formik.touched.password && formik.errors.password}
						/>
						<Box></Box>
						<Box align="end" className={id && "btn-container"}>
							{id && (
								<Button
									color="secondary"
									variant="contained"
									className="custom-btn"
									startIcon={<CancelIcon />}
									onClick={handleCancel}
								>
									Cancle
								</Button>
							)}
							<Button
								color="primary"
								variant="contained"
								// fullWidth
								className="custom-btn"
								type="submit"
								startIcon={id ? <EditIcon /> : <AddIcon />}
							>
								{id ? "Edit User" : "Add User"}
							</Button>
						</Box>
					</form>
				</div>
			</Paper>
		</Container>
	);
};

export default UserForm;
