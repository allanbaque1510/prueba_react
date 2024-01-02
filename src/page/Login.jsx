import React,{ useState } from 'react'
import {  useNavigate} from 'react-router-dom'
import { useData } from '../context/DataContext'
const Login = () => {
    const [data, setData] = useState({user:"",password:""})
    const {signin}=useData();
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
          ...data,
          [name]: value,
        });
      };
      
    const iniciarSesion=(e) =>{
        e.preventDefault()
        signin(data);
        navigate('/posts')
        
    }
    return (
        <div className='d-flex align-items-center vh-100 justify-content-center'>
            <form className='border border-secondary p-4 rounded-4 border-opacity-25' onSubmit={iniciarSesion}>
            <div className="mb-3">
                <label htmlFor="user" className="form-label">Correo electronico</label>
                <input type="text" onChange={handleInputChange} className="form-control" name='user' id="user" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" onChange={handleInputChange} className="form-control" name='password' id="password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login