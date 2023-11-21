import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
} from '@mui/material';
import NewItemModal from './NewItemModal';
import axios from 'axios';

const MyTable = () => {
  const columns = ['Tree_view', 'Name', 'BOM', 'FG Store', 'Scrap Reject Store', 'Remarks'];

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    BOM: '',
    'FG Store': '',
    'Scrap Reject Store': '',
    Remarks: '',
  });
  const [data1, setData] = useState([]);

  const handleNewButtonClick = () => {
    setIsNewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsNewModalOpen(false);
  };

  const handleSaveNewItem = () => {
    // Perform your save logic here
    console.log('Saving new item:', newItem);
    // Reset newItem and close modal
    setNewItem({
      BOM_Name: '',
      'FG Store': '',
      'Scrap Reject Store': '',
      Remarks: '',
    });
    setIsNewModalOpen(false);
  };

  const handleInputChange = (e, columnName) => {
    setNewItem((prevItem) => ({
      ...prevItem,
      [columnName]: e.target.value,
    }));
  };

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('http://localhost:3000/items')
      .then(response => {
        console.log(response)
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <TableContainer component={Paper} style={{ position: 'relative', margin: 'auto', width: '80%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={columns.length}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>BOM</h1>
                <Button variant="contained" color="primary" style={{ marginRight: 10 }} onClick={handleNewButtonClick}>
                  + New
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow style={{ backgroundColor: '#a3c734' }}>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data1?.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>{row[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* New Item Modal */}
      <Dialog open={isNewModalOpen} onClose={handleCloseModal}>
        <NewItemModal
          isNewModalOpen={isNewModalOpen}
          handleCloseModal={handleCloseModal}
          newItem={newItem}
          handleInputChange={handleInputChange}
          handleSaveNewItem={handleSaveNewItem}
          columns={columns}
        />
      </Dialog>
    </TableContainer>
  );
};

export default MyTable;
