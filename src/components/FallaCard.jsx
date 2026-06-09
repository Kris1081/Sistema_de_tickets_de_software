
const FallaCard = ({ falla, onEdit, onDelete, onCambiarEstado }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <h4 className="font-bold text-gray-800 text-lg mb-1">{falla.titulo}</h4>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{falla.descripcion}</p>
            
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-50">
                {/* select para mover de columna de forma simple */}
                <select 
                    value={falla.estado} 
                    onChange={(e) => onCambiarEstado(falla, e.target.value)}
                    className="text-xs bg-gray-50 border border-gray-200 rounded p-1 text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="reportada">Reportada</option>
                    <option value="en solucion">En Solución</option>
                    <option value="solucionada">Solucionada</option>
                </select>

                <div className="flex gap-2">
                    <button 
                        onClick={() => onEdit(falla)}
                        className="text-xs px-2 py-1 text-blue-600 hover:bg-blue-50 font-medium rounded transition"
                    >
                        Editar
                    </button>
                    <button 
                        onClick={() => onDelete(falla.id)}
                        className="text-xs px-2 py-1 text-red-600 hover:bg-red-50 font-medium rounded transition"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FallaCard;