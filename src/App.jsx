import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import DataTable from "datatables.net-react";
// import DT from 'datatables.net-dt';
import DT from "datatables.net-bs5";

import "datatables.net-select-dt";
import "datatables.net-responsive-dt";

import $ from "jquery";
// import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.css"; // DataTables CSS
// import "datatables.net-bs5"; // Import DataTables

import Select from "react-select";

import { ChevronRight, ChevronDown } from "lucide-react";

import { useForm, Controller } from "react-hook-form";
import { Button } from "react-bootstrap";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

import Slider from "react-slick";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import NetworkChart from "./NetworkChart";
import HighlightGraph from "./HighlightGraph ";
import Counter from "./components/Counter";
import DataTableUsers from "./components/DataTableUsers";
import NavbarAxios from "./components/NavbarAxios";

const treeData = [
  {
    id: "1",
    label: "Root",
    children: [
      { id: "2.1", label: "Child 1" },
      {
        id: "3",
        label: "Child 3",
        children: [
          { id: "3.1", label: "Grandchild 3.1" },
          { id: "3.2", label: "Grandchild 3.2" },
        ],
      },
      { id: "2.2", label: "Child 2" },
      {
        id: "4",
        label: "Child 4",
        children: [
          { id: "4.1", label: "Grandchild 4.1" },
          { id: "4.2", label: "Grandchild 4.2" },
        ],
      },
    ],
  },
];

