import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Editcustomer from './Editcustomer';
import Addcustomer from './Addcustomer';
import Addtraining from './Addtraining';
import Snackbar from '@material-ui/core/Snackbar';




export default function Customerlist() {
    const [customers, setCustomers] = useState([]);


    useEffect(() => fetchdata(), []);

    const [open, setOpen] = React.useState(false);
    const [editopen, setEditopen] = React.useState(false);
    const [saveopen, setSaveopen] = React.useState(false);
    const [trainopen, setTrainopen] = React.useState(false);





    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setEditopen(false);
        setSaveopen(false);
        setTrainopen(false);
    };



    const fetchdata = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))

    }
    const saveTraining = training => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(training)
        })
          .then(res => fetchdata())
          .catch(err => console.error(err));
        //setSaveopen(true);
      };

    const saveCustomer = (customers) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customers)
        })
            .then(res => fetchdata())
            .catch(err => console.error(err))
            setSaveopen(true);
    }
    const updateCustomer = (customer, link) => {
        fetch(link,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchdata())
            .catch(err => console.error(err))
        setEditopen(true);
    }
   
   
        const deletecustomer = (link) => {

            if (window.confirm('Are you sure?')) {
                fetch(link, { method: 'DELETE' })
                    .then(res => fetchdata())
                    .catch(err => console.error(err))
                setOpen(true);
            }



    }




    const columns = [{

        Header: 'Firstname',
        accessor: 'firstname'
    },
    {
        Header: 'Lastname',
        accessor: 'lastname'
    },
    {
        Header: 'Streetaddress',
        accessor: 'streetaddress'
    },
    {
        Header: 'Postcode',
        accessor: 'postcode'
    },
    {
        Header: 'City',
        accessor: 'city'
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Phone',
        accessor: 'phone'
    },{
        filterable: false,
        sortable: false,
        Cell: row =>  <div> <Addtraining saveTraining={saveTraining} customer={row.original.links[0].href}/>
             <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={trainopen}
                autoHideDuration={10000}
                onClose={handleClose}
                message="Training added"
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleClose}>
                            Close
            </Button>

                    </React.Fragment>
                }
            />
          </div>
        
      },

    {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: 'links[0].href',
        Cell: row => <div><Editcustomer updateCustomer={updateCustomer} customer={row.original} />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={editopen}
                autoHideDuration={10000}
                onClose={handleClose}
                message="Customer Edited"
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleClose}>
                            Close
            </Button>

                    </React.Fragment>
                }
            />
        </div>

    },
    {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: 'links.0.href',
        Cell: row => <div><Button color="secondary" size="small" onClick={() => deletecustomer(row.value)}>Delete</Button>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={10000}
                onClose={handleClose}
                message="Customer Deleted"
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleClose}>
                            Close
            </Button>

                    </React.Fragment>
                }
            />
        </div>

    }

    ]


    return (
        <div>
            <div>
             <Addcustomer saveCustomer={saveCustomer} />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={saveopen}
                autoHideDuration={10000}
                onClose={handleClose}
                message="Customer Added"
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleClose}>
                            Close
            </Button>

                    </React.Fragment>
                }
            />
            </div>
            <ReactTable filterable={true} data={customers} columns={columns} />

        </div>
    );
}