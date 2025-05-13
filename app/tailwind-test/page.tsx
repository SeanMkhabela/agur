export default function TailwindTestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Tailwind CSS Test</h1>
        <p className="text-gray-600 mt-2">If you can see this styled properly, Tailwind CSS is working!</p>
        <div className="mt-4 flex space-x-2">
          <div className="px-4 py-2 bg-blue-500 text-white rounded">Blue Button</div>
          <div className="px-4 py-2 bg-green-500 text-white rounded">Green Button</div>
          <div className="px-4 py-2 bg-red-500 text-white rounded">Red Button</div>
        </div>
      </div>
    </div>
  );
} 