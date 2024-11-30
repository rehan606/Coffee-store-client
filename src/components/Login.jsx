import React, { useContext } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Login = () => {

    const {signInUser} = useContext(AuthContext)

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        signInUser(email, password)
        .then(result => {
            console.log(result.user);
            const lastSignInTime = result?.user?.metadata?.lastSignInTime;
            const loginInfo = {email, lastSignInTime}

            fetch(`http://localhost:5000/users`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            })
            .then(res => res.json())
            .then(data => {
                console.log('Signin and update database',data)
            })
        })
        .catch(error => {
            console.log(error.message);
            
        })
        
    }



    return (
        <div>
            <header>
                <Header></Header>
            </header>

            <section>
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                        <p className="text-sm text-center text-gray-600 mb-6">
                            Welcome back to{" "}
                            <span className="text-espresso font-semibold">Espresso Emporium</span>!
                        </p>
                        <form onSubmit={handleLogin}>
                            {/* Email Input */}
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-espresso focus:border-espresso"
                                    placeholder="Your Email"
                                />
                            </div>
                            {/* Password Input */}
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    required
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-espresso focus:border-espresso"
                                    placeholder="Your Password"
                                />
                            </div>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#362626] text-white py-2 px-4 rounded-lg hover:bg-espresso-dark transition"
                            >
                                Login
                            </button>
                        </form>
                        <p className="text-sm text-center text-gray-600 mt-4">
                            Don’t have an account?{" "}
                            <Link to="/signUp" className="text-espresso font-semibold">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;