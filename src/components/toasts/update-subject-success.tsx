export function UpdateSubjectSuccessToast({ subject }) {
  return (
    <div>
      <p className="text-md font-bold">UPDATED</p>
      <p>
        Subject <strong>{subject.name}</strong> updated
      </p>
    </div>
  );
}
