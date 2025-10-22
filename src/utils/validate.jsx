export const checkValidData = ({ fullname, email, password, confirmpwd }) => {
  const errors = [];

  if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    errors.push("Email is not valid");
  }

  if (
    !password ||
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password)
  ) {
    errors.push("Password must be 8–20 chars, include upper, lower, number & special char");
  }


  if (fullname !== undefined) {
    if (!fullname.trim()) {
      errors.push("Full Name is required");
    } else if (
      !/^[A-Za-z]+(?:[ '-][A-Za-z]+)* [A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(fullname)
    ) {
      errors.push("Full Name is not valid");
    }
  }

  if (confirmpwd !== undefined) {
    if (password !== confirmpwd) {
      errors.push("Passwords do not match");
    }
  }

  return errors; 
};
