export default function SubjectDetails({ subject }) {
  return (
    <div className="space-y-4 p-4">
      <div>
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <div className="space-y-2 mt-2">
          <p>
            <span className="font-medium">Name: </span>
            {subject.name || "N/A"}
          </p>
          <p>
            <span className="font-medium">ID: </span>
            {subject.id || "N/A"}
          </p>
          <p>
            <span className="font-medium">Address: </span>
            {subject.address || "N/A"}
          </p>
        </div>
      </div>

      {/* Contact Details */}
      <div>
        <h3 className="text-lg font-semibold">Contact Details</h3>
        <div className="space-y-2 mt-2">
          <p>
            <span className="font-medium">OIB: </span>
            {subject.oib || "N/A"}
          </p>
          <p>
            <span className="font-medium">Contact: </span>
            {subject.contact || "N/A"}
          </p>
          <p>
            <span className="font-medium">Email: </span>
            <a href={`mailto:${subject.email}`} className="text-blue-600 underline">
              {subject.email || "N/A"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
