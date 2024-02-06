interface IGetApiResponse {
  route: "/annotation" | "/item" | "/manifests" | "/metadata" | "/publish";
  options?: RequestInit;
}

export default async ({ route, options }: IGetApiResponse) => {
  const { VITE_API_GATEWAY_ENDPOINT } = import.meta.env;
  try {
    return await fetch(`${VITE_API_GATEWAY_ENDPOINT}${route}`, options)
      .then(async (response) => {
        if (route === "/publish") return response;
        if (response?.status !== 200) return;
        return await new Response(response.body).json();
      })
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.error(error);
  }
};
