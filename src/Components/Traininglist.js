import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import EditTraining from './EditTraining';


import Snackbar from '@material-ui/core/Snackbar';



export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);


    useEffect(() => fetchdata(), []);

    const [open, setOpen] = React.useState(false);
    const [editopen, setEditopen] = React.useState(false);
    const [saveopen, setSaveopen] = React.useState(false);

    
    



    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setEditopen(false);
        setSaveopen(false);
    };



    const fetchdata = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            
            .then(response => response.json())
            .then(data => setTrainings(data))
            
        }
    

      
    const updateTraining = (training, link) => {
        fetch(link,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(res => fetchdata())
            .catch(err => console.error(err))
        setEditopen(true);}
  
        const deletetraining = (link) => {

        if (window.confirm('Are you sure?')) {
            fetch( link, {
                 method: 'DELETE' })
                .then(res => fetchdata())
                .catch(err => console.error(err))
            setOpen(true);
        }




    }




    const columns = [  
    { Header: 'Firstname',
    accessor: 'customer.firstname'
},
{
    Header: 'Lastname',
    accessor: 'customer.lastname'
},{
    Header: 'Activity',
    accessor: 'activity'
},
{
    Header: 'Duration',
    accessor: 'duration'
},

{

    Header: 'Date',
    accessor: 'date'
},


    {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: "links[0].href",
        Cell: row => <div><EditTraining updateTraining={updateTraining} training={row.original} />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={editopen}
                autoHideDuration={10000}
                onClose={handleClose}
                message="Training Edited"
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
        accessor: '_links.self.href',
        Cell: row => <div><Button color="secondary" size="small" onClick={() => deletetraining( `https://customerrest.herokuapp.com/api/trainings/${row.original.id}`)}>Delete</Button>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={10000}
                onClose={handleClose}
                message="Training Deleted"
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
            
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={saveopen}
                autoHideDuration={10000}
                onClose={handleClose}
                message="Training Added"
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleClose}>
                            Close
            </Button>

                    </React.Fragment>
                }
            />
            </div>
            <ReactTable filterable={true} data={trainings} columns={columns} />

        </div>
    );
}