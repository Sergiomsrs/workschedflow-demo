import { useEffect, useState } from "react";
import { generateWorkShiftPto } from "../utils/blockHours";

const disp = [
    {
        "id": 21,
        "employee": {
            "id": 3,
            "name": "Monica",
            "lastName": "Geller",
            "email": "monica@correo.com",
            "hireDate": "2024-01-01",
            "terminationDate": "2024-12-31"
        },
        "absenceReason": "Motivos personales",
        "date": "2024-11-11",
        "startHour": "14:00",
        "terminationHour": "17:30"
    }
];

export const AddDisp = () => {
    const initialState = { name: '', lastName: '', email: '', ptoStartDate: '', ptoTerminationDate: '' };

    const [createForm, setCreateForm] = useState(initialState);
    const [message, setMessage] = useState("");
    const [employees, setEmployees] = useState([]); // Lista de empleados
    const [isExistingEmployee, setIsExistingEmployee] = useState(false);
    const [workHours, setWorkHours] = useState([]); // Lista de jornadas
    const [newPto, setNewPto] = useState({
        employeeId: "",
        absenceReason: "",
        date: "",
        startHour: "",
        terminationHour: "",
    }); // Nueva jornada

    // Cargar todos los empleados cuando el componente se monta


    const fetchAbsences = (employeeId) => {

    };

    const handleEmployeeSelect = (e) => {
        const selectedId = e.target.value;
        const selectedEmployee = employees.find(emp => emp.id.toString() === selectedId);

        if (selectedEmployee) {
            setCreateForm(selectedEmployee);
            setMessage("");
            fetchAbsences(selectedEmployee.id);
        } else {
            setCreateForm(initialState);
            setIsExistingEmployee(false);
            setWorkHours([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {};

    const handleDeleteDisp = (dispId, date) => {};

    return (
        <form className="space-y-6">
            {/* Dropdown para seleccionar empleado */}
            <div className="flex flex-col gap-4 mb-4">
                <label htmlFor="employee-select" className="text-sm font-medium text-gray-700">Seleccionar Empleado</label>
                <select
                    id="employee-select"
                    value={createForm.id} // Aquí se establece el valor por defecto
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

            {/* Mensaje */}
            {message && <p className="text-red-500 text-sm">{message}</p>}

            {/* Tabla de jornadas */}
            {disp.length > 0 && (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fecha</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Hora de Inicio</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Hora de Fin</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Motivo</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700"></th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {disp.map((absence) => (
                                <tr key={absence.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{absence.date}</td>
                                    <td className="px-4 py-2">{absence.startHour || "N/A"}</td>
                                    <td className="px-4 py-2">{absence.terminationHour || "N/A"}</td>
                                    <td className="px-4 py-2">{absence.absenceReason}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleDeleteDisp(absence.id, absence.date)}
                                            className="rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white"
                                        >Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Formulario para añadir nueva ausencia */}
            <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Añadir Nueva Ausencia</h3>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3 mb-4">
                        <label htmlFor="absenceReason" className="block text-sm font-medium text-gray-700">Motivo de la Ausencia</label>
                        <input
                            type="text"
                            name="absenceReason"
                            id="absenceReason"
                            value={newPto.absenceReason}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-500 sm:text-sm py-2 px-4"
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="startHour" className="block text-sm font-medium text-gray-700">Hora de Inicio</label>
                        <input
                            type="time"
                            name="startHour"
                            id="startHour"
                            value={newPto.startHour}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-500 sm:text-sm py-2 px-4"
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="terminationHour" className="block text-sm font-medium text-gray-700">Hora de Fin</label>
                        <input
                            type="time"
                            name="terminationHour"
                            id="terminationHour"
                            value={newPto.terminationHour}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-500 sm:text-sm py-2 px-4"
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={newPto.date}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-500 sm:text-sm py-2 px-4"
                        />
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                <button  type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
           
                    <button    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white">Save</button>
               
            </div>
            </div>
        </form>
    );
};

