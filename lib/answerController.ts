import axios, { AxiosResponse, AxiosError } from "axios";

export async function createAnswer(
  answer: {
    answer: string;
    question_id: string;
  },
  token: string
) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}answer`,
      answer,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("createUser status: ", response.data.success)
    // console.log(response);
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
