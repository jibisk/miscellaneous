JavaScript Core Topics:

 ✅ Closures
 A closure is created when a function "remembers" variables from its outer scope, even after that outer function has finished executing.

 ✅ Event Delegation, Bubbling, Capturing

 Capturing - Event travels from the top element (document) down to the target element.
 React uses synthetic events (wrapper around native events) but bubbling works the same way.

 ✅ Hoisting
 ✅ Arrow vs Normal Functions

 Feature	Normal Function	Arrow Function
Syntax	Longer	Shorter
this Binding	Dynamic (depends on caller)	Lexical (inherits from parent scope)
arguments object	Available	Not available
Constructor support	Can use new	❌ Cannot use new
Hoisting	Yes	No
Best use case in React	Class methods, object methods	Callbacks, inline functions, event handlers

Would you like me to prepare a React mini-project (Button clicks with both arrow & normal functions) that shows how this behaves differently in event handling?

 ✅ Currying
 ✅ Flatten Arrays

const flattened = arr.flat(Infinity);
console.log(flattened); 
const flattened = JSON.parse("[" + JSON.stringify(arr).replace(/\[|\]/g, "") + "]");
console.log(flattened);


 ✅ let vs const → Block-scoped vs var → Function-scoped or globally-scoped
 ✅ Event Loop

 The Event Loop is a core concept in JavaScript that defines how asynchronous operations (like setTimeout, promises, and I/O) are handled. It ensures that non-blocking code execution happens efficiently, even though JavaScript is single-threaded.
 
 ✅ Shallow vs Deep Copy
 A shallow copy creates a new object or array, but nested objects are still referenced, not duplicated.

Changes to nested properties in the copied object also affect the original.

 const original = {
  name: "John",
  address: { city: "Dubai" },
};
const shallowCopy = { ...original }; // spread operator

shallowCopy.name = "Doe"; // ✅ Only affects shallowCopy
shallowCopy.address.city = "Abu Dhabi"; // ❌ Affects original too


const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.address.city = "Abu Dhabi";

console.log(original);
// Output: { name: "John", address: { city: "Dubai" } }


 ✅ call, bind, apply
 bind() Method
Returns a new function permanently bound to a given this value.

 ✅ Global Scope, this, null, NaN

 ✅ map vs filter vs reduce (with examples)
  reduce()
Purpose: Reduce the array to a single value (sum, average, object, or array).
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, num) => acc + num, 0);

 ✅ LocalStorage vs SessionStorage

 ✅ ES6 Features, Data Types
    1. let and const
    2. Arrow Functions
    3. Template Literals ${dsd}
    4. Default Parameters
    5. Destructuring Assignment
    6. Spread and Rest Operators 
    7. Modules (import/export)
    8. classes / promises
    10. Enhanced Object Literals

    non primitive - Object – { key: "value" }, Array – [1, 2, 3], Function – function greet() {}, Date, Map, Set (special objects)

 ✅ Promises, async/await, try...catch
 ✅ Sync vs Async, Callback functions


 console.log("1️⃣ Script Start");

// ✅ Promise Example
const fetchData = (success) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve("✅ Data fetched successfully");
      } else {
        reject("❌ Error fetching data");
      }
    }, 1000);
  });
};

// ✅ Using Promises (.then / .catch)
fetchData(true)
  .then((data) => console.log("2️⃣ Promise then:", data))
  .catch((err) => console.log("Promise catch:", err));

// ✅ Async/Await with Try...Catch
async function getData() {
  try {
    console.log("3️⃣ Async function start");
    const result1 = await fetchData(true);
    console.log("4️⃣ Await result1:", result1);

    const result2 = await fetchData(false); // Will throw error
    console.log("5️⃣ Await result2:", result2);
  } catch (error) {
    console.log("6️⃣ Caught error:", error);
  } finally {
    console.log("7️⃣ Async function finished");
  }
}

