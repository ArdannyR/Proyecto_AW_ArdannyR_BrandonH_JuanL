import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Leaf, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import clienteAxios from './config/clienteAxios';

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params; // Obtenemos el token de la URL

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/agricultores/confirmar/${id}`;
        const { data } = await clienteAxios(url);

        setAlerta({
          msg: data.msg,
          error: false
        });
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg: error.response?.data?.msg || "Token inválido",
          error: true
        });
      }
      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
       <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center mb-6">
            <div className="bg-green-600 p-3 rounded-2xl shadow-lg mb-4">
                <Leaf className="text-white h-10 w-10" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Confirma tu cuenta</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-xl rounded-3xl sm:px-10 border border-gray-100 text-center">
                {cargando ? (
                    <div className="flex justify-center"><Loader2 className="animate-spin h-10 w-10 text-green-600"/></div>
                ) : (
                    <>
                        <div className={`flex flex-col items-center gap-4 mb-6 ${alerta.error ? 'text-red-600' : 'text-green-600'}`}>
                            {alerta.error ? <XCircle size={48} /> : <CheckCircle size={48} />}
                            <p className="text-lg font-medium">{alerta.msg}</p>
                        </div>

                        {cuentaConfirmada && (
                            <Link
                                to="/login"
                                className="block w-full py-3 px-4 rounded-xl shadow-sm text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-all"
                            >
                                Iniciar Sesión
                            </Link>
                        )}
                    </>
                )}
            </div>
        </div>
    </div>
  );
};

export default ConfirmarCuenta;