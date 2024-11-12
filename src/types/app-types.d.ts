type RouteParams = Promise<{ locale: string; organisationId: string }>;

type User = {
  email: string;
  createdAt: Date;
  active: boolean;
  userId: string;
};

type Session = {
  user: User;
  expires: Date;
};

type NavigationLinkType = {
  title: string;
  url: string;
  icon: any;
};

type Organisation = {
  id: string;
  name: string;
  createdAt: Date;
  active: boolean;
};