getData();

console.log("8️⃣ Script End");



function greet(name, callback) {
  console.log("Hello, " + name);
  callback();
}

function sayBye() {
  console.log("Goodbye!");
}

greet("John", sayBye);


 ✅ Concurrency vs Parallelism
Concurrency is when multiple tasks start, run, and complete in overlapping tim
Parallelism is when multiple tasks run at exactly the same time, utilizing multiple

 ✅ RegEx
 Regular Expressions (RegEx) are patterns used to match, search, and manipulate strings in JavaScript

 ✅ Java vs JavaScrip
Object-Oriented, class-based language / Scripting language, prototype-based
Compiled (bytecode runs on JVM)	 / Interpreted (runs in browsers or Node.js)


async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
getUsers();

Modern frontend applications use build tools to bundle, transpile, and optimize code before deployment.
// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
    ],
  },
};

 













⚛️ React Topics:

 ✅ useEffect, useState, useMemo, useCallback, useRef
 const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

 ✅ Custom Hooks with examples
 ✅ PureComponent – syntax

 class Counter extends PureComponent {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count });
     // PureComponent will NOT re-render if state is unchanged (shallow compare)
  };

  render() {
    console.log("Component re-rendered");
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;
  
 ✅ Context API vs Redux vs Saga

 export const UserContext = createContext();
<UserContext.Provider value={{ name: "John" }}>
   <ChildComponent />
</UserContext.Provider>
const Profile = () => {
  const { name } = useContext(UserContext);
  return <h2>Hello, {name}</h2>;
};


 ✅ State vs Props
 ✅ Controlled vs Uncontrolled Components
In a controlled component, React controls the input value via state
In an uncontrolled component, the DOM manages the input value directly.
    alert(`Typed: ${nameRef.current.value}`);


 ✅ Parent-Child Communication
 ✅ SPA, Routing, Nested Routes
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() { return <h2>Home Page</h2>; }
function About() { return <h2>About Page</h2>; }

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

<Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>

 ✅ Lazy Loading
 const Component = React.lazy(() => import('./Component'));
 <Suspense fallback={<h3>Loading...</h3>}>
        <About />
        <Contact />
      </Suspense>

 ✅ Authentication & State Management

 ✅ Microtasks vs Macrotasks
 Microtasks are queued for execution immediately after the current synchronous code and before any macrotasks.
Macrotasks are scheduled to run after the current execution and all microtasks have finished.
 
 ✅ Virtual DOM vs Real DOM
 ✅ Fiber & Reconciliation
 Reconciliation is the process React uses to compare the current Virtual DOM with the new Virtual DOM and decide what needs to change in
Fiber is React's new reconciliation engine (since React 16).


 ✅ Rules of Hooks
 ✅ Accessibility in React
Semantic HTML ,  Alt Text for Images , ARIA Attributes , htmlFor="email"> , tabIndex="0" ,  Skip Navigation Links


 ✅ Module Bundlers
 Module Bundlers are tools that take multiple JavaScript files (modules) and their dependencies and bundle them into a single optimized file (or smaller chunks) for the browser.

 ✅ Stateful vs Stateless Components
components that maintain and manage their own internal state us
Components that do not manage state internally.






 🧩 Sharing a list of hands-on coding challenges and logic questions I’ve come across while working with JavaScript and React.js




 
 1️⃣ Write basic API integration in React(using axios & fetch)

 const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Users List (Axios)</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );


 2️⃣ Display text with background color in useEffect()

 const [bgColor, setBgColor] = useState("white");

  useEffect(() => {
    // Change background color after component mounts
    setBgColor("lightblue");

    // Optional: Change color again after 3 seconds
    const timer = setTimeout(() => {
      setBgColor("lightgreen");
    }, 3000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);


 3️⃣ Implement increment & decrement logic – display current and previous value

 const [count, setCount] = useState(0);
  const [prevCount, setPrevCount] = useState(null);

  // Store previous value before updating
  const handleIncrement = () => {
    setPrevCount(count);
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setPrevCount(count);
    setCount(count - 1);
  };

  useEffect(() => {
    console.log("Current Value:", count);
    console.log("Previous Value:", prevCount);
  }, [count, prevCount]);

<button
        onClick={handleIncrement}

 4️⃣ How would you handle authentication in React? Where will you store data?

 export const loginUser = async (email, password) => {
  const response = await axios.post("https://example.com/api/login", {
    email,
    password,
  }, {
    withCredentials: true  // Needed if using cookies
  });
  
  return response.data;  // Contains token or user data
};
///////////////////////////////////////

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
///////////////////////////////////////

export const useAuth = () => useContext(AuthContext);

import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};


 5️⃣ Create a basic custom hook with an example

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
export default useCounter;

 const { count, increment, decrement, reset } = useCounter(5);

  return (
    <div>
      <button onClick={increment}> Increment</button>
      <button onClick={decrement}> Decrement</button>
      <button onClick={reset}> Reset</button>
    </div>
  );


 6️⃣ In real-world applications, JSON data is often deeply nested. How can we efficiently display it using recursion in React?

const JsonRenderer = ({ data }) => {
  if (typeof data === "object" && data !== null) {
    return (
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> <JsonRenderer data={value} />
          </li>
        ))}
      </ul>
    );
  } else {
    return <span> {String(data)}</span>;
  }
};

