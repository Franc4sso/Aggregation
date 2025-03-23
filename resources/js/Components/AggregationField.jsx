export default function AggregationField({
    label,
    field,
    selectedFields,
    onChange,
}) {
    return (
        <label className="inline-flex items-center mr-4">
            <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={selectedFields.includes(field)}
                onChange={() => onChange(field)}
            />
            <span className="ml-2">{label}</span>
        </label>
    );
}
