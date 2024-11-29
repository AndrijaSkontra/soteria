export default async function PersonnelPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string; page: number; rows: number }>;
}) {
  return (
    <div>
      <h1>personnel</h1>
    </div>
  );
}
