export default function Input({ label, id, ...props}) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="text-sm text-gray-700">{label}</label>
            <input id={id} name={id} required className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-medium focus:border-transparent" {...props} />
        </div>
    );
}