import { Link } from 'next/link';
const error = () => {
    return (
        <div>
            <main>
                <section className='error-container'>
                    <h1>OOOPS!</h1>
                    <article>
                        <p>Page not found :(</p>
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

export default error