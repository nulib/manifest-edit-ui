const isAdminUser = (user: User) => {
  const groups =
    user?.signInUserSession?.accessToken?.payload["cognito:groups"];
  return groups?.includes("Admin");
};

export { isAdminUser };
