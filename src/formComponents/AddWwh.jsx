import { useState } from "react";
import { apiWwh1, findAll } from "../utils/demoMocks";



export const AddWwh = () => {
    const [employees, setEmployees] = useState(findAll); // Cargar empleados desde los datos hardcodeados
    const [workHours, setWorkHours] = useState(apiWwh1);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(employees.length > 0 ? employees[0].id : "");

    const handleEmployeeSelect = (e) => {
        const selectedId = e.target.value;
        setSelectedEmployeeId(selectedId); // Actualiza el estado del empleado seleccionado
        const selectedWorkHours = apiWwh1.filter(wh => wh.employee.id.toString() === selectedId);
        setWorkHours(selectedWorkHours);
    };

    return (
        <form className="space-y-6">
            {/* Dropdown para seleccionar empleado */}
            <div className="flex flex-col gap-4 mb-4">
                <label htmlFor="employee-select" className="text-sm font-medium text-gray-700">Seleccionar Empleado</label>
                <select
                    id="employee-select"
                    value={selectedEmployeeId}
                    onChange={handleEmployeeSelect}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-500 sm:text-sm py-1.5"
                >
                    <option value="">-- Seleccione un empleado --</option>
                    {employees.map(employee => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name} {employee.lastName}
                        </option>
                    ))}
                </select>
            </div>

            {/* Tabla de jornadas */}
            {workHours.length > 0 && (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fecha Inicio</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fecha Término</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Horas Semanales</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {workHours.map((workHour) => (
                                <tr key={workHour.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{workHour.wwhStartDate}</td>
                                    <td className="px-4 py-2">{workHour.wwhTerminationDate || "N/A"}</td>
                                    <td className="px-4 py-2">{workHour.weeklyWorkHoursData}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


            {/* Formulario para añadir nueva jornada */}
            <div className="mt-6 space-y-4 ">
                <h3 className="text-lg font-semibold text-gray-900">Añadir Nueva Jornada</h3>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="sm:col-span-3">
                        <label htmlFor="weeklyWorkHoursData" className="block text-sm font-medium text-gray-700 mb-2">Jornada (horas semanales)</label>
                        <input
                            type="number"
                            name="weeklyWorkHoursData"
                            id="weeklyWorkHoursData"

                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-500 sm:text-sm py-1.5 pl-2"
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="wwhStartDate" className="block text-sm font-medium text-gray-700 mb-2">Fecha de Inicio</label>
                        <input
                            type="date"
                            name="wwhStartDate"
                            id="wwhStartDate"

                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-500 sm:text-sm py-1.5 pl-2"
                        />
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>

                    <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white">Save</button>

                </div>

            </div>

        </form>
    );
};