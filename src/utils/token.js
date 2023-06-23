const TOKEN_KEY = "react-blog-app";

const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = token => localStorage.setItem(TOKEN_KEY, token);
const deleteToken = token => localStorage.removeItem(TOKEN_KEY);

export { getToken, setToken, deleteToken };
