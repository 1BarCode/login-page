import React, { useState, useReducer } from "react";

const ACTIONS = {
    UPDATE: "UPDATE",
};

const initialState = {
    userid: "",
    password: "",
};

function reducer(credentials, action) {
    switch (action.type) {
        case ACTIONS.UPDATE:
            return {
                ...credentials,
                userid: action.payload.cred.userid,
                password: action.payload.cred.password,
            };

        default:
            return credentials;
    }
}

const initialCred = {
    userid: "",
    password: "",
};

const initialErr = {
    idErr: null,
    pwErr: null,
};

const LoginPage = () => {
    const [credentials, dispatch] = useReducer(reducer, initialState);
    const [cred, setCred] = useState(initialCred);
    const [error, setError] = useState(initialErr);

    function handleChange(e) {
        const { name, value } = e.target;
        // setCred({ ...cred, [e.target.name]: e.target.value });
        setCred((prevCred) => ({ ...prevCred, [name]: value }));
    }

    function validateCred(cred) {
        if (!cred.userid || !cred.password) {
            if (!cred.userid && !cred.password) {
                setError((prevErr) => ({
                    ...prevErr,
                    idErr: "Please Enter a Valid User Id",
                    pwErr: "Please Enter a Password",
                }));
                return false;
            }

            if (!cred.userid) {
                setError((prevErr) => ({
                    ...prevErr,
                    idErr: "Please Enter a Valid User Id",
                }));
                return false;
            }

            if (!cred.password) {
                setError((prevErr) => ({
                    ...prevErr,
                    pwErr: "Please Enter a Password",
                }));
                return false;
            }
        }

        if (cred.userid.length < 8 || cred.password.length < 8) {
            if (cred.userid.length < 8 && cred.password.length < 8) {
                setError((prevErr) => ({
                    ...prevErr,
                    idErr: "User ID must be AT LEAST 8 characters",
                    pwErr: "Password must be AT LEAST 8 characters",
                }));
                return false;
            }

            if (cred.userid.length < 8) {
                setError((prevErr) => ({
                    ...prevErr,
                    idErr: "User ID must be AT LEAST 8 characters",
                }));
                return false;
            }

            if (cred.password.length < 8) {
                setError((prevErr) => ({
                    ...prevErr,
                    pwErr: "Password must be AT LEAST 8 characters",
                }));
                return false;
            }
        } else {
            return true;
        }
    }
    function clearErr() {
        setError({ ...initialErr });
    }

    function clearCred() {
        setCred({ ...initialCred });
    }

    function handleSubmit(event) {
        event.preventDefault();
        clearErr();
        if (validateCred(cred)) {
            dispatch({ type: ACTIONS.UPDATE, payload: { cred: cred } });
            setTimeout(() => {
                alert("useReducer works! You've Logged In!");
                clearErr();
                clearCred();
            }, 100);
        }
    }

    console.log(credentials);

    return (
        <div>
            <form style={{ marginTop: 20 }} onSubmit={handleSubmit}>
                <div>
                    <input
                        style={{
                            borderBottomColor: error.idErr ? "red" : null,
                        }}
                        type="text"
                        name="userid"
                        value={cred.userid}
                        placeholder="userid"
                        onChange={(e) => handleChange(e)}
                    />
                    <p style={{ fontSize: 10, color: "red" }}>
                        {error.idErr ? error.idErr : null}
                    </p>
                </div>
                <div>
                    <input
                        style={{
                            borderBottomColor: error.pwErr ? "red" : null,
                        }}
                        type="password"
                        name="password"
                        value={cred.password}
                        placeholder="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <p style={{ fontSize: 10, color: "red" }}>
                        {error.pwErr ? error.pwErr : null}
                    </p>
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default LoginPage;
