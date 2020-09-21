const saveSession = data => {
  sessionStorage.setItem("username", data.handle);
  sessionStorage.setItem("user_id", data.user_id);
  sessionStorage.setItem("session_key", data.session_key);
};

const validate = state => {
  const errors = {};

  if (state.username.trim() === "") {
    errors.username = "Username is required";
  }
  if (state.password.trim() === "") {
    errors.password = "Password is required";
  }
  return Object.keys(errors).length === 0 ? null : errors;
};

module.exports = {
  saveSession,
  validate
};
