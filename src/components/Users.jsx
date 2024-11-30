import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Header from './Header';
import Swal from 'sweetalert2';

const Users = () => {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers)


    const handleDeleteUser = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                

                // Delete user from Database 

                fetch(`http://localhost:5000/users/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if(data.deletedCount > 0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "User has been deleted.",
                            icon: "success"
                        });

                        const remainingUser = users.filter(user => user._id !== id)
                        setUsers(remainingUser)
                    }
                })
            }
        });
    }
    return (

        <div>
            <header>
                <Header></Header>
            </header>

            <div className='w-11/12 mx-auto'>
                <div>
                    <h2 className='text-2xl font-Rancho font-bold'> Total users : {users.length}</h2>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Created At</th>
                                    <th>Last Signin Time</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    users.map(user => <tr key={user._id}>
                                        <th>1</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.createdAt}</td>
                                        <td>{user.lastSignInTime}</td>
                                        <td className='space-x-3'>
                                            <button className='btn bg-[#362626] text-white'>Edit</button>
                                            <button onClick={() => handleDeleteUser(user._id)} className='btn bg-[#362626] text-white'>Remove</button>
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;