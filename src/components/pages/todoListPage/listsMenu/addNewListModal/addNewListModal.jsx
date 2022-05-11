import React, {useEffect, useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Alert from '@mui/material/Alert';
import {CustomIcon} from "../../../../customIcon";
import SaveIcon from '@mui/icons-material/Save';
import {PickIconModal} from "../pickIconModal";
import TodoService from "../../../../../service/todoService";

const defaultValues = {
    title: "",
    icon: null,
    public: false
};

const Divider = () => (
    <DialogContentText>
        <br/>
    </DialogContentText>
)

export const AddNewListModal = ({isOpen, onClose}) => {

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

    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        setFormValues({
            ...formValues,
            [name]: checked || false,
        });
    };

    const handleIconSelect = (icon) => {
        setFormValues({
            ...formValues,
            icon
        })
    }

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
        TodoService.createList(formValues)
            .then(handleClose)
            .catch((err) => {
                console.error('Create ToDo list error', err)
                setError("Something went wrong during list saving!");
                setLoading(false);
            });
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle>Create a new ToDo list</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create a new list of ToDo items, please, fill all the fields:
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

                    <Divider/>

                    <Grid container
                          spacing={2}>
                        <Grid item xs={6} className='centered'>
                            <PickIconModal onIconSelect={handleIconSelect}/>
                        </Grid>
                        <Grid item xs={6} className='centered'>
                            <CustomIcon iconName={formValues.icon} fontSize="large"/>
                        </Grid>
                    </Grid>

                    <Divider/>

                    <FormControlLabel
                        value="end"
                        control={<Checkbox/>}
                        label="List is Public"
                        labelPlacement="end"
                        name="public"
                        checked={formValues.public}
                        onChange={handleCheckboxChange}
                    />
                    <FormLabel component="legend">* if selected any user will be able to view this ToDo list</FormLabel>

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
