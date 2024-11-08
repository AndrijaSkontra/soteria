export type User = {
  email: string;
  createdAt: Date;
  active: boolean;
  userId: string;
};

export type Session = {
  user: User;
  expires: Date;
};
