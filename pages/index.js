import React, {createContext, useState, useEffect, useCallback} from 'react'
import Head from 'next/head'
import tableStyles from '../styles/Table.module.css'
import EditableTableCell from '../components/EditableTableCell'
import EmpoleyeesDataModal from '../components/EmpoleyeesDataModal'
import Pagination from '../components/Pagination'
import Search from '../components/Search'
import data from '../components/data';

export default function Home() {
  // let isDeleted = true


  let copyOfData = JSON.parse(JSON.stringify(data))
  const [employees, setEmployees] = useState([...copyOfData])
  const [updatedEmployees, setUpdatedEmployees] = useState([])
  const [deletedEmployees, setDeletedEmployees] = useState([])
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [updatedAndDeletedEmployees, setUpdatedAndDeletedEmployees] = useState({})
  const [currentEmployees, setCurrentEmployees] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const employeesPerPage = 10

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearched, setIsSearched] = useState(false);

   
    // DELETE EMPLOYEE
    const deleteEmployee = (inputId) =>{
      let tempEmployees = [...employees];
      const mappedEmployees = tempEmployees.map(employee => {
        if(employee.inputId === inputId){
          if(employee.isDeleted){
            employee.isDeleted = false;
          }
          else if(!employee.isDeleted){
            employee.isDeleted = true;
          }
        }
        return employee
      })

      const markedAsDeletedEmployees = mappedEmployees.filter(employee=> employee.isDeleted === true)
      setDeletedEmployees(markedAsDeletedEmployees)
      // console.log(mappedEmployees)
      // console.log(markedAsDeletedEmployees)
      setEmployees(mappedEmployees)
  }
  
  // GET UPDATED AND DELETED LISTS
  const showModal = ()=> {
    setIsModalOpened(!isModalOpened)
    const notDeletedEmployees = updatedEmployees.filter(updatedEmployee=> updatedEmployee.isDeleted !== true)
    let updatedAndDeletedEmployees = {
      updated: [...notDeletedEmployees],
      deleted: [...deletedEmployees]
    }
    // console.log(updatedAndDeletedEmployees)
    setUpdatedAndDeletedEmployees(updatedAndDeletedEmployees)
  }
    
  // RESET DATA
  const resetData = ()=> {
    let copyOfData = JSON.parse(JSON.stringify(data))
    setEmployees(copyOfData)
    // const filteredEmployees = copyOfData.filter(employee=> employee.isDeleted === true)
    setDeletedEmployees([])
    setUpdatedEmployees([])
    
  }
  
  // EDITING TABLE CELLS
  const handleEmployeeTableCell = (e) => {
    let str = e.target.id;
    let arr = str.split("");
    arr.splice(str.length - 6, str.length);
    let idStr = arr.join('');

    let item = {
      id: idStr,
      name: e.target.name,
      value: e.target.value,
      type: e.target.type
    };
    let copyOfEmployeesArr = employees.slice();

    const textRegex = /([0-9-!$@#%^&*()_+|~=`{}\[\]:";'<>?,.\\\/])+/ig// eslint-disable-line
    const positionTextRegex = /([0-9!$@#%^*_+~=`\[\]";'<>?.])+/ig// eslint-disable-line
    // const phoneRegex = /^(\+|\d)[0-9]{7,16}$/
    const phoneRegex = /^\+(?:[0-9] ?){7,15}[0-9]$/;
    // const  dateOfBirthRegex = /\s+|[\/-]/g// eslint-disable-line
  

    let editedEmployees = copyOfEmployeesArr.map(employee=> {
      for (let key in employee) {
          if (key === item.name && employee.inputId === item.id) {
            if(item.type==='tel'){
              if(phoneRegex.test(item.value)){
                employee[key] = item.value;
                // console.log(item.type, phoneRegex.test(item.value), item.id)
              }
              else if(!phoneRegex.test(item.value)){
                // console.log(item.type, phoneRegex.test(item.value), item.id)
                break                  
              }
            }
            else if(item.type==='text' && item.name!=='id'&&item.type!=='tel'&&(item.name==='name'||item.name==='surname')){
              if(!textRegex.test(item.value) && item.value !==''){
                employee[key] = item.value;
                // console.log(item.type, textRegex.test(item.value), item.id)
              }
              else if(textRegex.test(item.value) || item.value ===''){
                // console.log(item.type, textRegex.test(item.value), item.id)
                break
              }
            }
            else if(item.type==='text' && item.name!=='id'&&item.type!=='tel'&&item.name==='position'){
              if(!positionTextRegex.test(item.value) && item.value !==''){
                employee[key] = item.value;
                // console.log(item.type, positionTextRegex.test(item.value), item.id)
              }
              else if(positionTextRegex.test(item.value) || item.value ===''){
                // console.log(item.type, positionTextRegex.test(item.value), item.id)
                break
              }
            }
            else{
               employee[key] = item.value;

            }
          }
      }
      return employee;
    });

      setEmployees(editedEmployees);  
  };
  
  // COMPARE INITIAL AND UPDATED
  useEffect(() => {
    let copyOfDataArr = JSON.parse(JSON.stringify(data))
    let copyOfEmployeesArr = employees.slice();    

    const comparedEmloyeesArr = copyOfEmployeesArr.filter(employeeObj=>{
      return !copyOfDataArr.some(copyEmployeeObj=>{       
        return copyEmployeeObj.id === employeeObj.id && copyEmployeeObj.name === employeeObj.name  && copyEmployeeObj.surname === employeeObj.surname && copyEmployeeObj.dateOfBirth === employeeObj.dateOfBirth && copyEmployeeObj.position === employeeObj.position && copyEmployeeObj.phoneNumber === employeeObj.phoneNumber      
      });
    });
    setUpdatedEmployees(comparedEmloyeesArr)
  },[employees])

   // useEffect(() => {
  //   console.log(updatedEmployees)
  // }, [updatedEmployees])

  // useEffect(() => {
  //   console.log(deletedEmployees)
  // }, [deletedEmployees])

  // PAGINATION
  const paginate = useCallback((pageNumber) => {
      const indexOfLastBook = pageNumber * employeesPerPage;
      const indexOfFirstBook = indexOfLastBook - employeesPerPage;
      const currentEmployees = employees.slice(indexOfFirstBook, indexOfLastBook);
      setCurrentEmployees(currentEmployees)
      setCurrentPage(pageNumber)
  }, [employeesPerPage, employees])

  useEffect(() => {
    paginate(currentPage)
  }, [currentPage, paginate])

  // HANDLE INPUT CHANGE EVENT
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
  // GET SEARCH RESULT
  const getSearchResult = useCallback(() => {
    const  dateOfBirthRegex = /\s+|[\/-]/g// eslint-disable-line
    let results = []
    let copyOfEmployeesArr = employees.slice();
    if(searchTerm === ''|| searchTerm === null || searchTerm === ' '){
      setIsSearched(false)
      paginate(currentPage)
    }
    else{
      results = copyOfEmployeesArr.filter(employee => 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || employee.surname.toLowerCase().includes(searchTerm.toLowerCase()) || employee.id.toLowerCase().includes(searchTerm.toLowerCase()) || employee.dateOfBirth.replace(dateOfBirthRegex, '').includes(searchTerm.replace(dateOfBirthRegex, '')) || employee.position.toLowerCase().includes(searchTerm.toLowerCase()) || employee.phoneNumber.replace(/\s+/g, '').includes(searchTerm.replace(/\s+/g, ''))
        )
        setIsSearched(true)
        setCurrentEmployees(results);
    }

  }, [searchTerm, employees,currentPage, paginate])


  // GET RESULTS ON CHANGE EVENT (WHILE TYPING)
  useEffect(() => {
    getSearchResult()   
  },[getSearchResult]);  
  
  // GET RESULTS ON SUBMIT EVENT (AFTER CLICKING SEARCH ICON)
  const handleSubmit = e => {
    e.preventDefault()
    getSearchResult()   
  };


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
      </Head>

    
      <Search searchTerm={searchTerm} handleChange={handleChange} handleSubmit={handleSubmit}/>
        <section className="container">
            <h1>Employees Table</h1>


            <article className={tableStyles.tableContainer}>
                    <table id={tableStyles.employees}>
                        <thead>
                        <tr className={tableStyles.tableRow}>
                            <th className={tableStyles.tableHead}>ID</th>
                            <th className={tableStyles.tableHead}>Name</th>
                            <th className={tableStyles.tableHead}>Surname</th>
                            <th className={tableStyles.tableHead}>Date of birth</th>
                            <th className={tableStyles.tableHead}>Position</th>
                            <th className={tableStyles.tableHead}>Phone number</th>
                            <th className={tableStyles.tableHead}>Status</th>
                            <th className={tableStyles.tableHead}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                          {/* <EditableTableCell value={'Name1'}/> */}

                          {
                            currentEmployees.map(employee=>{
                              const {id, name, surname, dateOfBirth, position, phoneNumber, isDeleted, inputId} = employee

                              return (
                                <tr key={inputId} className={`${tableStyles.tableRow} ${tableStyles.status} ${isDeleted ? tableStyles.deleted : tableStyles.notDeleted}`}>
                                    <EditableTableCell handleEmployeeTableCell={handleEmployeeTableCell} cellAttrs={{
                                    "type": "text",
                                    "name": "id",
                                    inputValue: id,
                                    id: `${inputId}input1`
                                    }}/>
                                    <EditableTableCell handleEmployeeTableCell={handleEmployeeTableCell} cellAttrs={{
                                    "type": "text",
                                    "name": "name",
                                    inputValue: name,
                                    id: `${inputId}input2`
                                    }}/>
                                    <EditableTableCell handleEmployeeTableCell={handleEmployeeTableCell} cellAttrs={{
                                    "type": "text",
                                    "name": "surname",
                                    inputValue: surname,
                                    id: `${inputId}input3`
                                    }}/>
                                    <EditableTableCell handleEmployeeTableCell={handleEmployeeTableCell} cellAttrs={{
                                    "type": "date",
                                    "name": "dateOfBirth",
                                    inputValue: dateOfBirth,
                                    id: `${inputId}input4`
                                    }}/>
                                    <EditableTableCell handleEmployeeTableCell={handleEmployeeTableCell} cellAttrs={{
                                    "type": "text",
                                    "name": "position",
                                    inputValue: position,
                                    id: `${inputId}input5`
                                    }}/>
                                    <EditableTableCell handleEmployeeTableCell={handleEmployeeTableCell} cellAttrs={{
                                    "type": "tel",
                                    "name": "phoneNumber",
                                    inputValue: phoneNumber,
                                    id: `${inputId}input6`
                                    }}/>
                                    <td className={`${tableStyles.tableData}`} ><span className={tableStyles.tableSpan}>{isDeleted ? 'deleted' : '.............'}</span></td>
                                    <td className={tableStyles.tableData}>
                                    {
                                        isDeleted ? <i className={`fas fa-trash-restore ${tableStyles.tableI}`} onClick={()=>deleteEmployee(inputId)}></i> : <i className="fas fa-trash" onClick={()=>deleteEmployee(inputId)}/>
                                    }
                                    
                                    </td>
                                </tr>    
                              )
                            })
                          }
                   
                        </tbody>
                    </table>                  
                </article>



                {
                    isSearched ? null :<Pagination employeesPerPage={employeesPerPage} employees={employees} currentPage={currentPage} paginate={paginate}/> 
                }
            <article className="btns-container">
                {/* <form action='#' onSubmit={handleSubmit}> */}
                    <button type='button' onClick={showModal}>Submit data</button>
                {/* </form> */}
                <button type='button' onClick={resetData}>Reset data</button>
            </article>
            
        </section>

        {
            isModalOpened &&  <EmpoleyeesDataModal updatedAndDeletedEmployees={updatedAndDeletedEmployees} showModal={showModal}/>
        }

        

   
    </>
  )
}
