import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import {
	Container,
	Paper,
	Typography,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Box,
	Button,
	TablePagination,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { toast } from "react-toastify";
import { userTableStyle } from "./style";
import { UsersContext } from "../../context/UsersContext";

const UserTable = () => {
	const classes = userTableStyle();
	const history = useHistory();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const { usersList, setUsersList } = useContext(UsersContext);

	const handleDelete = (id) => {
		if (window.confirm(`Are you sure to delete user ${id} ???`)) {
			setUsersList(usersList.filter((u) => u.id !== id));
			toast.success("User Deleted successfully...");
		}
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
	};

	return (
		<Container className={classes.root} disableGutters>
			{/* <Loader loading={loadingFetchUsers || loadingDeleteUser} /> */}
			<Paper component={Box} width="30%" mx="auto">
				<Typography variant="h3" align="center" color="primary">
					User's List
				</Typography>
			</Paper>

			<Box className={classes.tableWrapper}>
				<TableContainer component={Paper} className={classes.customTable}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Contact</TableCell>
								<TableCell>Action</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{usersList.length ? (
								usersList
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((user, index) => {
										return (
											<TableRow key={index}>
												<TableCell>{index + 1}</TableCell>
												<TableCell>{user?.name || "-"}</TableCell>
												<TableCell>{user?.email || "-"}</TableCell>
												<TableCell>{user?.contact || "-"}</TableCell>
												<TableCell>
													<Button
														className="edit-btn"
														startIcon={<EditIcon />}
														size="large"
														onClick={() => history.push(`/addUser/${user.id}`)}
													>
														Edit
													</Button>
													<Button
														startIcon={<DeleteIcon />}
														className="delete-btn"
														size="large"
														onClick={() => handleDelete(user.id)}
													>
														Delete
													</Button>
												</TableCell>
											</TableRow>
										);
									})
							) : (
								<TableRow className="no-data">
									<TableCell colSpan={7}>
										<span>No Data Found</span>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				{usersList.length > 0 && (
					<div className="pagination-wrapper">
						<TablePagination
							component="div"
							count={usersList?.length ? usersList?.length : 100}
							page={page}
							onPageChange={handleChangePage}
							rowsPerPageOptions={[5, 10, 15, 25, 100]}
							rowsPerPage={rowsPerPage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							classes={{
								root: classes.customPagination,
								menuItem: classes.customPaginationMenuItem,
							}}
						/>
					</div>
				)}
			</Box>
		</Container>
	);
};

export default UserTable;
