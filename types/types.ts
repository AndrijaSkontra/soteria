type PageProps = {
  params: Promise<{ locale: string; organisationId: string }>;
};

type Organisation = {
  id: string;
  name: string;
};
