export default function Loader({ message = 'Loading...'}) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
            <p className="ml-4 text-lg font-medium text-gray-600">{ message }</p>
        </div>
    );
}