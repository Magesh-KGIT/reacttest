
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Table,
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem,
  Select,
} from '@mui/material';
import axios from 'axios';

const FinishedGoodSection = ({ newItem = {}, handleInputChange }) => {
  const columnss = ['S.No', 'Part No', 'Name', 'Category', 'Qty', 'Unit', 'Cast Allocation', 'Remarks'];

  const columns = ['Part No', 'Name', 'Category', 'Qty', 'Unit', 'Cast Allocation', 'Remarks'];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedPartNo, setSelectedPartNo] = useState('');

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('http://localhost:3000/finishedGoods')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleNewButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPartNo('');
  };

  const handlePartNoChange = (event) => {
    const selectedPartNo = event.target.value;
    setSelectedPartNo(selectedPartNo);

    const selectedData = data.find(item => item['Part No'] === selectedPartNo);
    if (selectedData) {
      handleInputChange({ target: { value: selectedData.Name, name: 'Name' } }, 'Name');
      handleInputChange({ target: { value: selectedData.Category, name: 'Category' } }, 'Category');
      handleInputChange({ target: { value: selectedData.Unit, name: 'Unit' } }, 'Unit');
    }
  };

  const renderTextField = (column) => (
    <TextField
      label={column}
      value={newItem[column] || ''}
      onChange={(e) => handleInputChange(e, column)}
      fullWidth
      margin="normal"
    />
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Finished Good</h3>
        <Button variant="contained" color="primary" style={{ marginRight: 10 }} onClick={handleNewButtonClick}>
          + New
        </Button>
      </div>

      {/* Your existing table code */}
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#a3c734' }}>
            {columnss.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
            <TableCell key={columnss[columnss.length - 1]} colSpan={2}>
              {columnss[columnss.length]}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Render table rows based on data */}
        </TableBody>
      </Table>

      {/* New Item Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle style={{ backgroundColor: '#a3c734' }}>Finished Good</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {/* Render Part No as a Select component with options */}
              <Select
                label="Part No"
                value={selectedPartNo}
                onChange={handlePartNoChange}
                fullWidth
                displayEmpty
              >
                <MenuItem value="" disabled>Select Part No</MenuItem>
                {data.map(item => (
                  <MenuItem key={item['Part No']} value={item['Part No']}>
                    {item['Part No']}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {columns.slice(1, -1).map((column) => (
              <Grid item xs={6} key={column}>
                {renderTextField(column)}
              </Grid>
            ))}
            <Grid item xs={12}>
              {renderTextField(columns[columns.length - 1])}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FinishedGoodSection;
