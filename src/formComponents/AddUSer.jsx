import { useEffect, useState } from "react";

const initialState = [{
    id: "1",
    name: "Ross",
    lastName: "Geller",
    email: "ross@Correo.com",
    hireDate: "2024-01-01",
    terminationDate: ""
}];

export const AddUSer = () => {
    const [createForm, setCreateForm] = useState(initialState[0]); // Inicia con un empleado de `initialState`
    const [email, setEmail] = useState("");
    const [isExistingEmployee, setIsExistingEmployee] = useState(false);
    const [message, setMessage] = useState("");
    const [employees, setEmployees] = useState(initialState); // Usa todo el array `initialState` para los empleados

    const handleInputCreateChange = (e) => {
        setCreateForm({
            ...createForm,
            [e.target.name]: e.target.value
        });
    };

    const handleInputEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSearch = async () => {};

    const handleEmployeeSelect = (e) => {
        const selectedId = e.target.value;
        const selectedEmployee = employees.find(emp => emp.id.toString() === selectedId);
        if (selectedEmployee) {
            setCreateForm(selectedEmployee);
            setIsExistingEmployee(true);
            setMessage("");
        } else {
            setCreateForm(initialState[0]); // Restaura el primer empleado si no se encuentra
            setIsExistingEmployee(false);
        }
    };

    const handleCancel = () => {
        setCreateForm(initialState[0]);
        setIsExistingEmployee(false);
    };

    return (
        <form className="space-y-6">
            {/* Dropdown para seleccionar empleado */}
            <div className="flex flex-row gap-4 mb-2">
                <div className="w-3/4">
                    <label htmlFor="employee-select" className="block text-sm font-medium leading-6 mb-2 text-gray-900">Seleccionar Empleado</label>
                    <select
                        id="employee-select"
                        value={createForm.id} // Usa el `id` de `createForm` como valor seleccionado
                        onChange={handleEmployeeSelect}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option value="">-- Seleccione un empleado --</option>
                        {employees.map(employee => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name} {employee.lastName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Input de búsqueda por email */}
            <div className="flex flex-row gap-4 mb-2">
                <div className="w-3/4">
                    <label htmlFor="email-search" className="block text-sm font-medium leading-6 mb-2 text-gray-900">Buscar por Email</label>
                    <input
                        onChange={handleInputEmailChange}
                        type="text"
                        name="email"
                        className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleSearch}
                    className="mt-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                    Buscar
                </button>
            </div>
            <div className="mb-4">{message}</div>

            {/* Campos de entrada del formulario */}
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                            <div className="mt-2">
                                <input onChange={handleInputCreateChange} type="text" name="name" value={createForm.name || ""}  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                            <div className="mt-2">
                                <input onChange={handleInputCreateChange} type="text" name="lastName" value={createForm.lastName || ""}  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input onChange={handleInputCreateChange}  name="email" value={createForm.email || ""} type="email"  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="hireDate" className="block text-sm font-medium leading-6 text-gray-900">Hire Date</label>
                            <div className="mt-2">
                                <input onChange={handleInputCreateChange} type="date" name="hireDate" value={createForm.hireDate || ""}  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="terminationDate" className="block text-sm font-medium leading-6 text-gray-900">Termination Date</label>
                            <div className="mt-2">
                                <input onChange={handleInputCreateChange} type="date" name="terminationDate" value={createForm.terminationDate || ""}  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button onClick={handleCancel} type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                {!isExistingEmployee ? (
                    <>
                        <button  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Actualizar</button>
                    </>
                ) : (
                    <>
                        <button  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Guardar</button>
                    </>
                )}
            </div>
        </form>
    );
};
