import searchStyles from '../styles/Search.module.css'

const Search = ({searchTerm, handleChange, handleSubmit}) => {
    return (
        <section className={searchStyles.searchContainer} onSubmit={handleSubmit}>
            <form className={searchStyles.form} >
            <input type="text" placeholder="Type here..." value={searchTerm} onChange={handleChange} className={searchStyles.input}/> 
            <button type='submit' className={searchStyles.button}><i className="fas fa-search"></i></button>
            </form>
        </section>
    )
}

export default Search