import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { RestaurantEditForm } from '../../../components/dashboard/restaurant/restaurant-edit-form';
import { RestaurantNewForm } from '../../../components/dashboard/restaurant/restaurant-new-form';

export default function AddNewRestaurantDialog({ open, handleClose }) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <RestaurantNewForm handleClose={handleClose} restaurant={{ addrses1: '' }} />
      </Dialog>
    </div>
  );
}
