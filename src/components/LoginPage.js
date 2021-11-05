import React, { useState, useReducer } from "react";

// Define the actions strings as variable to keep actions consistent
const ACTIONS = {
    UPDATE: "UPDATE",
};

// useReducer's initial state
const initialState = {
    userid: "",
    password: "",
};

// reducer function takes in the initial / previous state & an action
// it returns the new state based on case
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

// initial state for useState for controlled input field
const initialCred = {
    userid: "",
    password: "",
};

// initial state for useState for setting error messages
const initialErr = {
    idErr: null,
    pwErr: null,
};

const LoginPage = () => {
    const [credentials, dispatch] = useReducer(reducer, initialState);
    const [cred, setCred] = useState(initialCred);
    const [error, setError] = useState(initialErr);

    // onChange handler function for input field
    function handleChange(e) {
        const { name, value } = e.target;
        // setCred({ ...cred, [e.target.name]: e.target.value });
        setCred((prevCred) => ({ ...prevCred, [name]: value }));
    }

    // on form submit, this function will run and check whether the credentials inputted
    // passes the requirement or not
    // if input does not pass, it will set the error state with the corresponding messages
    // return value will be boolean
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

    // functions to reset error and credential state
    function clearErr() {
        setError({ ...initialErr });
    }

    function clearCred() {
        setCred({ ...initialCred });
    }

    // form submit handler function, on submit it will clear the error state then validate the
    // credentials last entered. If credential passes, validateCred will return "true"
    // then dispatch function from useReducer hook will fire off a new action
    // action is an object containing type (case) and payload which will be passed to
    // the reducer function
    function handleSubmit(event) {
        event.preventDefault();
        clearErr();
        if (validateCred(cred)) {
            dispatch({ type: ACTIONS.UPDATE, payload: { cred: cred } });
            setTimeout(() => {
                alert(
                    "useReducer works, check console log to see useReducer's state! You've Logged In!"
                );
                clearErr();
                clearCred();
            }, 100);
        }
    }

    // log the useReducer's state
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