export default JsonRenderer;


 7️⃣ Display dynamic data with API + search implementation + auto suggestions


 import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // Fetch data from API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle search and auto-suggestions
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const suggestions = users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setFilteredSuggestions([]);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>🔍 Search Users (API + Auto-Suggestions)</h1>

      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search user by name..."
      />

      {/* Auto-Suggestions */}
      {filteredSuggestions.length > 0 && (
        <ul>
          {filteredSuggestions.map((user) => (
            <li
              key={user.id}
              onClick={() => handleSuggestionClick(user.name)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}

      {/* Filtered Results */}
      <div style={{ marginTop: "20px" }}>
        <h3>Results:</h3>
        <ul>
          {users.filter((user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;


 8️⃣ Build a basic form validation example


 function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully");
      console.log("Form Data:", formData);
      setFormData({ name: "", email: "", password: "" });
    }
  };

  return (
    <div>
      <h1>Basic Form Validation</h1>
      <form onSubmit={handleSubmit} >
        {/* Name Field */}
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label> <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label> <br />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label> <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          style={{ padding: "8px 15px", background: "blue", color: "#fff" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}


 9️⃣ Questions about hoisting and scoping in React

 Function declarations and variable declarations (var) are moved to the top of their scope before code execution.
Scope defines where variables and functions are accessible.

 🔟 Show execution order of async/await/promises with console.log()


 console.log("1 Start");

setTimeout(() => console.log("2 setTimeout"), 0);

Promise.resolve().then(() => console.log("3 Promise.resolve"));

async function testAsync() {
  console.log("4 Inside async function");

  const result = await new Promise((resolve) => {
    console.log("5 Inside promise before resolve");
    resolve("Promise Resolved");
  });

  console.log("6 After await:", result);
}

testAsync();

console.log("7 End");

 🔢 Logic Q:
Input: "abcdefgh" → Output: "dcbahgfe" (String pattern manipulation)

function manipulateString(str) {
  let result = "";
  let chunkSize = 4;

  for (let i = 0; i < str.length; i += chunkSize) {
    let chunk = str.substring(i, i + chunkSize);
    result += chunk.split("").reverse().join("");
  }

  return result;
}
manipulateString("abcdefgh")

Input: [a, b, c, b, a, a, c] → Output repeated values → [a, b, c]


function findRepeatedValues(arr) {
  return [...new Set(arr.filter((item, index) => arr.indexOf(item) !== index))];
}