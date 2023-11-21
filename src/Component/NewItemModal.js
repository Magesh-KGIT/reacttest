import React from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material';
import FinishedGoodSection from './FinishedGoodSection';
import Rawmaterial from './Rawmaterial';
import Scrap from './Scrap';
import axios from 'axios';

const NewItemModal = ({ isNewModalOpen, handleCloseModal, newItem, handleInputChange, columns }) => {
  const numberOfColumnsPerRow = 2;

  const handleSave = () => {
    // Make a POST request to the API to save the new item
    axios.post('http://localhost:3000/items', newItem)
      .then(response => {
        console.log('Item saved successfully:', response.data);
        // Additional logic or state updates can be added here
        handleCloseModal();
      })
      .catch(error => {
        console.error('Error saving item:', error);
        // Handle errors or display a message to the user
      });
  };

  const renderColumnFields = () => {
    return columns
      .filter((column) => column !== 'Tree_view' && column !== 'BOM')
      .map((column, index) => (
        <Grid key={column} item xs={12 / numberOfColumnsPerRow}>
          <TextField
            label={column}
            value={newItem[column]}
            onChange={(e) => handleInputChange(e, column)}
            fullWidth
            margin="normal"
            style={{ width: '70%', gap: '2%' }}
          />
        </Grid>
      ));
  };

  return (
    <div>
      <Dialog
        open={isNewModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="xl"
        PaperProps={{ style: { height: '200%', minHeight: '100vh' } }}
      >
        <DialogTitle style={{ backgroundColor: '#a3c734' }}>BOM</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {renderColumnFields()}
          </Grid>
          <FinishedGoodSection newItem={newItem} handleInputChange={handleInputChange} />
          <Rawmaterial newItem={newItem} handleInputChange={handleInputChange}/>
          <Scrap newItem={newItem} handleInputChange={handleInputChange} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewItemModal;
