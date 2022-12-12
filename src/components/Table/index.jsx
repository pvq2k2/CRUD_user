import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../features/user/userSlice";
import { Link } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";
const columns = [
  {
    title: "First Name",
    dataIndex: "firstName",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
    width: "30%",
  },

  {
    title: "Last Name",
    dataIndex: "lastName",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
    width: "30%",
  },
  {
    title: "Email",
    dataIndex: "email",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
    width: "30%",
  },

  {
    title: "Detail",
    dataIndex: "id",
    render: (value) => (
      <Link to={`/${value}`}>
        <InfoCircleOutlined />
      </Link>
    ),
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const TableUser = () => {
  const { isLoading, users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAll());
  }, []);
  return (
    <Table
      columns={columns}
      dataSource={users.items}
      onChange={onChange}
      rowKey={(users) => users.id}
      loading={isLoading}
    />
  );
};
export default TableUser;
