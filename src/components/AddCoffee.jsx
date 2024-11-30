import React from 'react';

import Swal from 'sweetalert2'
import Header from './Header';

const AddCoffee = () => {
    const handleAddCoffee = event => {
        event.preventDefault()

        const form = event.target
        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const teste = form.teste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;

        const newCoffee = { name, quantity, supplier, teste, category, details, photo }
        console.log(newCoffee);

        // Send Data to the server
        fetch('http://localhost:5000/coffee', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newCoffee)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.insertedId) {
                    Swal.fire({
                        title: "Success",
                        text: "Coffee Added Successfully",
                        icon: "success"
                    });
                }

            })


    }
    return (
        <div>
            <header>
                <Header></Header>
            </header>

            <div className='w-11/12 mx-auto bg-[#F4F3F0] py-20'>
                <div className='w-6/12 mx-auto mb-10'>
                    <h2 className='text-3xl font-bold  mb-4 font-Rancho'>Add New Coffee </h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti perspiciatis ea, error sint temporibus numquam aliquam culpa possimus quisquam vero, </p>
                </div>

                <form onSubmit={handleAddCoffee}>
                    <div className="w-6/12 mx-auto">

                        <div className='flex gap-4 mt-4 '>
                            <div className="text-left w-1/2">
                                <label className=" ">Name</label>
                                <input type="text" name='name' placeholder="Enter Coffee Name" className="input input-bordered w-full  mt-3" />
                            </div>
                            <div className="text-left w-1/2">
                                <label className=" ">Available Quantity</label>
                                <input type="text" name='quantity' placeholder="Enter Coffee Chef" className="input input-bordered w-full  mt-3" />
                            </div>
                        </div>

                        <div className='flex gap-4 mt-4'>
                            <div className="text-left w-1/2">
                                <label className=" ">Supplier</label>
                                <input type="text" name='supplier' placeholder="Enter Coffee Supplier" className="input input-bordered w-full  mt-3" />
                            </div>
                            <div className="text-left w-1/2">
                                <label className=" ">Teste</label>
                                <input type="text" name='teste' placeholder="Enter Coffee Teste" className="input input-bordered w-full  mt-3" />
                            </div>
                        </div>

                        <div className='flex gap-4 mt-4'>
                            <div className="text-left w-1/2">
                                <label className=" ">Category</label>
                                <input type="text" name='category' placeholder="Enter Coffee Category" className="input input-bordered w-full  mt-3" />
                            </div>
                            <div className="text-left w-1/2">
                                <label className=" ">Details</label>
                                <input type="text" name='details' placeholder="Enter Coffee Details" className="input input-bordered w-full  mt-3" />
                            </div>
                        </div>

                        <div className='mt-4'>
                            <div className="text-left flex flex-col ">
                                <label className=" ">Photo</label>
                                <input type="text" name='photo' placeholder="Enter Photo URL" className="input   input-bordered w-full  mt-3" />
                            </div>
                            <div className="text-left mt-5">
                                <button className="btn w-full bg-gray-950 text-white hover:bg-gray-950">Add Coffee</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCoffee;