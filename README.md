# Espresso Emporium. Copy store Client

### send Submited form data in servert side and database
index.js
```JS
    const coffeeCollection = client.db('coffeeDB').collection('coffee');
    // Send Submited form data in servert side
    app.post('/coffee', async(req, res) => {
        const newCoffee = req.body;
        console.log(newCoffee);
        const result = await coffeeCollection.insertOne(newCoffee);
        res.send(result);
    })

```

### Send Data to the server
AddCoffee.jsx
```js
const handleAddCoffee = event => {
        // event.preventDefault()

        // const form = event.target
        // const name = form.name.value;
        // const quantity = form.quantity.value;
        // const supplier = form.supplier.value;
        // const teste = form.teste.value;
        // const category = form.category.value;
        // const details = form.details.value;
        // const photo = form.photo.value;

        // const newCoffee = {name,quantity, supplier, teste, category, details, photo}
        // console.log(newCoffee);

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

            if(data.insertedId){
                Swal.fire({
                    title: "Success",
                    text: "CoffeeAdded Successfully",
                    icon: "success"
                  });
            }            
        })       
    }

```

## Read Coffee Data

index.js
```js
    // Read Coffee Data 
    app.get('/coffee', async(req, res) =>{
      const cursor = coffeeCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
```


### load data in homepage
main.jsx
```js
    {
        // path: "/",
        // element: <App></App>,
        loader: () => fetch('http://localhost:5000/coffee')
    },
```


### map data in App.jsx
App.jsx
```js
    function App() {

  const coffees = useLoaderData()

  return (
    <>

      <h1 className='text-2xl font-bold'>Our Popular Products {coffees.length}</h1>

      <div className='grid  md:grid-cols-2 gap-4 '>
        {
          coffees.map(coffee => <CoffeeCard key={coffee._id} coffee={coffee}></CoffeeCard>)
        }
      </div>

    </>
  )
}
```

### Display data using card

CoffeeCard.jsx
```js
import React from 'react';

const CoffeeCard = ({ coffee }) => {

    const { name, quantity, supplier, teste, category, details, photo } = coffee

    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl !p-2">
                <figure>
                    <img
                        src={photo}
                        alt="Movie" />
                </figure>
                <div className="card-body flex flex-row justify-between items-center p-0">
                    <div className='text-left '>
                        <h4 className="card-title"> <span className='font-bold'>Name</span> {name}</h4>
                        <p> <span className='font-bold'>Category</span> {category}</p>
                        <p> <span className='font-bold'>Quantity</span> {quantity}</p>
                    </div>
                    <div className="card-actions  flex flex-col">
                        <button className="bg-gray-400 w-12 h-10 p-2 rounded-md">View</button>
                        <button className="bg-gray-400 w-12 h-10 p-2 rounded-md">Edit</button>
                        <button className="bg-gray-400 w-12 h-10 p-2 rounded-md">Del</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;
```


## Delete Data

index.js
```js
    // Delete Data 
    app.delete('/coffee/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id)}
      const result = await coffeeCollection.deleteOne(query);
      res.send(result);
    })
```

CoffeeCard.jsx
```js
import React from 'react';
import Swal from 'sweetalert2';

const CoffeeCard = ({ coffee }) => {

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
                        }

                    })

            }
        });
    }

    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl !p-2">
                <figure>
                    <img
                        src={photo}
                        alt="Movie" />
                </figure>
                
                <div className="card-body flex flex-row justify-between items-center p-0">

                    // <div className='text-left '>
                    //     <h4 className="card-title"> <span className='font-bold'>Name</span> {name}</h4>
                    //     <p> <span className='font-bold'>Category</span> {category}</p>
                    //     <p> <span className='font-bold'>Quantity</span> {quantity}</p>
                    // </div>

                    <div className="card-actions  flex flex-col">

                        // <button className="bg-gray-400 w-12 h-10 p-2 rounded-md">View</button>
                        // <button className="bg-orange-400 w-12 h-10 p-2 rounded-md">Edit</button>

                        <button onClick={() => handleDelete(_id)} className="bg-red-400 w-12 h-10 p-2 rounded-md">Del</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;
```




## Update data

