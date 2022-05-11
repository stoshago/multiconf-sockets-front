import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import SaveIcon from '@mui/icons-material/Save';
import TodoService from "../../../../../service/todoService";

const defaultValues = {
    title: "",
    details: ""
};

const Divider = () => (
    <DialogContentText>
        <br/>
    </DialogContentText>
)

export const AddNewItemModal = ({isOpen, onClose, onItemCreated, listId}) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const handleClose = () => {
        if (loading) {
            return;
        }
        setFormValues(defaultValues);
        setOpen(false);
        setLoading(false);
        onClose();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        TodoService.createItem(listId, formValues)
            .then((resp) => {
                onItemCreated(resp);
                handleClose();
            })
            .catch((err) => {
                console.error('Create ToDo item error', err)
                setError("Something went wrong during ToDo item saving!");
                setLoading(false);
            });
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle>Create a new ToDo item</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create a new ToDo item, please, fill all the fields:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        value={formValues.title}
                        onChange={handleInputChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="details"
                        name="details"
                        label="Details"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formValues.details}
                        onChange={handleInputChange}
                    />
                    <Divider/>

                </DialogContent>
                {error ? <Alert severity="error">{error}</Alert> : null}
                <DialogActions>
                    <Button variant="outlined"
                            onClick={handleClose}
                            disabled={loading}
                    >
                        Cancel
                    </Button>
                    <LoadingButton variant="contained"
                                   type="submit"
                                   loading={loading}
                                   loadingPosition="start"
                                   startIcon={<SaveIcon/>}
                    >
                        Create
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );

}
