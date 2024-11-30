import React, { useContext } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const SignUp = () => {

    const {createUser} = useContext(AuthContext)

    const handleSignUp = e => {
        e.preventDefault()

        const form = e.target
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        // const user = {name, email, password}
        // console.log(user);
        
        createUser(email, password)
        .then(result => {

            console.log(result.user);
            const createdAt = result?.user?.metadata?.creationTime;

            const newUser = {name, email, createdAt }
            // Save newuser info in the database
            fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newUser)
                
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedId){
                    alert('Create user successfully')
                }
                
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
                        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
                        <p className="text-sm text-center text-gray-600 mb-6">
                            Join <span className="text-espresso font-semibold">Espresso Emporium</span> for a delightful experience.
                        </p>
                        <form onSubmit={handleSignUp}>
                            {/* Name Input */}
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-espresso focus:border-espresso"
                                    placeholder="Your Full Name"
                                />
                            </div>
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
                                Sign Up
                            </button>
                        </form>
                        <p className="text-sm text-center text-gray-600 mt-4">
                            Already have an account?{" "}
                            <Link to="/login" className="text-espresso font-semibold">
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignUp;