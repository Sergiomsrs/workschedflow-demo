import { useEffect, useState } from "react";

const pto1 = [
    {
        "id": 49,
        "employee": {
            "id": 1,
            "name": "Ross",
            "lastName": "Geller",
            "email": "ross@correo.com",
            "hireDate": "2024-01-01",
            "terminationDate": "2024-12-31"
        },
        "absenceReason": "Vacaciones",
        "startDate": "2024-11-11",
        "terminationDate": "2024-11-17"
    },
    {
        "id": 50,
        "employee": {
            "id": 1,
            "name": "Ross",
            "lastName": "Geller",
            "email": "ross@correo.com",
            "hireDate": "2024-01-01",
            "terminationDate": "2024-12-31"
        },
        "absenceReason": "Vacaciones",
        "startDate": "2024-11-18",
        "terminationDate": "2024-11-24"
    }
];

export const AddPto = () => {
    const initialState = { name: '', lastName: '', email: '', hireDate: '', terminationDate: '' };
    const [createForm, setCreateForm] = useState(initialState);
    const [message, setMessage] = useState("");
    const [employees, setEmployees] = useState([]); // Estado para la lista de empleados
    const [ptoData, setPtoData] = useState([]); // Estado para las solicitudes de PTO
    const [newPto, setNewPto] = useState({ absenceReason: "", startDate: "", terminationDate: "" }); // Estado para la nueva solicitud de PTO
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(1); // Inicializamos con el id 1

    // Cargar empleados mockeados en modo demo
    useEffect(() => {
        // Aquí cargamos los empleados mockeados en lugar de hacer una petición a la API
        const loadedEmployees = [
            {
                id: 1,
                name: "Ross",
                lastName: "Geller",
                email: "ross@correo.com",
                hireDate: "2024-01-01",
                terminationDate: "2024-12-31"
            },
            {
                id: 2,
                name: "Rachel",
                lastName: "Green",
                email: "rachel@correo.com",
                hireDate: "2024-02-01",
                terminationDate: "2024-12-31"
            }
        ];
        setEmployees(loadedEmployees);

        // Cargamos los datos de PTO
        setPtoData(pto1);
        
        // Establecer el empleado con id 1 como el seleccionado por defecto
        const defaultEmployee = loadedEmployees.find(emp => emp.id === 1);
        setCreateForm(defaultEmployee);
        
        // Filtrar las solicitudes de PTO del empleado con id 1
        const employeePto = pto1.filter(pto => pto.employee.id === 1);
        setPtoData(employeePto);
    }, []);

    const handleEmployeeSelect = (e) => {
        const selectedId = parseInt(e.target.value);
        const selectedEmployee = employees.find(emp => emp.id === selectedId);

        if (selectedEmployee) {
            setCreateForm(selectedEmployee);
            setMessage("");

            // Aquí simulamos la carga de solicitudes de PTO sin hacer una petición
            const employeePto = ptoData.filter(pto => pto.employee.id === selectedEmployee.id);
            if (employeePto.length === 0) {
                setMessage("No hay solicitudes de PTO registradas.");
            } else {
                setMessage("");
                setPtoData(employeePto);
            }
        } else {
            setCreateForm(initialState);
            setPtoData([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitNewPto = (e) => {
        e.preventDefault();
        
        if (!newPto.absenceReason || !newPto.startDate || !newPto.terminationDate) {
            setMessage("Por favor, completa todos los campos.");
            return;
        }

        // Simulamos la creación de una nueva solicitud de PTO en el array mockeado
        const newPtoRecord = {
            id: Math.random(), // Generamos un ID aleatorio para el nuevo registro
            startDate: newPto.startDate,
            terminationDate: newPto.terminationDate,
            absenceReason: newPto.absenceReason,
            employee: createForm
        };
        
        setPtoData([...ptoData, newPtoRecord]);
        setMessage("Solicitud de PTO añadida exitosamente.");
        setNewPto({ absenceReason: "", startDate: "", terminationDate: "" });
    };

    return (
        <form className="space-y-6">
            {/* Dropdown para seleccionar empleado */}
            <div className="flex flex-col gap-4 mb-4">
                <label htmlFor="employee-select" className="text-sm font-medium text-gray-700">Seleccionar Empleado</label>
                <select
                    id="employee-select"
                    onChange={handleEmployeeSelect}
                    value={selectedEmployeeId} // Vinculamos el valor con el estado
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

            {/* Tabla de solicitudes de PTO */}
            {ptoData.length > 0 && (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fecha Inicio</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fecha Fin</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Motivo</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {ptoData.map((pto) => (
                                <tr key={pto.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{pto.startDate}</td>
                                    <td className="px-4 py-2">{pto.terminationDate || "N/A"}</td>
                                    <td className="px-4 py-2">{pto.absenceReason}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Formulario para añadir nueva solicitud de PTO */}
            <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Añadir Solicitud de PTO</h3>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="absenceReason" className="block text-sm font-medium text-gray-700 mb-2">Motivo de la Ausencia</label>
                        <input
                            name="absenceReason"
                            id="absenceReason"
                            value={newPto.absenceReason}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-500 sm:text-sm py-1.5 pl-2"
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">Fecha de Inicio</label>
                        <input
                            type="date"
                            name="startDate"
                            id="startDate"
                            value={newPto.startDate}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-500 sm:text-sm py-1.5 px-2"
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="terminationDate" className="block text-sm font-medium text-gray-700 mb-2">Fecha de Fin</label>
                        <input
                            type="date"
                            name="terminationDate"
                            id="terminationDate"
                            value={newPto.terminationDate}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-500 sm:text-sm py-1.5 px-2"
                        />
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
                    <button  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white">Guardar</button>
                </div>
            </div>
        </form>
    );
};


