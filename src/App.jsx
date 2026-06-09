import { useEffect, useState } from 'react';
import { getFallas, createFalla, updateFalla, deleteFalla } from './api/fallaApi';
import Columna from './components/Columna';
import FallaModal from './components/FallaModal';

function App() {
    const [fallas, setFallas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fallaSeleccionada, setFallaSeleccionada] = useState(null);

    // 1. Obtener todas las fallas al cargar la app
    const cargarFallas = async () => {
        try {
            const datos = await getFallas();
            setFallas(datos);
        } catch (error) {
            console.error("Error cargando fallas:", error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarFallas();
    }, []);

    // 2. Crear o Editar desde el Modal
    const handleGuardarFalla = async (datosFalla) => {
        try {
            if (fallaSeleccionada) {
                // Modo Edición
                await updateFalla(fallaSeleccionada.id, datosFalla);
            } else {
                // Modo Creación
                await createFalla(datosFalla);
            }
            cargarFallas(); // Recargar la lista sincronizada con MySQL
        } catch (error) {
            console.error("Error al guardar la falla:", error);
        }
    };

    // 3. Cambiar estado rápido desde el selector de la tarjeta
    const handleCambiarEstado = async (falla, nuevoEstado) => {
        try {
            const fallaActualizada = { ...falla, estado: nuevoEstado };
            await updateFalla(falla.id, fallaActualizada);
            cargarFallas();
        } catch (error) {
            console.error("Error al cambiar estado:", error);
        }
    };

    // 4. Eliminar Falla
    const handleEliminarFalla = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar esta falla de forma permanente?")) {
            try {
                await deleteFalla(id);
                cargarFallas();
            } catch (error) {
                console.error("Error al eliminar la falla:", error);
            }
        }
    };

    const abrirModalCrear = () => {
        setFallaSeleccionada(null);
        setIsModalOpen(true);
    };

    const abrirModalEditar = (falla) => {
        setFallaSeleccionada(falla);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 font-sans antialiased">
            {/* Header / Barra Superior */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold tracking-tight text-gray-900">Registro de fallas</h1>
                </div>
                <button 
                    onClick={abrirModalCrear}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm shadow-blue-500/10 flex items-center gap-2"
                >
                    <span>+</span> Reportar Falla
                </button>
            </header>

            {/* Contenedor del Tablero */}
            <main className="p-6 max-w-350 mx-auto">
                <div className="flex flex-col md:flex-row gap-6 items-stretch overflow-x-auto pb-4">
                    
                    <Columna 
                        titulo="reportada" 
                        colorBorde="bg-red-500"
                        fallas={fallas.filter(f => f.estado === 'reportada')}
                        onEdit={abrirModalEditar}
                        onDelete={handleEliminarFalla}
                        onCambiarEstado={handleCambiarEstado}
                    />

                    <Columna 
                        titulo="en solucion" 
                        colorBorde="bg-amber-500"
                        fallas={fallas.filter(f => f.estado === 'en solucion')}
                        onEdit={abrirModalEditar}
                        onDelete={handleEliminarFalla}
                        onCambiarEstado={handleCambiarEstado}
                    />

                    <Columna 
                        titulo="solucionada" 
                        colorBorde="bg-emerald-500"
                        fallas={fallas.filter(f => f.estado === 'solucionada')}
                        onEdit={abrirModalEditar}
                        onDelete={handleEliminarFalla}
                        onCambiarEstado={handleCambiarEstado}
                    />

                </div>
            </main>

            {/* Modal de Formularios */}
            <FallaModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleGuardarFalla}
                fallaAEditar={fallaSeleccionada}
            />
        </div>
    );
}

export default App;