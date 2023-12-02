import { useEffect, useState } from "react";
import { getRequestToken, getSessionId, getAccountDetails } from "../api";
import { Link, useNavigate } from "react-router-dom";
import '../style/login.css'

export default function Favorite() {
    const [requestToken, setRequestToken] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [accountId, setAccountId] = useState(null);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(sessionId);
    }, [sessionId]);

    const handleRequestToken = () => {
        getRequestToken().then((result) => {
            setRequestToken(result);
            setStep(2);
            console.log(result);
        });
    };

    const handleLoginClick = () => {
        setStep(3);
        window.open(`https://www.themoviedb.org/authenticate/${requestToken}`);
    };

    const handleSession = (token) => {
        getSessionId(token).then((result) => {
            setSessionId(result);
            localStorage.setItem("sessionId", result);

            getAccountDetails(result).then((accountResult) => {
                setAccountId(accountResult.id);
                localStorage.setItem("accountId", accountResult.id)
                console.log('Informasi Akun:', accountResult);
                console.log('Account ID:', accountResult.id);
                navigate("/");
                window.location.reload();
            });
        });
    };

    return (
        <>
            <div className="login-container">

                {step === 1 && (
                    <>
                        <p>
                            You must login first to get full access
                        </p>
                        <button onClick={handleRequestToken}>
                            Login
                        </button>
                    </>
                )}
                {step === 2 && (
                    <>
                        Click
                        <Link onClick={handleLoginClick}>
                            here
                        </Link>
                        to approve your login to tmdb website
                    </>
                )}
                {step === 3 && (
                    <button onClick={() => handleSession(requestToken)}>
                        Continue
                    </button>
                )}
            </div>
        </>
    );
}
