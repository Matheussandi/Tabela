import React, { useState, useEffect } from "react";

import "./styles.css";

function Home() {
  const [periodo, setPeriodo] = useState('')
  const [disciplina, setDisciplina] = useState('')
  const [professor, setProfessor] = useState('')
  const [cargaHoraria, setCargaHoraria] = useState('')
  const [profs, setProfs] = useState([])

  function handleAddProf(e) {
    e.preventDefault();
    const data = {
      id: new Date().getTime(),
      periodo,
      disciplina,
      professor,
      cargaHoraria
    }
  
    setProfs([...profs, data])
    setPeriodo('')
    setDisciplina('')
    setProfessor('')
    setCargaHoraria('')

    if (periodo === '') {
      alert ("Período inválido");
      return;
    }

    if (disciplina === '') {
      alert ("Disciplina em branco");
      return;
    }

    if (professor === '') {
      alert ("Professor inválido");
      return;
    }

    if (cargaHoraria === '') {
      alert ("Carga Horária em branco");
      return;
    }
  }

  function handleDelete(id) {
    setProfs(profs.filter(prof => prof.id !== id))
  }

  useEffect(() => {
    function loadData() {
      const armazenamentoProfs = localStorage.getItem('@bancoprofs')
        if (armazenamentoProfs) {
          setProfs(JSON.parse(armazenamentoProfs))
        }
    }
    loadData()
  }, [])

  useEffect(() => {
    function saveData() {
      localStorage.setItem('@bancoprofs', JSON.stringify(profs));
    }
    saveData()
  }, [profs]);

  return (
    <div className="page">
      <form className="cadastro" onSubmit={handleAddProf}>
      <select 
          id="periodo" 
          value={ periodo }
          onChange={ (e) => setPeriodo(e.target.value) }
        >
          <option selected disabled value="">Período</option>
          <option value="Primeiro">1º</option>
          <option value="Segundo">2º</option>
          <option value="Terceiro">3º</option>
          <option value="Quarto">4º</option>
          <option value="Quinto">5º</option>
          <option value="Sexto">6º</option>
          <option value="Setimo">7º</option>
          <option value="Oitavo">8º</option>
        </select>

        <input
          name="disciplina"
          type="text"
          placeholder="Digite a disciplina"
          value={ disciplina }
          onChange={ (e) => setDisciplina(e.target.value) }
        />

        <select 
          id="professor" 
          value={ professor } 
          onChange={ (e) => setProfessor(e.target.value) }
        >
            <option selected disabled value="">Professor(a)</option>
            <option value="Cadu">Cadu</option>
            <option value="Debora">Débora</option>
            <option value="Luis">Luís Cláudio</option>
            <option value="Osni">Osni</option>
            <option value="Salete">Salete</option>
        </select>

        <input
          name="cargaHoraria"
          placeholder="Digite a carga horária"
          type="text"
          value={ cargaHoraria }
          onChange={ (e) => setCargaHoraria(e.target.value) }
        />

        <button type="submit">Enviar</button>
      </form>
      <table>
        <thead>
          <tr class="one>
            <th>Período</th>
            <th>Disciplina</th>
            <th>Professor(a)</th>
            <th>Carga horária</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {profs.map(prof => (
            <tr key={prof.id}>
              <td>{prof.periodo}</td>
              <td>{prof.disciplina}</td>
              <td>{prof.professor}</td>
              <td>{prof.cargaHoraria}</td>
              <td>
                <button 
                  className="Excluir"
                  onClick={() => handleDelete(prof.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Home };
