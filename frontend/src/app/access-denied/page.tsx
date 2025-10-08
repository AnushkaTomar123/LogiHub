export default function AccessDenied() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-gray-700 text-lg">
        You don’t have permission to access this page.
      </p>
    </div>
  );
}
