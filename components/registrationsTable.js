import axios from "axios";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const columns = [
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "college",
    label: "College",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "groupName",
    label: "Group",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "email",
    label: "Email",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "contact",
    label: "Contact",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "order_id",
    label: "Order ID",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "createdAt",
    label: "Created At",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "updatedAt",
    label: "Updated At",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "events",
    label: "Events",
    options: {
      filter: true,
      sort: false,
    },
  },
];

const formatData = (data) => {
  if (!data) return [];
  return data.map((item) => {
    const events = item.events.map((x) => x.name).join(", ");
    const createdAt = new Date(item.createdAt).toString().split(" GMT")[0];
    const updatedAt = new Date(item.updatedAt).toString().split(" GMT")[0];
    return { ...item, events, createdAt, updatedAt };
  });
};

const options = {
  filterType: "checkbox",
  download: false,
  print: false,
  selectableRows: "none",
};

const TableComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/registrations").then((result) => {
      setData(formatData(result.data));
    });
  }, []);

  return (
    <MUIDataTable
      title={"Registrations List"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default TableComponent;
