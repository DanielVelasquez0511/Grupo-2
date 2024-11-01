import React from 'react';

const Lista = ({ cosas, eliminarCosa, activarEdicion }) => {
return (
    <ul>
    {cosas.map((item) => (
        <li key={item.id}>
        {item.name}
        <button onClick={() => eliminarCosa(item.id)}>Eliminar</button>
        <button onClick={() => activarEdicion(item)}>Editar</button>
        </li>
        ))}
    </ul>
    );
};

export default Lista;