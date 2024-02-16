const isAdminUser = (user: any) => {
  // @ts-ignore
  const groups =
    user?.signInUserSession?.accessToken?.payload["cognito:groups"];
  return groups?.includes("Admin");
};

export { isAdminUser };
