import { useState } from "react";
//Porfa leer el readme :))
import "./App.css";
import { Table } from "./components/Table";
import { Modal } from "./components/Modal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      date: "06/09/2023 10:00",
      description: "Hacer tallercitos de Cuesta",
      status: "Sin iniciar",
    },
    {
      date: "06/09/2023 11:00",
      description: "Aprender react en modo speedrun",
      status: "En proceso",
    },
    // {
    // //   date: "06/09/2023 12:00",
    // //   description: "Terminar curso angular",
    // //   status: "Terminada",
    // // },
    // // {
    // //   date: "06/09/2023 13:00",
    // //   description: "Publicacion de los proyectos de interfaces",
    // //   status: "Cancelada",
    // // },
    // // {
    // //   date: "06/09/2023 14:00",
    // //   description: "Pasar Lineal",
    // //   status: "Abandonada Sin Terminar",
    // // },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null); // estado de si se esta editando una fila o no, si es null no se esta editando nada

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => { 
            if (idx !== rowToEdit) return currRow; // si no es la fila que se esta editando, se retorna la fila actual

            return newRow;
          })
        );
  };

  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button onClick={() => setModalOpen(true)} className="btn">
        Add
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default App;