import React from 'react'
import 'Table.css' // Importe de la hoja de estilos de la tabla
{/* Importe de los iconos de lápiz y papelera que tal vez usare */}
import {BsFillTrashFill, BsFillPencilFill} from 'react-icons/bs' 

export const Table = () => {
  return (
    <div className='table-wrapper'> // Clase para el contenedor de la tabla
        <table className='table'> // Clase para la tabla
            <thead>
                <tr>
                    <th>Fecha y Hora</th>
                    <th className='description'> Tarea Programada</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2021-10-12 08:00</td>
                    <td>Revisión de correos</td>
                    <td>
                        <span className='label label-notInitiated'>Sin iniciar</span>
                    </td>
                <td>
                    <span className='actions'>
                        <button>Editar</button>
                        <button className='delete-btn'>Eliminar</button>
                    </span>
                </td>
                </tr>
                <tr>
                    <td>20212-11-12 10:00</td>
                    <td>Hacer otra cosa</td>
                    <td>
                        <span className='label label-canceled'>Cancelada</span>
                    </td>
                <td>
                    <span className='actions'>
                        <button>Editar</button>
                        <button className='delete-btn'>Eliminar</button>
                    </span>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
