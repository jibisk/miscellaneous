function isEmpty(obj){
  return Object.keys(obj).length === 0;
}
console.log(isEmpty({})) // true
/////////////////////////////


function cloneObj(obj){
  return {...obj};
}
const orgi ={a:1};
const copy = cloneObj(orgi)
console.log(copy) // {a:1}
console.log(copy === orgi) // false
/////////////////////////////


function mrgObjs(obj1,obj2){
  return {...obj1,...obj2};
}
console.log(mrgObjs({a:1},{b:2})) // {a:1,b:2}
/////////////////////////////


function deepCloneObj(obj){
  return JSON.parse(JSON.stringify(obj));
}
const orgi1 ={a:1};
const copy1 = deepCloneObj(orgi1)
console.log(copy1) // {a:1}
console.log(copy1 === orgi1) // false
/////////////////////////////


function countObj(obj){
  return Object.keys(obj).length
}
console.log(countObj({a:1,b:2})) // 2
/////////////////////////////


const person ={
    name:'sss',
    age:2,
    city:'dddd'
};

console.log(Object.keys(person)) // ['name','age','city']
console.log(Object.values(person)) //['sss', 2,'dddd']
/////////////////////////////


function hasProperty(obj, key){
  return obj.hasOwnProerty(key)
}
console.log(hasProperty({a:1,b:2},'a')) // true
console.log(hasProperty({a:1,b:2},'c')) // false
/////////////////////////////


function objToPairs(obj){
  return Object.entries(obj);
}
console.log(objToPairs({a:1,b:2}) // [['a', 1], ['b', 2]]
/////////////////////////////


function getMethods(obj){
  return Object.key(obj).filter(key => typeof obj[key] === 'function');
}

/////////////////////////////
curring

var sum =(a)=>(b)=>(c)=> return a+b+c;
function sum(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
sum(4)(3)(3)
/////////////////////////////
clossure

function outer(){
    var outerVar = “Hello”;
    function inner(){ 
        console.log(outerVar):
    }
    return inner;
}

var clouserFn = outer();
clouserFn(); //Output : Hello
/////////////////////////////


function Person(name){ 
    this.name = name;
}
Person.prototype.greet : function(){
    console.log(“Hello, ” + this.name);
}
var person = new Person(“Jonh”);
person.greet(); //Output: Hello, Jonh
/////////////////////////////
callback function

function multiplybyTwo(num){ 
    num * 2;
} 

function applyOperation(num, operation){ 
    return operation(num);
}
const result = applyOperation(5, multiplybyTwo);
console.log(result); //10
/////////////////////////////


function factorial(n){
    if(n === 0){ 
        return 1;
    }else{
        return n * factorial(- 1);
    }
} 
/////////////////////////////


const Child = useMemo(({ name }) => {
  console.log('Child rendered');
  return <div>{name}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Child name="Jibi" />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
/////////////////////////////


// Child component using forwardRef
const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} type="text" placeholder="Type here..." {...props} />;
});

function ParentComponent() {
  const inputRef = useRef();

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Directly focus the input in child
    }
  };

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
/////////////////////////////



function Box() {
  const boxRef = useRef();
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    // Measure width *before* the browser paints
    if (boxRef.current) {
      setWidth(boxRef.current.offsetWidth);
    }
  }, []); // Only run once on mount

  return (
    <div>
      <div
        ref={boxRef}
        style={{ width: '50%', padding: '20px', background: 'lightblue' }}
      >
        Resize the window to change this box size.
      </div>
      <p>Box width: {width}px</p>
    </div>
  );
}
/////////////////////////////


const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  // Expose focus method to parent
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    },
  }));

  return <input ref={inputRef} type="text" placeholder="Enter text" />;
});

// Parent component
function Parent() {
  const inputRef = useRef();

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
      <button onClick={() => inputRef.current.clear()}>Clear Input</button>
    </div>
  );
}
/////////////////////////////


// Higher-Order Component
function withLogger(WrappedComponent) {
  return function EnhancedComponent(props) {
    useEffect(() => {
      console.log('Props:', props);
    }, [props]);

    return <WrappedComponent {...props} />;
  };
}

// Regular Component
function HelloComponent({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Wrapped with HOC
const HelloWithLogger = withLogger(HelloComponent);

// App
function App() {
  return <HelloWithLogger name="Jibi" />;
}
/////////////////////////////


function MyComponent() {
  const htmlContent = {
    __html: "<h2 style='color:green;'>This is <i>raw HTML</i> content</h2>",
  };

  return (
    <div>
      <h1>Using dangerouslySetInnerHTML</h1>
      <div dangerouslySetInnerHTML={htmlContent} />
    </div>
  );
}
/////////////////////////////


function LayoutEffectExample() {
  const divRef = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      setWidth(rect.width);
    }
  }, []);

  return (
    <div>
      <div
        ref={divRef}
        style={{
          width: '60%',
          padding: '20px',
          background: '#f0f0f0',
        }}
      >
        Resize the window to change my width.
      </div>
      <p>Measured width: {width}px</p>
    </div>
  );
}

export default LayoutEffectExample;
/////////////////////////////


<SuspenseList revealOrder="forwards" tail="collapsed">
  <Suspense fallback={<Spinner />}>
    <ComponentA />
  </Suspense>
  <Suspense fallback={<Spinner />}>
    <ComponentB />
  </Suspense>
</SuspenseList>
/////////////////////////////


scroll-behavior: smooth;
/////////////////////////////

create context
import { createContext } from 'react';
export const ThemeContext = createContext();

In parent
import { ThemeContext } from './ThemeContext';
import ChildComponent from './ChildComponent';

const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={{ background: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000', padding: '20px' }}>
        <h1>useContext Example</h1>
        <ChildComponent />
      </div>
    </ThemeContext.Provider>
  );
};

In Child
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ChildComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div>
      <p>Current theme: <strong>{theme}</strong></p>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};
/////////////////////////////


class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Global meta tags */}
          <meta charSet="UTF-8" />
          <meta name="theme-color" content="#317EFB" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
/////////////////////////////


export default function handler(req, res) { 
  if (req.method === 'GET') { 
    res.status(200).json({ message: "Hello, world!" }); 
  } else { res.status(405).end(); // Method Not Allowed } 
} 
/////////////////////////////


