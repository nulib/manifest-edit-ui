import awsExports from "../aws-exports";
import { useAppContext } from "../context/AppContext";

interface IGetApiResponse {
  route: "/annotation" | "/item" | "/manifests" | "/metadata";
  options?: RequestInit;
}

export default async ({ route, options }: IGetApiResponse) => {
  const { API_GATEWAY_ENDPOINT } = awsExports;
  try {
    return await fetch(`${API_GATEWAY_ENDPOINT}${route}`, options)
      .then(async (response) => {
        if (response?.status !== 200) return;
        return await new Response(response.body).json();
      })
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.error(error);
  }
};
