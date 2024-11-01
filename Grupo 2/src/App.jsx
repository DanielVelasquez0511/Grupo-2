import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import FormularioCosa from './Componentes/Formulario';
import ListaCosas from './Componentes/Lista';
import { db } from './firebase/firebaseConfig';

function App() {
  const [cosas, setCosas] = useState([]);
  const [laCosa, setLaCosa] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const cargarCosas = async () => {
      if (email) {
        const q = query(collection(db, 'cosas'), where("userEmail", "==", email));
        const querySnapshot = await getDocs(q);
        const arrayData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCosas(arrayData);
      }
    };
    cargarCosas();
  }, [email]);

  const agregarCosa = async (nuevaCosa) => {
    if (email) {
      const nuevaCosaConEmail = { ...nuevaCosa, userEmail: email };
      try {
        const docRef = await addDoc(collection(db, 'cosas'), nuevaCosaConEmail);
        setCosas(prevCosas => [...prevCosas, { ...nuevaCosaConEmail, id: docRef.id }]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const eliminarCosa = async (id) => {
    try {
      await deleteDoc(doc(db, 'cosas', id));
      setCosas(cosas.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const activarEdicion = (item) => {
    setModoEdicion(true);
    setLaCosa(item.name);
    setId(item.id);
  };

  const editarCosa = async (cosaActualizada) => {
    try {
      await updateDoc(doc(db, 'cosas', id), cosaActualizada);
      const arrayEditado = cosas.map(item => (item.id === id ? { id: item.id, ...cosaActualizada } : item));
      setCosas(arrayEditado);
      setModoEdicion(false);
      setLaCosa('');
      setId('');
    } catch (error) {
      console.error(error);
    }
  };

  const manejarSubmitEmail = (e) => {
    e.preventDefault();
    if (email) {
      const cargarCosas = async () => {
        const q = query(collection(db, 'cosas'), where("userEmail", "==", email));
        const querySnapshot = await getDocs(q);
        const arrayData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCosas(arrayData);
      };
      cargarCosas();
    }
  };

  return (
    <div>
      <form onSubmit={manejarSubmitEmail}>
        <input 
        type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingrese su correo" required
        />
        <button type="submit">Ver Mis Tareas</button>
      </form>
      <ListaCosas cosas={cosas} eliminarCosa={eliminarCosa} activarEdicion={activarEdicion} />
      <FormularioCosa laCosa={laCosa} setLaCosa={setLaCosa} agregarCosa={agregarCosa} editarCosa={editarCosa} modoEdicion={modoEdicion} />
    </div>
  );
}

export default App;