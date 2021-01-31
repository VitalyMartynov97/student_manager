import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';

import InputMask from 'react-input-mask';

function Students() {
  const API = "http://localhost:3001/students"
  const [searchParam, setSearchParam] = useState("")
  const [sortParam, setSortParam]     = useState("")
  const [data, setData] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [isEditExist, setIsEditExist] = useState(false)

  const [id, setId]                 = useState(0)
  const [surname, setSurname]       = useState("")
  const [name, setName]             = useState("")
  const [patronymic, setPatronymic] = useState("")
  const [birthdate, setBirthdate]   = useState("")
  const [algebra, setAlgebra]       = useState(0)
  const [art, setArt]               = useState(0)
  const [geography, setGeography]   = useState(0)
  const [history, setHistory]       = useState(0)
  const [english, setEnglish]       = useState(0)


  useEffect(() => {
    if(searchParam === "" || searchParam === " " ){
    axios.get(API+'/'+sortParam)
      .then(res => {
        setData(res.data);
      }, [data]);
    }
  });

  const sortByString = query => setSortParam(query)

  function handleSearchParam(text){
    setSearchParam(text)
    searchStudent(searchParam)
  }
  function searchStudent(text){
    //console.log("search: "+text)
    let tempData = []
    axios.get(API)
      .then(res => {
        res.data.map(item => {
          if(item.surname.includes(text) || item.name.includes(text) || item.patronymic.includes(text) || item.birthdate.includes(text)){
            tempData = [...tempData, item] 
          }
        setData(tempData)
      })
    });  
  }

  function toEdit(id, surname, name, patronymic, birthdate, m1, m2, m3, m4, m5){
    setSurname(surname)
    setName(name)
    setPatronymic(patronymic)
    setBirthdate(birthdate)
    setAlgebra(m1)
    setArt(m2)
    setGeography(m3)
    setHistory(m4)
    setEnglish(m5)
    setId(id)
    setIsEdit(true)
    setIsEditExist(true)
  }

  function deleteHandler(){
    axios.delete(API+`/`+`${id}`)
      .then(res => {
        console.log(res);  
        console.log(res.data);
      })
    setSurname("")
    setName("")
    setPatronymic("")
    setBirthdate("")
    setAlgebra(0)
    setArt(0)
    setGeography(0)
    setHistory(0)
    setEnglish(0)
    setIsEdit(false)
    setIsEditExist(false)
  }
  function dismisAllState(){
    setId(null)
    setSurname("")
    setName("")
    setPatronymic("")
    setBirthdate("")
    setAlgebra(0)
    setArt(0)
    setGeography(0)
    setHistory(0)
    setEnglish(0)
    setIsEdit(false)
    setIsEditExist(false)
  }
  function handleEditItemAdd(event){
    let tempDate = birthdate
    if((tempDate.substring(0,1)+0) < 32){
      console.log("correct day")
      if((tempDate.substring(3,4)+0) < 13){
        console.log("correct month")
        axios.put(API+'/'+id, {
          surname: surname, 
          name: name,
          patronymic: patronymic,
          birthdate: birthdate,
          Algebra: parseInt(algebra),
          Art: parseInt(art),
          Geography: parseInt(geography),
          History: parseInt(history),
          English: parseInt(english)
        }).then(resp => { 
          console.log(resp.data);
        }).catch(error => {
          console.log(error);
        }); 
        setSurname("")
        setName("")
        setPatronymic("")
        setBirthdate("")
        setAlgebra(0)
        setArt(0)
        setGeography(0)
        setHistory(0)
        setEnglish(0)
        setIsEdit(false)
        setIsEditExist(false)
      }else{
        alert("Неверно указан месяц");
      }
    }else{
      alert("Неверно указано число рождения");
    }
    event.preventDefault();
  }
  function handleNewItemAdd(event){
        let tempDate = birthdate
        if((tempDate.substring(0,1)+0) < 32){
            console.log("correct day")
            if((tempDate.substring(3,4)+0) < 13){
                console.log("correct month")
                const newStudent = {
                    surname: surname, 
                    name: name,
                    patronymic: patronymic,
                    birthdate: birthdate,
                    Algebra: parseInt(algebra),
                    Art: parseInt(art),
                    Geography: parseInt(geography),
                    History: parseInt(history),
                    English: parseInt(english)
                };
                axios.post(API, newStudent)
                  .then(res => {
                    console.log(res);
                    console.log(res.data);
                  })
                setSurname("")
                setName("")
                setPatronymic("")
                setBirthdate("")
                setAlgebra(0)
                setArt(0)
                setGeography(0)
                setHistory(0)
                setEnglish(0)
                setIsEdit(false)
                setIsEditExist(false)
            }else{
               alert("Неверно указан месяц");
            }
        }else{
           alert("Неверно указано число рождения");
        }
        event.preventDefault();
  }

 

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark pl5">
      <a className="navbar-brand">Student Manager</a>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            { !isEdit ? <button className="btn btn-dark" onClick={() => setIsEdit(true)}>Добавить студента</button> : null }
          </li>
        </ul>
      </div>
    </nav>
    <div className="workplace">
      
        {
          isEdit ?
          <>
            <div className="editplace">
            {
              isEditExist ?
              <div className="row align-items-center"> 
                <div className="col">              
                  <h4 className="text-dark">Редактировать</h4>
                </div>
                <div className="col-auto">
                  <span className="mr-auto dellink" onClick={() => deleteHandler()}>Удалить</span>
                </div>
              </div>
              :
              <h4 className="text-dark">Добавить студента</h4>
            }
            
            <form onSubmit={!isEditExist ? event => handleNewItemAdd(event) : event => handleEditItemAdd(event)}>
              <div className="form-group">
                <label for="formGroupExampleInput">Фамилия</label>
                <input type="text" value={surname} required onChange={e => setSurname(e.target.value)} className="form-control" id="formGroupExampleInput" placeholder="Фамилия..."/>
              </div>
             
             
              <div className="form-group mt-2">
                <label for="formGroupExampleInput2">Имя</label>
                <input type="text" value={name} required onChange={e => setName(e.target.value)} className="form-control" id="formGroupExampleInput2" placeholder="Имя..."/>
              </div>
             
               <div className="form-group mt-2">
                <label for="formGroupExampleInput2">Отчество</label>
                <input type="text" value={patronymic} required onChange={e => setPatronymic(e.target.value)} className="form-control" id="formGroupExampleInput2" placeholder="Отчество..."/>
              </div>

              <div className="form-group mt-2">
                <label for="dt">Дата рождения</label>
                <InputMask 
            placeholder="Дата рождения..." 
            mask="99-99-9999" 
            name="birthinput"
            onChange={e => setBirthdate(e.target.value)} 
            value={birthdate}
            id="dt"
            required 
            className="form-control mt-1" />  
                
              </div>
              <h5 className="mt-3 text-dark">Оценки по предметам</h5>
              <div className="row">
                <div className="col">
                  <input type="number" value={algebra} onChange={e => setAlgebra(e.target.value)} max="5" min="2" step="1" className="form-control" aria-describedby="alghelp"/>
                  <small id="alghelp"  class="form-text text-muted">Математика</small>
                </div>
                <div className="col">
                  <input type="number" value={art} onChange={e => setArt(e.target.value)} max="5" min="2" step="1" className="form-control" aria-describedby="arthelp"/>
                  <small id="arthelp" class="form-text text-muted">Изо</small>
                </div>
                <div className="col">
                  <input type="number" value={geography} onChange={e => setGeography(e.target.value)} name="geography" max="5" min="2" step="1" className="form-control" aria-describedby="geohelp"/>
                  <small id="geohelp" class="form-text text-muted">География</small>
                </div>
                <div className="col">
                  <input type="number" value={history} onChange={e => setHistory(e.target.value)} max="5" min="2" step="1" className="form-control" aria-describedby="hishelp"/>
                  <small id="hishelp" class="form-text text-muted">История</small>
                </div>
                <div className="col">
                  <input type="number" value={english} onChange={e => setEnglish(e.target.value)} max="5" min="2" step="1" className="form-control" aria-describedby="enghelp"/>
                  <small id="enghelp" class="form-text text-muted">Англ.яз</small>
                </div>
                
              </div>
              <hr/>
              <div className="row conf mt-4">
                <button type="button" class="btn btn-success col" onClick={() => dismisAllState()}>Назад</button>
                {
                  isEditExist ?
                    <input type="submit" class="btn btn-primary col tmp" value="Применить"/>
                    :
                    <input type="submit" class="btn btn-primary col tmp" value="Создать студента"/>
                }

                

              </div>
            </form>
            </div>
          </>
          :
          <>
          <div className="workplace-inner">

        <div className="row">
          <div className="col">
            <input value={searchParam} onChange={e => handleSearchParam(e.target.value)} type="text" className="form-control" placeholder="Поиск по имени или фамилии..."/>
          </div>
          <div className="col-auto">
            <Dropdown className="mr-auto">
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Сортировать
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => sortByString('?_sort=surname&_order=asc')}>По фамилии</Dropdown.Item>
                <Dropdown.Item onClick={() => sortByString('?_sort=name&_order=asc')}>По имени</Dropdown.Item>
                <Dropdown.Item onClick={() => sortByString('?_sort=Algebra,Art,Geography,History,English&_order=desc,desc,desc,desc,desc')}>По среднему балу</Dropdown.Item>
               </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        

        <table className="table table-striped table-hover table-borderless">
          <thead className="">
            <tr >
              <th scope="col">#</th>
              <th scope="col">
                <span className="sortlink" onClick={() => sortByString('?_sort=surname&_order=asc')}>
                  Фамилия
                </span>
              </th>
              <th scope="col">
                <span className="sortlink" onClick={() => sortByString('?_sort=name&_order=asc')}>
                  Имя
                </span>
              </th>
              <th scope="col">
                <span className="sortlink" onClick={() => sortByString('?_sort=patronymic&_order=asc')}>
                  Отчество
                </span>
              </th>
              <th scope="col">
                <span className="sortlink" onClick={() => sortByString('?_sort=birthdate&_order=asc')}>
                  Дата рождения
                </span>
              </th>
              <th scope="col">
                <span className="sortlink" onClick={() => sortByString('?_sort=Algebra&_order=desc')}>
                  Математика
                </span>
              </th>
              <th scope="col">
                <span className="sortlink" onClick={() => sortByString('?_sort=Art&_order=desc')}>
                  Изо
                </span>
              </th>
              <th scope="col">
                <span className="sortlink" onClick={() => sortByString('?_sort=Geography&_order=desc')}>
                  География
                </span>
              </th>
              <th scope="col">
                <span className="sortlink" onClick={() => sortByString('?_sort=History&_order=desc')}>
                  История
                </span>
              </th>
              <th scope="col">
                <span className="sortlink" onClick={() => sortByString('?_sort=English&_order=desc')}>
                  Англ.яз
                </span>
              </th>
              <th scope="col">
                <span className="sortlink" onClick={() => sortByString('?_sort=Algebra,Art,Geography,History,English&_order=desc,desc,desc,desc,desc')}>
                  Средний бал
                </span>
              </th>
              
            </tr>
          </thead>
          <tbody>
          { 
            data.map((item, i) => (
              <tr key={i} className="clikcable-tr" title="Редактировать" onClick={() => 
                    toEdit(item.id, item.surname, item.name, item.patronymic, item.birthdate, item.Algebra, item.Art, item.Geography, item.History, item.English)}>
                <th scope="row">{i+1}</th>
                <td>{item.surname}</td>
                <td>{item.name}</td>
                <td>{item.patronymic}</td>
                <td>{item.birthdate}</td>
                <td>{item.Algebra}</td>
                <td>{item.Art}</td>
                <td>{item.Geography}</td>
                <td>{item.History}</td>
                <td>{item.English}</td>
                <td>{(item.Algebra+item.Art+item.Geography+item.History+item.English)/5}</td>
              </tr>
              )
            ) 
        }
      </tbody>
    </table>
    </div>
          </>
        }
        
    </div>
   
    </>
  );
}

export default Students;
