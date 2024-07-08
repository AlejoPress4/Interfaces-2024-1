import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => { // Se recibe las filas(array de objetos), la función para eliminar y la función para editar
  return (
    <div className="table-wrapper"> 
      <table className="table">
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th className="description">Tarea Programada</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => { //mapeo de cada elemento (row) del array (rows)
            const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={idx}> 
                <td>{row.date}</td>
                <td className="expand">{row.description}</td>
                <td>
                  <span className={`label-${row.status}`}>
                    {statusText}
                  </span>
                </td>
                <td className="fit">
                  <span className="actions">
                    <BsFillTrashFill // Se agrega el ícono de eliminar
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill // Se agrega el ícono de editar
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};