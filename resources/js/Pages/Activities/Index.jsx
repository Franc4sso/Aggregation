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
            <div className="py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-2xl transition-all duration-300 hover:shadow-2xl border border-gray-100">
                        <div className="p-8">
                            <div className="mb-10">
                                <h2 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight">
                                    Riepilogo Attività
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    Seleziona i campi per aggregare i dati delle
                                    attività
                                </p>
                                <div className="flex flex-wrap gap-6 bg-gradient-to-br from-blue-50 to-gray-50 p-6 rounded-xl shadow-inner border border-gray-200/50 transition-all duration-300 hover:shadow-lg">
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
                                <table className="min-w-full divide-y divide-gray-200 shadow-xl rounded-xl overflow-hidden bg-white border border-gray-100 transition-all duration-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {selectedFields.length === 0 && (
                                                <>
                                                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gradient-to-r from-gray-50 to-white">
                                                        Project
                                                    </th>
                                                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gradient-to-r from-gray-50 to-white">
                                                        Employee
                                                    </th>
                                                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gradient-to-r from-gray-50 to-white">
                                                        Date
                                                    </th>
                                                </>
                                            )}
                                            {selectedFields.map((field) => (
                                                <th
                                                    key={field}
                                                    className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gradient-to-r from-gray-50 to-white"
                                                >
                                                    {field
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        field.slice(1)}
                                                </th>
                                            ))}
                                            <th className="px-6 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider bg-gradient-to-r from-gray-50 to-white">
                                                Hours
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {aggregatedData.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-blue-50/30 transition-all duration-200 cursor-default"
                                            >
                                                {selectedFields.length ===
                                                    0 && (
                                                    <>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {item.project?.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                            {
                                                                item.employee
                                                                    ?.name
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                            {new Date(
                                                                item.date
                                                            ).toLocaleDateString()}
                                                        </td>
                                                    </>
                                                )}
                                                {selectedFields.map((field) => (
                                                    <td
                                                        key={field}
                                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                                                    >
                                                        {field === "date"
                                                            ? new Date(
                                                                  item[field]
                                                              ).toLocaleDateString()
                                                            : item.name ||
                                                              item[field]}
                                                    </td>
                                                ))}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600 tabular-nums">
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
