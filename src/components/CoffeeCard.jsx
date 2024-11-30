import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {

    const { _id, name, quantity, supplier, teste, category, details, photo } = coffee

    // Delete item 

    const handleDelete = _id => {
        console.log(_id)

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


                fetch(`http://localhost:5000/coffee/${_id}`, {
                    method: "DELETE"

                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);

                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Coffee has been deleted.",
                                icon: "success"
                            });

                            const remaining = coffees.filter(cof => cof._id !== id);
                            setCoffees(remaining);
                        }

                    })

            }
        });
    }

    return (
        <div className=''>
            <div className="  card card-side bg-[#F5F4F1] border border-[#E3B577] shadow-xl !p-2">
                <figure>
                    <img
                        src={photo}
                        alt="Movie" />
                </figure>
                <div className="card-body flex flex-row justify-between items-center p-3">
                    <div className='text-left '>
                        <h4 className="card-title"> <span className='font-bold'>Name</span> {name}</h4>
                        <p> <span className='font-bold'>Category</span> {category}</p>
                        <p> <span className='font-bold'>Quantity</span> {quantity}</p>
                    </div>
                    <div className="card-actions  flex flex-col">
                        <button className="bg-gray-400 w-12 h-10 p-2 rounded-md">View</button>
                        <Link to={`updateCoffee/${_id}`}><button className="bg-orange-400 w-12 h-10 p-2 rounded-md">Edit</button></Link>
                        <button onClick={() => handleDelete(_id)} className="bg-red-400 w-12 h-10 p-2 rounded-md">Del</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;