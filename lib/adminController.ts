import axios from "axios";

// get all user Admin only
export async function getAllUsers(token: string) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // const err = error as AxiosError;
      // console.log(err.response?.data);
      return error.response;
    } else {
      console.log(error);
      throw error;
    }
  }
}
