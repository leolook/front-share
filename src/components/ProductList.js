import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button } from 'antd';
  
const ProductList = ({onAdd, onDelete, products }) => {
  const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
   {
    title: 'Actions',
    render: (text, record) => {
      return (
        <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
          <Button>Delete</Button>
        </Popconfirm>
      );
    },
  },
  {
    title: 'Add',
    render: (text, record) => {
      return (
        <Button onClick={()=>onAdd(record.id)}>Add</Button>
      );
    },
  }
];
  return (
    <Table
      dataSource={products}
      columns={columns}
    />
  );
};

ProductList.propTypes = {
  onAdd:    PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductList;