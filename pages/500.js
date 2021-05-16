import { Link } from 'next/link';
const customServerSideError = () => {
    return (
        <div>
            <main>
                <section className='error-container'>
                    <h1>OOOPS!</h1>
                    <article>
                        <p>500 - Server-side error occurred</p>
                        <li>
                            <Link href='/'>
                                <a>Go To Home</a>
                            </Link>
                        </li>
                    </article>
                </section>
            </main>
        </div>
    )
}

export default customServerSideError