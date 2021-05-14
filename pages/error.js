import { Link } from 'next/link';

const error = () => {
    return (
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
    )
}

export default error