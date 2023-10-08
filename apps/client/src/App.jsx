import { useEffect, useState } from "react";

import axios from "axios";

function App() {
  const [urlMappings, setUrlMappings] = useState([]);
  const [newUrlMapping, setNewUrlMapping] = useState({
    slug: "",
    destination: "",
    created_at: "",
  });

  const fetchUrlMappings = async () => {
    const response = await axios.get(import.meta.env.VITE_API_URL);
    console.log(response);
    setUrlMappings(response?.data?.links);
  };

  const addNewUrlMapping = async (e) => {
    e.preventDefault();
    let slug = e.target.slug.value;
    let destination = e.target.destination.value;

    const testForWhiteSpaces = (s) => {
      console.log(s);
      return /\s/.test(s);
    };

    if (testForWhiteSpaces(slug) || testForWhiteSpaces(destination))
      return window.alert("Please remove whitespaces");

    if (
      !(destination.startsWith("http://") || destination.startsWith("https://"))
    )
      destination = "http://" + destination;
    let created_at = new Date().toISOString();
    const response = await axios.post(import.meta.env.VITE_API_URL, {
      slug,
      destination,
      created_at,
    });
    console.log(response);
    fetchUrlMappings();
  };

  useEffect(() => {
    fetchUrlMappings();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <form
          className="mx-auto w-full md:w-4/5 lg:w-4/5 flex flex-col justify-center items-start gap-2 pb-10"
          onChange={(e) => {
            setNewUrlMapping({
              ...newUrlMapping,
              [e.target.name]: e.target.value,
            });
          }}
          onSubmit={addNewUrlMapping}
        >
          <p className="text-2xl font-bold tracking-wide">Add new link</p>
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            name="slug"
            id="slug"
            className="bg-neutral-800 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
          />
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            name="destination"
            id="destination"
            className="bg-neutral-800 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-neutral-200 font-semibold py-1 px-2.5"
          >
            Add
          </button>
        </form>
        <div className="md:w-4/5 lg:w-4/5 mx-auto flex flex-col justify-center items-center">
          <table className="w-full text-sm text-left text-neutral-200">
            <thead className="text-xs text-neutral-200 uppercase bg-neutral-800">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Slug
                </th>
                <th scope="col" className="px-6 py-3">
                  Destination
                </th>
                <th scope="col" className="px-6 py-3">
                  Hits
                </th>
                <th scope="col" className="px-6 py-3">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody>
              {urlMappings.map((urlMapping) => (
                <tr key={urlMapping.slug} className="bg-neutral-800">
                  <td className="px-6 py-4">
                    {new Date(urlMapping.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{urlMapping.slug}</td>
                  <td className="px-6 py-4">{urlMapping.destination}</td>
                  <td className="px-6 py-4">{urlMapping.hits}</td>
                  <td className="px-6 py-4 flex flex-row gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        const shortLink =
                          import.meta.env.VITE_API_URL + "/" + urlMapping.slug;
                        if ("clipboard" in navigator) {
                          await navigator.clipboard.writeText(shortLink);
                          window.alert("Copied to clipboard");
                          return;
                        } else {
                          console.log("Uh oh");
                        }
                      }}
                    >
                      Copy
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        const response = await axios.delete(
                          import.meta.env.VITE_API_URL + "/" + urlMapping.slug
                        );
                        console.log(response);
                        fetchUrlMappings();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
