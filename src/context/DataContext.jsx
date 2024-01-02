import { createContext, useState, useContext, useEffect } from "react";
import { obtenerDatos } from "../api/posts";
export const DataContext = createContext()


export const useData = ()=>{
    const context = useContext(DataContext)
    if(!context){
        throw new Error("useData Deberia estar dentro de un provider")
    }
    return context;
}
export const DataProvider = ({children}) => {
    const [destacados,setDestacados] = useState(null)
    const [data,setData] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [errors,setErrors] = useState([])

    


    const signin =  async(data)=>{
        setLoading(true)
        try {
            if((data.user && data.password) === "admin"){
                console.log(data)
                setIsAuthenticated(true);
                setLoading(false)
                localStorage.setItem('token', "Bearer");
            }else{
                setIsAuthenticated(false);
                throw "No coinciden los datos"
            }
        } catch (error) {
            console.log(error)
            setIsAuthenticated(false);
            setLoading(false)
            if(error.response.data){
                return setErrors(error.response.data)
            }
            if(error.message){
                return setErrors([error.message])
            }
        }
    }


    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
            setIsAuthenticated(true)
            setLoading(false)
        }
      }, []);

      const postData = async()=>{
        const res = await obtenerDatos()
        setData(res.data)
    }
    const destacadosData = async()=>{
        const res = await obtenerDatos()
        const listaGuardada = localStorage.getItem('destacados');
        console.log(listaGuardada)
        const listaFiltrada = res.data.filter(objeto => listaGuardada.includes(objeto.id));
        setDestacados(listaFiltrada);

    }


    return(
        <DataContext.Provider value={{
            data,
            isAuthenticated,
            loading,
            errors,
            destacados,
            signin,
            postData,
            destacadosData,
            }}>
            {children}
        </DataContext.Provider>
        )
}
