// App.js
import React from 'react';
import MyTable from './Component/Table';

const App = () => {
  const data = [
    { tree_view: '...', name: '...', BOM: '...', 'FG Store': '...', 'Scrap Reject Store': '...', Remarks: '...' },
    // Add more data rows as needed
  ];

  return (
    <div>
      <MyTable data={data} />
    </div>
  );
};

export default App;
