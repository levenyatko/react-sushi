export default function Error({ title, message }) {
    return (
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
            <h2 className="text-sm font-semibold text-red-700">{title}</h2>
            <p className="text-sm text-red-700">{message}</p>
        </div>
    );
}