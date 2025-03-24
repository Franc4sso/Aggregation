export default function AggregationField({
    label,
    field,
    selectedFields,
    onChange,
}) {
    return (
        <label className="inline-flex items-center px-4 py-3 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-500 hover:bg-blue-50/30 group">
            <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 rounded transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                checked={selectedFields.includes(field)}
                onChange={() => onChange(field)}
            />
            <span className="ml-3 text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-300">
                {label}
            </span>
        </label>
    );
}
