import { Head, router } from "@inertiajs/react";
import AggregationField from "@/Components/AggregationField";

export default function Index({ activities, selectedFields }) {
    const toggleField = (field) => {
        const newFields = selectedFields.includes(field)
            ? selectedFields.filter((f) => f !== field)
            : [...selectedFields, field];

        if (newFields.length === 0) {
            router.get(route("activities.show"), {});
        } else {
            router.get(
                route("activities.show", { selectedFields: newFields }),
                {
                    preserveScroll: true,
                }
            );
        }
    };

    const aggregatedData = activities;

    return (
        <>
            <Head title="Activities" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold mb-2">
                                    Aggregazione per:
                                </h2>
                                <div className="flex flex-wrap gap-4">
                                    <AggregationField
                                        label="Progetto"
                                        field="project"
                                        selectedFields={selectedFields}
                                        onChange={toggleField}
                                    />
                                    <AggregationField
                                        label="Impiegato"
                                        field="employee"
                                        selectedFields={selectedFields}
                                        onChange={toggleField}
                                    />
                                    <AggregationField
                                        label="Data"
                                        field="date"
                                        selectedFields={selectedFields}
                                        onChange={toggleField}
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {selectedFields.length === 0 && (
                                                <>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Project
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Employee
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                </>
                                            )}
                                            {selectedFields.map((field) => (
                                                <th
                                                    key={field}
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    {field
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        field.slice(1)}
                                                </th>
                                            ))}
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Hours
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {aggregatedData.map((item, index) => (
                                            <tr key={index}>
                                                {selectedFields.length ===
                                                    0 && (
                                                    <>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {item.project?.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {
                                                                item.employee
                                                                    ?.name
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {new Date(
                                                                item.date
                                                            ).toLocaleDateString()}
                                                        </td>
                                                    </>
                                                )}
                                                {selectedFields.map((field) => (
                                                    <td
                                                        key={field}
                                                        className="px-6 py-4 whitespace-nowrap"
                                                    >
                                                        {field === "date"
                                                            ? new Date(
                                                                  item[field]
                                                              ).toLocaleDateString()
                                                            : item.name ||
                                                              item[field]}
                                                    </td>
                                                ))}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.hours}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
