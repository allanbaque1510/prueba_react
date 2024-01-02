import React, { useEffect, useState } from 'react'
import { useData } from '../context/DataContext'
import { DotLoader } from 'react-spinners';

const Destacados = () => {
  const {destacadosData,destacados}=useData();
  const [datosxd, setdatosxd] = useState([])
  useEffect(() => {
    destacadosData()
  }, [datosxd])
  
  const EliminarDestacado = (id) =>{
    const listaGuardada = JSON.parse(localStorage.getItem('destacados'));

    const listaActualizada = listaGuardada.filter(numero => numero !== id);
    localStorage.setItem('destacados',JSON.stringify(listaActualizada))
    setdatosxd(listaActualizada)
  }

  return (
    <div className='d-flex justify-content-center  row'>
      <a className='btn btn-success w-25' href="/posts">Lista de posts</a>

      <h1 className='text-center'>Destacados</h1>

      <div className='d-flex justify-content-center  row' >
      {destacados!== null? 
    <section className='d-flex justify-content-center  row'>
      <a className='btn btn-primary w-25' href="/destacados">Destacados</a>
      {destacados.map(datos =>(

        <div className="card w-75 m-2" key={datos.id}>
        <div className="card-header d-flex justify-content-between"> <h5>ID:{datos.id} - User: {datos.userId}</h5> <button type="button" onClick={()=>EliminarDestacado(datos.id)} className='btn  btn-secondary' >Eliminar Destacado</button></div>
        <div className="card-body">
          <h5 className="card-title">{datos.title}</h5>
          <p className="card-text">{datos.body}</p>
        </div>
      </div>
        ))}

    </section>
    :
    <DotLoader color="#36d7b7"/>
    }
    </div>

    </div>
  )
}

export default Destacados