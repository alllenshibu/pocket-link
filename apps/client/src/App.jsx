import { useEffect, useState } from "react"

import axios from "axios"

function App() {
  const [urlMappings, setUrlMappings] = useState([])
  const [newUrlMapping, setNewUrlMapping] = useState({
    slug: "",
    destination: "",
    created_at: "",
  })

  const fetchUrlMappings = async () => {
    const response = await axios.get(import.meta.env.VITE_API_URL)
    console.log(response)
    setUrlMappings(response?.data?.links)
  }

  const addNewUrlMapping = async (e) => {
    e.preventDefault()
    const slug = e.target.slug.value
    const destination = e.target.destination.value
    const created_at = new Date().toISOString()
    const response = await axios.post(import.meta.env.VITE_API_URL + "/new", {
      slug,
      destination,
      created_at,
    })
    console.log(response)
    fetchUrlMappings()
  }

  useEffect(() => {
    fetchUrlMappings()
  }, [])

  return (
    <>
      <div className="container mx-auto">
        <form
          className="mx-auto w-full md:w-4/5 lg:w-3/5 flex flex-col justify-center items-start gap-2 pb-10"
          onChange={(e) => {
            setNewUrlMapping({
              ...newUrlMapping,
              [e.target.name]: e.target.value,
            })
          }}
          onSubmit={addNewUrlMapping}
        >
          <p className="text-4xl font-bold tracking-wide">Add new link</p>
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            name="slug"
            id="slug"
            className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            name="destination"
            id="destination"
            className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </form>
        <div className="md:w-4/5 lg:w-3/5 mx-auto flex flex-col justify-center items-center">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {urlMappings.map((urlMapping) => (
                <tr
                  key={urlMapping.slug}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">
                    {new Date(urlMapping.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">{urlMapping.slug}</td>
                  <td className="px-6 py-4">{urlMapping.destination}</td>
                  <td className="px-6 py-4">{urlMapping.hits}</td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={async () => {
                        const shortLink =
                          import.meta.env.VITE_API_URL + "/" + urlMapping.slug
                        if ("clipboard" in navigator) {
                          await navigator.clipboard.writeText(shortLink)
                          window.alert("Copied to clipboard")
                          return
                        } else {
                          console.log("Uh oh")
                        }
                      }}
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
