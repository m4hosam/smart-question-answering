import axios, { AxiosResponse, AxiosError } from "axios";

export async function createQuestion(userQuestion: {
  category: string;
  question: string;
  token: string;
}) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}question`,
      userQuestion,
      {
        headers: {
          Authorization: `Bearer ${userQuestion.token}`,
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

export async function getAllQuestions() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}question`
    );
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

export async function getMyQuestions(token: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}question/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export async function getTeacherQuestions(token: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}question/teacher`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export async function deleteQuestion(id: string, token: string) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}question/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
