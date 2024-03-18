export type Answer = {
  id: string;
  answer: string;
  questionId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type Question = {
  id: string;
  question: string;
  category: string;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  Answer: Answer[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type UserToken = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  token: string;
};
