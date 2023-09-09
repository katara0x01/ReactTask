import { useState } from "react";
import Modal from "./Modal";

const LoanForm = () => {
	const [formInputs, setFormInputs] = useState({
		name: "",
		age: "",
		phoneNumber: "",
		isEmployed: false,
		salary: "",
	});
	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState(null);

	const handleForm = (event) => {
		event.preventDefault();

		setError(null);
		if (formInputs.age > 65 || formInputs.age < 18)
			setError("The age is above or below the range (18 & 65) ");
		else if (isNaN(formInputs.age))
			setError("Please enter your age as a number");
		else if (
			formInputs.phoneNumber.length > 10 ||
			formInputs.phoneNumber.length < 8
		)
			setError("Phone number is above or below (8 & 10) digits");
		else if (isNaN(formInputs.phoneNumber))
			setError("Please enter the phone number as number");

		const user = {
			name: formInputs.name,
			age: formInputs.age,
			phoneNumber: formInputs.phoneNumber,
			isEmployed: formInputs.isEmployed,
			salary: formInputs.salary,
		};
		console.log("User submitted: ", user);
		setShowModal(true);
	};
	const btnIsDisabled =
		formInputs.name === "" ||
		formInputs.age === "" ||
		formInputs.phoneNumber === "";
	function handleShowModal() {
		return showModal ? setShowModal(false) : null;
	}
	return (
		<div onClick={handleShowModal} className="form">
			<form className="flex loan-form">
				<h1>Requesting a Loan</h1>

				<label>Name:</label>
				<input
					value={formInputs.name}
					onChange={(event) => {
						setFormInputs({ ...formInputs, name: event.target.value });
					}}
				/>
				<label>Age:</label>
				<input
					value={formInputs.age}
					onChange={(event) => {
						setFormInputs({ ...formInputs, age: event.target.value });
					}}
				/>
				<label>Phone Number:</label>
				<input
					value={formInputs.phoneNumber}
					onChange={(event) => {
						setFormInputs({ ...formInputs, phoneNumber: event.target.value });
					}}
				/>

				<label style={{ marginTop: "30px" }}>Are you an employee?</label>
				<input
					type="checkbox"
					checked={formInputs.isEmployed}
					onChange={(event) => {
						setFormInputs({ ...formInputs, isEmployed: event.target.checked });
					}}
				/>

				<label>Salary:</label>
				<select
					value={formInputs.salary}
					onChange={(event) => {
						setFormInputs({ ...formInputs, salary: event.target.value });
					}}
				>
					<option>Less than 500$</option>
					<option>Between 500$ and 2000$</option>
					<option>Above 2000$</option>
				</select>

				<button
					className={btnIsDisabled ? "disabled" : ""}
					onClick={handleForm}
					disabled={btnIsDisabled}
					id="submit-btn"
				>
					Submit
				</button>
			</form>

			<Modal errorMessage={error} isVisible={showModal} />
		</div>
	);
};

export default LoanForm;
