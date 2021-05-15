import { useContext }  from 'react'
// import {EmployeesContext} from '../context/EmployeesContext'
import Head from 'next/head'

const deletedemployeeslist = () => {
    // const {deletedEmployees} = useContext(EmployeesContext)
    return (
        <>
            <Head>
                <title>Deleted employees</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
            </Head>
            <section className='list-container'>
                <h1>Deleted employees</h1>
                <article>
                    {/* {
                        deletedEmployees.length === 0 ? <p>Nothing here...</p> :  deletedEmployees.map(deletedEmployee =>{
                            const {id, name, surname, dateOfBirth, position, phoneNumber, inputId} = deletedEmployee
                            return (
                                <div key={inputId} className="employee">
                                    <h2>{name} {surname}</h2>
                                    <h3>{position}</h3>
                                    <div>
                                        <p><span>ID:</span> {id}</p>
                                        <p><span>Date of birth:</span> {dateOfBirth}</p>
                                        <p><span>Phone number:</span> {phoneNumber}</p>
                                    </div>
                                </div>
                            )
                        })
                    } */}
                </article>
            </section>
        </>
    )
}

export default deletedemployeeslist