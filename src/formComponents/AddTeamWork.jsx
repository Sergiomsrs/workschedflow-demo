import { useEffect, useState } from "react";
import { apiWwh1, findAll, teamWork } from "../utils/demoMocks";

const wwh = [
    {
        "id": 2,
        "employee": {
            "id": 1,
            "name": "Ross",
            "lastName": "Geller",
            "email": "ross@correo.com",
            "hireDate": "2024-01-01",
            "terminationDate": "2024-12-31"
        },
        "teamWork": "Black",
        "twStartDate": "2024-01-01",
        "twTerminationDate": "2024-12-31"
    }
];

export const AddTeamWork = () => {
    const initialState = { name: '', lastName: '', email: '', hireDate: '', terminationDate: '' };
    const [createForm, setCreateForm] = useState(initialState);
    const [message, setMessage] = useState("");
    const [employees, setEmployees] = useState([]); // Estado para la lista de empleados
    const [teamWorkData, setTeamWorkData] = useState([]); // Estado para las jornadas de trabajo mockeadas
    const [newTeamWork, setNewTeamWork] = useState({ teamWork: "", twStartDate: "" }); // Estado para la nueva jornada
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

        // Cargamos los datos de jornada de trabajo mockeados
        setTeamWorkData(wwh);
        
        // Establecer el empleado con id 1 como el seleccionado por defecto
        const defaultEmployee = loadedEmployees.find(emp => emp.id === 1);
        setCreateForm(defaultEmployee);
        
        // Filtrar las jornadas del empleado con id 1
        const employeeTeamWork = wwh.filter(tw => tw.employee.id === 1);
        setTeamWorkData(employeeTeamWork);
    }, []);

    const handleEmployeeSelect = (e) => {
        const selectedId = parseInt(e.target.value);
        const selectedEmployee = employees.find(emp => emp.id === selectedId);

        if (selectedEmployee) {
            setCreateForm(selectedEmployee);
            setMessage("");

            // Aquí simulamos la carga de jornadas de trabajo sin hacer una petición
            const employeeTeamWork = teamWorkData.filter(tw => tw.employee.id === selectedEmployee.id);
            if (employeeTeamWork.length === 0) {
                setMessage("No hay equipos de trabajo registrados.");
            } else {
                setMessage("");
                setTeamWorkData(employeeTeamWork);
            }
        } else {
            setCreateForm(initialState);
            setTeamWorkData([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeamWork(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitNewTeamWork = (e) => {
        e.preventDefault();
        
        if (!newTeamWork.teamWork || !newTeamWork.twStartDate) {
            setMessage("Por favor, completa todos los campos.");
            return;
        }

        // Simulamos la creación de la nueva jornada en el array mockeado
        const newTeamWorkRecord = {
            id: Math.random(), // Generamos un ID aleatorio para el nuevo registro
            twStartDate: newTeamWork.twStartDate,
            twTerminationDate: "",
            teamWork: newTeamWork.teamWork,
            employee: createForm
        };
        
        setTeamWorkData([...teamWorkData, newTeamWorkRecord]);
        setMessage("Jornada añadida exitosamente.");
        setNewTeamWork({ teamWork: "", twStartDate: "" });
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

            {/* Tabla de jornadas */}
            {teamWorkData.length > 0 && (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fecha Inicio</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fecha Fin</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Equipo de trabajo</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {teamWorkData.map((tw) => (
                                <tr key={tw.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{tw.twStartDate}</td>
                                    <td className="px-4 py-2">{tw.twTerminationDate || "N/A"}</td>
                                    <td className="px-4 py-2">{tw.teamWork}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Formulario para añadir nueva jornada */}
            <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Añadir Equipo de Trabajo</h3>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="teamWork" className="block text-sm font-medium text-gray-700 mb-2">Equipo</label>
                        <input
                            name="teamWork"
                            id="teamWork"
                            value={newTeamWork.teamWork}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-500 sm:text-sm py-1.5 pl-2"
                        />
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="twStartDate" className="block text-sm font-medium text-gray-700 mb-2">Fecha de Inicio</label>
                        <input
                            type="date"
                            name="twStartDate"
                            id="twStartDate"
                            value={newTeamWork.twStartDate}
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