const TreeNode = ({ node }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    alert(`Clicked: ${node.label}`);
  };

  return (
    <div className="ms-2">
      <div
        className="flex align-items-center gap-2 cursor-pointer p-1 hover:bg-gray-100"
        onClick={() => setExpanded(!expanded)}
      >
        {node.children ? (
          expanded ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )
        ) : (
          <span className="w-4" />
        )}
        <span
          onClick={handleClick}
          className="hover:underline"
        >
          {node.label}
        </span>
      </div>
      {expanded && node.children && (
        <div className="ms-2 ps-2">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView = () => {
  return (
    <div className="p-2 m-2 border w-fit bg-white ">
      {treeData.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
        />
      ))}
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);

  DataTable.use(DT);

  const tableRef = useRef(null);

  useEffect(() => {
    const table = $(tableRef.current);

    // Destroy any existing instance
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      table.DataTable().destroy();
    }

    // Initialize DataTable
    table.DataTable({
      dom: "<'row mb-2'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12 table-responsive'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 d-flex justify-content-end'p>>",
      paging: true,
      pageLength: 5, // Default rows per page
      lengthMenu: [5, 10, 15, 20], // Rows per page options
      // language: {
      //   paginate: {
      //     first: "First",
      //     previous: "Previous",
      //     next: "Next",
      //     last: "Last"
      //   }
      // },
      renderer: "bootstrap", // Use bootstrap style for pagination
    });

    return () => {
      // Cleanup on unmount
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        table.DataTable().destroy();
      }
    };
  }, []);

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 37.7749, // San Francisco
    lng: -122.4194,
  };

  // const [open, setOpen] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao",
  });

  const onLoad = useCallback((map) => {
    const mapType = new window.google.maps.StyledMapType(
      [{ elementType: "geometry", stylers: [{ visibility: "on" }] }],
      { name: "3D Buildings" }
    );

    map.mapTypes.set("styled_map", mapType);
    map.setMapTypeId("styled_map");

    map.setTilt(45); // Enables the 3D tilt
  }, []);

  const apiKey = "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao";

  const [position] = useState(center);

  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  const slickSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const items = [
    { id: 1, name: "Event For Jan 25", date: new Date(2025, 0, 1) },
    { id: 2, name: "Event For Feb 25", date: new Date(2025, 1, 1) },
    { id: 3, name: "Event For Mar 25", date: new Date(2025, 2, 1) },
    { id: 4, name: "Event For Apr 25", date: new Date(2025, 3, 1) },
    { id: 5, name: "Event For May 25", date: new Date(2025, 4, 1) },
    { id: 6, name: "Event For Jun 25", date: new Date(2025, 5, 1) },
    { id: 7, name: "Event For Jul 25", date: new Date(2025, 6, 1) },
    { id: 8, name: "Event For Aug 25", date: new Date(2025, 7, 1) },
    { id: 9, name: "Event For Sep 25", date: new Date(2025, 8, 1) },
    { id: 10, name: "Event For Oct 25", date: new Date(2025, 9, 1) },
    { id: 11, name: "Event For Nov 25", date: new Date(2025, 10, 1) },
    { id: 12, name: "Event For Dec 25", date: new Date(2025, 11, 1) },
  ];

  const [date, setDate] = useState(new Date());

  const [activeStartDate, setActiveStartDate] = useState(new Date(2025, 0, 1)); // Control the visible month

  const sliderRef = useRef(null);

  const handleWheel = (e) => {
    // e.preventDefault();
    if (sliderRef.current) {
      if (e.deltaY > 0) {
        // Scroll down, go to next slide
        sliderRef.current.slickNext();
      } else {
        // Scroll up, go to previous slide
        sliderRef.current.slickPrev();
      }
    }
  };

  return (
    <>
      <p>React Bootstrap Navbar - by Axios / Route</p>
      <NavbarAxios />

      <div className="container mt-5">
        <p>React DataTable Users - by Axios </p>
        <DataTableUsers />
      </div>

      <div className="container mb-3">
        <p>React redux - Counter</p>
        <Counter />
      </div>

      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>

      <HighlightGraph />

      <NetworkChart />

      <Calendar
        onChange={setDate}
        value={date}
        view="month"
        nextLabel={null} // Hide next month arrow
        prevLabel={null} // Hide previous month arrow
        next2Label={null} // Hide next year arrow
        prev2Label={null} // Hide previous year arrow
        navigationLabel={null} // Hide month-year label dropdown
        className="border-0"
        activeStartDate={activeStartDate} // Lock the view
        onActiveStartDateChange={({ action, activeStartDate }) => {
          if (action === "drillDown") {
            setActiveStartDate(date); // Prevents changing months when clicking
          }
        }}
        // tileDisabled={({ activeStartDate, view }) => view !== "month"}  // Disable all non-date tiles
      />

      <div onWheel={handleWheel}>
        <Slider
          {...slickSettings}
          ref={sliderRef}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gray-200 text-center"
            >
              <h6>{item.name}</h6>
              <Calendar
                view="month"
                nextLabel={null} // Hide next month arrow
                prevLabel={null} // Hide previous month arrow
                next2Label={null} // Hide next year arrow
                prev2Label={null} // Hide previous year arrow
                navigationLabel={null} // Hide month-year label dropdown
                className="border-0 m-auto"
                activeStartDate={item.date} // Lock the view
              />
            </div>
          ))}
        </Slider>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, bootstrap5Plugin]}
        dateClick={handleDateClick}
        initialView="dayGridMonth"
        weekends={true}
        events={[
          { title: "event 1", date: "2025-02-20" },
          { title: "event 2", date: "2025-02-22" },
        ]}
      />

      {/* <APIProvider apiKey={apiKey}>
      <div style={{ width: "100%", height: "500px" }}>
        <Map
          defaultCenter={center}
          defaultZoom={16}
          defaultMapId="3d-building-map"
          gestureHandling="greedy"
        >
          <AdvancedMarker position={position}>
            <Pin background={"#FF0000"} borderColor={"#000000"} glyphColor={"#FFFFFF"} />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider> */}

      {/* {isLoaded ? (
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16} onLoad={onLoad} />
          ) : (
            <p>Loading...</p>
          )} */}

      <TreeView />

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          defaultValue="test"
          {...register("example")}
        />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("exampleRequired", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <div style={{ width: "300px", margin: "50px auto" }}>
          <Controller
            name="fruit"
            control={control}
            rules={{ required: "Please select a fruit" }}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
              />
            )}
          />
          {errors.fruit && (
            <p className="text-red-500 text-sm mt-1">{errors.fruit.message}</p>
          )}
        </div>
        <input type="submit" />
      </form>

      <div style={{ width: "300px", margin: "50px auto" }}>
        <Select
          options={options}
          value={selectedOption}
          onChange={setSelectedOption}
          placeholder="Select a fruit..."
          isSearchable
          // isMulti
        />
      </div>

      <div className="container">
        <table
          className="myTable table table-striped table-bordered table-hover"
          ref={tableRef}
        >
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Office</th>
              <th>Age</th>
              <th>Start date</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tiger Nixon</td>
              <td>System Architect</td>
              <td>Edinburgh</td>
              <td>61</td>
              <td>2011/04/25</td>
              <td>$320,800</td>
            </tr>
            <tr>
              <td>Garrett Winters</td>
              <td>Accountant</td>
              <td>Tokyo</td>
              <td>63</td>
              <td>2011/07/25</td>
              <td>$170,750</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <a
          href="https://vite.dev"
          target="_blank"
        >
          <img
            src={viteLogo}
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
        >
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
