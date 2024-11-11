export type Organisation = {
  id: string;
  name: string;
  createdAt: Date;
  active: boolean;
};

export type RouteParams = Promise<{ locale: string; organisationId: string }>;

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
