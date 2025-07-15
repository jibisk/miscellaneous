import DataTable from 'datatables.net-react'; // Ensure you installed `datatables.net-react`
import "datatables.net-bs5/css/dataTables.bootstrap5.css"; // DataTables Bootstrap 5 styling
import "datatables.net-bs5"; // Import Bootstrap 5 DataTables styling
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DataTableUsers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        console.log("API Response:", response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Define table columns (Ensure keys match API response)
  const columns = [
    { title: "ID", data: "id" },
    { title: "Name", data: "name" },
    { title: "Email", data: "email" },
    { title: "Phone", data: "phone" },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <DataTable
      className="table table-striped table-bordered table-hover"
      data={data} // Ensure `data` is an array of objects
      columns={columns}
      options={{
        paging: true,
        pageLength: 5,
        lengthMenu: [5, 10, 15, 20],
        dom: `<'row mb-2'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>
              <'row'<'col-sm-12 table-responsive'tr>>
              <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 d-flex justify-content-end'p>>`,
      }}
    />
  );
}
