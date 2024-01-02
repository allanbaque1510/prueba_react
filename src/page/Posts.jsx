import React, { useEffect, useState } from 'react'
import { useData } from '../context/DataContext'
import { DotLoader } from 'react-spinners';

const Posts = () => {
  const [listaNumeros, setListaNumeros] = useState([])
  const {postData,data}=useData();
  useEffect(() => {
    postData()
    const listaGuardada = JSON.parse(localStorage.getItem('destacados'));
    setListaNumeros(listaGuardada)
  }, [])
  console.log(listaNumeros)
  

  const AgregarDestacado = (id)=>{
    const listaGuardada = localStorage.getItem('destacados');
    if (listaGuardada) {
      const almacenados = JSON.parse(listaGuardada);
     
      const listaActualizada = [...almacenados, id];
      setListaNumeros(listaActualizada)
      localStorage.setItem('destacados', JSON.stringify(listaActualizada));
    }
    else{
      const listaActualizada = [id];
      setListaNumeros(listaActualizada)
      localStorage.setItem('destacados', JSON.stringify(listaActualizada));
    }
  }
  return (
    <div>
      {data!== null? 
      
    <section className='d-flex justify-content-center  row'>
      <a className='btn btn-primary w-25' href="/destacados">Destacados</a>
      {data.map(datos =>(

        <div className="card w-75 m-2" key={datos.id}>
        <div className="card-header d-flex justify-content-between"> <h5>ID:{datos.id} - User: {datos.userId}</h5> 
        {listaNumeros.includes(datos.id)?
        <button type="button" disabled={true} onClick={()=>AgregarDestacado(datos.id)} className='btn  btn-secondary' >Agregado</button>
        :
        <button type="button" onClick={()=>AgregarDestacado(datos.id)} className='btn  btn-secondary' >Agregar Destacado</button>
        }
        
        </div>
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
  )
}

export default Posts