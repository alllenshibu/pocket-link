import { useEffect, useState } from "react"

import axios from "axios"

function App() {
  const [urlMappings, setUrlMappings] = useState([])
  const [newUrlMapping, setNewUrlMapping] = useState({
    key_link: "",
    destination_url: "",
  })

  const fetchUrlMappings = async () => {
    const response = await axios.get(import.meta.env.VITE_API_URL)
    console.log(response)
    setUrlMappings(response?.data?.links)
  }

  const addNewUrlMapping = async (e) => {
    e.preventDefault()
    const key_link = e.target.key_link.value
    const destination_url = e.target.destination_url.value
    const response = await axios.post(import.meta.env.VITE_API_URL + "/new", {
      key_link,
      destination_url,
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
          className="mx-auto w-full md:w-4/5 lg:w-3/5"
          onChange={(e) => {
            setNewUrlMapping({
              ...newUrlMapping,
              [e.target.name]: e.target.value,
            })
            console.log(newUrlMapping)
          }}
          onSubmit={addNewUrlMapping}
        >
          <p className="text-4xl font-bold tracking-wide">Add new link</p>
          <label htmlFor="key_link">Key Link</label>
          <input
            type="text"
            name="key_link"
            id="key_link"
            className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <label htmlFor="destination_url">Destination</label>
          <input
            type="text"
            name="destination_url"
            id="destination_url"
            className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </form>
        <div className="flex flex-col justify-center items-center">
          {urlMappings.map((urlMapping) => (
            <div
              key={urlMapping.id}
              className="w-full md:w-4/5 lg:w-3/5 ring-1 ring-neutral-200 flex flex-row justify-between items-center p-4 my-2"
            >
              <p>{urlMapping.key_link}</p>
              <p>{urlMapping.destination_url}</p>
              <p>{urlMapping.hits}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
