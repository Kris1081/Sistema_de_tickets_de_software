import FallaCard from './FallaCard';

const Columna = ({ titulo, colorBorde, fallas, onEdit, onDelete, onCambiarEstado }) => {
    return (
        <div className="flex-1 min-w-[280px] bg-gray-50 p-4 rounded-2xl border border-gray-200/60 flex flex-col h-[calc(100vh-180px)]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                <h3 className="font-semibold text-gray-700 capitalize flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${colorBorde}`}></span>
                    {titulo}
                </h3>
                <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {fallas.length}
                </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                {fallas.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-8 italic">No hay fallas aquí</p>
                ) : (
                    fallas.map(falla => (
                        <FallaCard 
                            key={falla.id} 
                            falla={falla} 
                            onEdit={onEdit} 
                            onDelete={onDelete}
                            onCambiarEstado={onCambiarEstado}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Columna;