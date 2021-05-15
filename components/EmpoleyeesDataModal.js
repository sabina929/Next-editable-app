import {useState, useEffect} from 'react'
import modalStyles from '../styles/Modal.module.css'

const EmployeesDataModal = ({updatedAndDeletedEmployees, showModal}) => {
    const [isEmpty, setIsEmpty] = useState(true)
    
    useEffect(()=>{
      if(updatedAndDeletedEmployees.updated.length===0 && updatedAndDeletedEmployees.deleted.length===0){
        setIsEmpty(true)
      }
      else{
        setIsEmpty(false)
        
      }
    }, [updatedAndDeletedEmployees.updated.length,updatedAndDeletedEmployees.deleted.length])
  
    let updatedAndDeletedEmployeesJSONFile = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(updatedAndDeletedEmployees, undefined, 4));
  
      return (
          <section className={modalStyles.modalContainer}>        
          <article className={modalStyles.background} onClick={showModal}></article>
          <article className={`${modalStyles.modal} ${isEmpty? modalStyles.empty: modalStyles.notEmpty}`}>
            <div className={modalStyles.div}>
            <pre className={modalStyles.pre}>
              {JSON.stringify(updatedAndDeletedEmployees, undefined, 4)}
            </pre>
  
            </div>
            <a href={`data:${updatedAndDeletedEmployeesJSONFile}`} download="employeesData.json" className={modalStyles.link}>Download As JSON</a>
          </article>
          <i className="fas fa-times" onClick={showModal}></i>
        </section>
      )
  }
  
  export default EmployeesDataModal