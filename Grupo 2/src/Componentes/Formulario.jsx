import React from 'react';

const Formulario = ({ laCosa, setLaCosa, agregarCosa, editarCosa, modoEdicion }) => {
const manejarSubmit = (e) => { e.preventDefault(); if (!laCosa.trim()) { console.log('Campo vacío'); return; } const nuevaCosa = { name: laCosa, fecha: Date.now() }; if (modoEdicion) { editarCosa(nuevaCosa); } else { agregarCosa(nuevaCosa); } setLaCosa(''); };

return (
    <form onSubmit={manejarSubmit}>
    <input type="text" value={laCosa} onChange={(e) => setLaCosa(e.target.value)} placeholder="Ingrese cosa"/>
    <button type="submit">{modoEdicion ? 'Editar' : 'Agregar'}</button>
    </form>
);
};

export default Formulario;