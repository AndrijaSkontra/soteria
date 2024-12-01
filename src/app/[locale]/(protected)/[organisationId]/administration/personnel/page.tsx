export default async function PersonnelPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string; page: number; rows: number }>;
}) {
  console.log(searchParams);
  return (
    <div>
      <h1>personnel</h1>
    </div>
  );
}
