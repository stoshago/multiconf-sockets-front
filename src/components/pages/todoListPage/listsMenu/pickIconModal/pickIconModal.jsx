import React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import {availableIconKeys, CustomIcon} from "../../../../customIcon";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import IconButton from '@mui/material/IconButton';

export const PickIconModal = ({onIconSelect}) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = (event) => {
        event.preventDefault();
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onIconClick = (iconName) => {
        onIconSelect(iconName);
        handleClose();
    }

    return (
        <React.Fragment>
            <Button variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleOpen}>
                Select Icon
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Select an icon</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {availableIconKeys().map(key => (
                            <Grid item xs={2} className='centered' key={key}>
                                <IconButton aria-label={key}
                                            color='inherit'
                                            onClick={() => {onIconClick(key)}}
                                >
                                    <CustomIcon iconName={key} sx={{ fontSize: 40 }}/>
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined"
                            color="error"
                            onClick={() => onIconClick()}>
                        Clear
                    </Button>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