main.jsx
```js
Add router and loader
{
    path: "updateCoffee/:id",
    element: <UpdateCoffee></UpdateCoffee>,
    loader: ({params}) => fetch(`http://localhost:5000/coffee/${params.id}`)
},
```

UpdateCoffee.jsx
```js
const UpdateCoffee = () => {
    const coffee = useLoaderData()
    const { _id, name, quantity, supplier, teste, category, details, photo } = coffee

    const handleUpdateCoffee = event => {
        event.preventDefault()

        const form = event.target
        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const teste = form.teste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;

        const updatedCoffee = {name,quantity, supplier, teste, category, details, photo}
        console.log(updatedCoffee);

        // Send Data to the server
        fetch(`http://localhost:5000/coffee/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updatedCoffee)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if(data.modifiedCount > 0){
                Swal.fire({
                    title: "Success",
                    text: "Coffee Updated Successfully",
                    icon: "success"
                });
            }
            
        })
        
        
    }

    return (
        <div className='bg-[#F4F3F0] py-20'>
            <div className='w-6/12 mx-auto mb-10'>
                <h2 className='text-3xl font-bold  mb-4'>Update: {name} </h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti perspiciatis ea, error sint temporibus numquam aliquam culpa possimus quisquam vero, </p>
            </div>

            <form onSubmit={handleUpdateCoffee}>
                <div className="w-6/12 mx-auto">

                    <div className='flex gap-4 mt-4 '>
                        <div className="text-left w-1/2">
                            <label className=" ">Name</label>
                            <input type="text" name='name' defaultValue={name} placeholder="Enter Coffee Name" className="input input-bordered w-full  mt-3" />
                        </div>
                        <div className="text-left w-1/2">
                            <label className=" ">Available Quantity</label>
                            <input type="text" name='quantity' defaultValue={quantity} placeholder="Enter Coffee Chef" className="input input-bordered w-full  mt-3" />
                        </div>
                    </div>

                    <div className='flex gap-4 mt-4'>
                        <div className="text-left w-1/2">
                            <label className=" ">Supplier</label>
                            <input type="text" name='supplier' defaultValue={supplier} placeholder="Enter Coffee Supplier" className="input input-bordered w-full  mt-3" />
                        </div>
                        <div className="text-left w-1/2">
                            <label className=" ">Teste</label>
                            <input type="text" name='teste' defaultValue={teste} placeholder="Enter Coffee Teste" className="input input-bordered w-full  mt-3" />
                        </div>
                    </div>

                    <div className='flex gap-4 mt-4'>
                        <div className="text-left w-1/2">
                            <label className=" ">Category</label>
                            <input type="text" name='category' defaultValue={category} placeholder="Enter Coffee Category" className="input input-bordered w-full  mt-3" />
                        </div>
                        <div className="text-left w-1/2">
                            <label className=" ">Details</label>
                            <input type="text" name='details' defaultValue={details} placeholder="Enter Coffee Details" className="input input-bordered w-full  mt-3" />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <div className="text-left flex flex-col ">
                            <label className=" ">Photo</label>
                            <input type="text" name='photo' defaultValue={photo} placeholder="Enter Photo URL" className="input   input-bordered w-full  mt-3" />
                        </div>
                        <div className="text-left mt-5">
                            <button className="btn w-full bg-gray-950 text-white hover:bg-gray-950">Update Coffee</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateCoffee;
```

index.js
```js
    // Update Data in server
    app.get('/coffee/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id)}
      const result = await coffeeCollection.findOne(query);
      res.send(result);
    })
```

### Update data in database and UI
index.js
```js
// Update data in database and UI
    app.put('/coffee/:id', async (req, res)=> {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id)}
      const options = {upsert: true};
      const updatedCoffee = req.body;

      const coffee = {
        $set: {
          name: updatedCoffee.name, 
          quantity: updatedCoffee.quantity,  
          supplier: updatedCoffee.supplier,  
          teste: updatedCoffee.teste,  
          category: updatedCoffee.category,  
          details: updatedCoffee.details,  
          photo: updatedCoffee.photo
        }
      }

      const result = await coffeeCollection.updateOne(filter, coffee, options);
      res.send(result);
    })
```


