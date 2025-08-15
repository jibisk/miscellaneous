import { useEffect, useState } from "react";

export default function  ListLazy() {

  const [allItems, setAllItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch all data only once
  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    setAllItems(data);
    // first 5 items
    setVisibleItems(data.slice(0, 5));
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const start = (nextPage - 1) * 5;
    const end = nextPage * 5;
    setVisibleItems((prev) => [...prev, ...allItems.slice(start, end)]);
    setPage(nextPage);
  };

  return (
    <div className="p-4">
      <h2 className="mb-2">Posts List (Next 5 Items)</h2>

      <ul className="m-0">
        {visibleItems.map((post) => (
          <li
            key={post.id}
            className="p-0"
          >
            <p className="m-0">{post.title}</p>
            {/* <p className="text-sm text-gray-600">{post.body}</p> */}
          </li>
        ))}
      </ul>

      {loading && <p className="m-0">Loading...</p>}

      {!loading && visibleItems.length < allItems.length && (
        <button
          onClick={handleLoadMore}
          className="btn btn-dark"
        >
          Load Next 5
        </button>
      )}

      {!loading && visibleItems.length >= allItems.length && (
        <p className="m-0">No more posts to load.</p>
      )}
    </div>
  );
};
