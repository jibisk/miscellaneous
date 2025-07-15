/* eslint-disable react-hooks/exhaustive-deps */
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import "datatables.net-bs5/css/dataTables.bootstrap5.css"; // DataTables styling
import "datatables.net-bs5"; // Bootstrap DataTables
import $ from "jquery"; // jQuery required for DataTables
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function DataTableUsers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableUserRef = useRef(null);

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

  useEffect(() => {
    if (data.length > 0 && tableUserRef.current) {
      const tableUser = $(tableUserRef.current);

      // Destroy existing DataTable before initializing a new one
      if ($.fn.DataTable.isDataTable(tableUserRef.current)) {
        tableUser.DataTable().destroy();
      }

      // Initialize DataTable
      tableUser.DataTable({
        dom: "<'row mb-2'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12 table-responsive'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 d-flex justify-content-end'p>>",
        paging: true,
        pageLength: 5,
        lengthMenu: [5, 10, 15, 20],
        renderer: "bootstrap",
      });
    }

    return () => {
      if ($.fn.DataTable.isDataTable(tableUserRef.current)) {
        $(tableUserRef.current).DataTable().destroy();
      }
    };
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-3">
      <table ref={tableUserRef} className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
