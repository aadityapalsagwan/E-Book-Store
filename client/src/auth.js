export const isLoggedIn = () => {
  return !!localStorage.getItem('user');
};

export const loginUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};
