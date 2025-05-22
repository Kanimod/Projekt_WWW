import './../index.css'

export function LoginContainer() {
    const hideLogin = () => {
        document.getElementById('login-container').className = "hidden"
    }

    return (
        <>
            <div className="login">
                <button onClick={hideLogin} className="close-login">X</button>
                <div className="text">Zaloguj się :3</div>

                <form action="link/referencja gdzie wyslac pobrane dane">
                    <div className="data">
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            required
                            placeholder="Wpisz Email"
                            minLength="0"
                            onInvalid={(e) => e.target.setCustomValidity('Email is required')}
                            onInput={(e) => e.target.setCustomValidity('')}
                        />
                    </div>

                    <div className="data">
                        <label htmlFor="">Hasło</label>
                        <input
                            type="password"
                            required
                            placeholder="Wpisz Masło"
                            minLength="0"
                            onInvalid={(e) => e.target.setCustomValidity('Masło is required')}
                            onInput={(e) => e.target.setCustomValidity('')}
                        />
                    </div>

                    <div className="forgotten-password">
                        <a href="media/ehhh.jpeg">Zapomniano Pasów?</a>
                    </div>

                    <div className="submit-button">
                        <button type="submit">Zaloguj</button>
                    </div>
                </form>
            </div>
        </>
    )
}
