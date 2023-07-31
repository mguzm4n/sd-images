import Breadcrumb from '../components/Breadcrumb';
import { Globe } from '../components/Globe';
import { useState } from "react"
import LeaFletMap from '../components/LeaFletMap';
import { useQuery, useQueryClient } from 'react-query';
import { getEventCategory } from "../../services/events"
import { getCategories } from "../../services/categories"
import Loader from '../common/Loader';
import Multiselect from '../components/Multiselect';
import CardEight from '../components/Cards/CardEight';

import {BsSnow} from "react-icons/bs"

import {FaHouseFloodWater} from "react-icons/fa6"
import {GiGroundbreaker} from "react-icons/gi"
import {MdThunderstorm} from "react-icons/md"
import {GiSmokingVolcano} from "react-icons/gi"
import {FaExplosion} from "react-icons/fa6"
import {MdOutlineLandslide} from "react-icons/md"
import {GiSnowing} from "react-icons/gi"
import {GiGroundSprout} from "react-icons/gi"
import {WiHot} from "react-icons/wi"
import {GiDustCloud} from "react-icons/gi"


const Map = () => {
  const [country, setCountry] = useState("")
  const [position, setPosition] = useState([])
  const [geom, setGeom] = useState({})
  const [option, setOption] = useState("");
  const [category, setCategory] = useState("Drought");
  const queryClient = useQueryClient()

  const count = (data: string, dataPos: [], geometry: {}) => {
    setCountry(data)
    setPosition(dataPos)
    setGeom(geometry)
  }

  const { isLoading, data: events } = useQuery({
    queryKey: ["events", category],
    queryFn: () => getEventCategory(category),
    onSuccess: () => { }
  })

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    onSuccess: () => {console.log(categories)}
  })

  const select = (option: string) => {
    setOption(option)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setCategory(value)
    queryClient.invalidateQueries({ queryKey: ['events', value] })

  }

  if (isLoading || events == undefined) {
    return <Loader></Loader>
  }

  return (
    <>
      <Breadcrumb pageName="Mapa" />
      <div className="flex flex-col items-center justify-center overflow-hidden col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <Multiselect select={select}></Multiselect>
        {option === "2" ?
          <div className='flex flex-col items-center justify-center'>
            <h3 className='mb-4'>Pais Seleccionado: {country}</h3>
            <Globe count={count} />
          </div> : <div></div>}

        {option === "1" ?
          <div className='flex flex-col items-center justify-center'>
            <select name="categories" id="categories" className='m-2 p-2 w-44' defaultValue={"Drought"} onChange={handleChange}>
              {categories?.map(category => {
                return (
                  <option value={category.title}>{category.title}</option>
                )
              })}
            </select>
            <h1 className='flex flex-row m-4'>Categoria seleccionada: <p className='text-primary ml-4'>{category}</p></h1>
            <LeaFletMap events={events} />
          </div> : <div></div>}


      </div>

      <div className='grid grid-cols-3 mt-4 gap-8'>

        {events.map(event => {
          console.log(event)
          return (
            <div className="rounded-lg border h-54 border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                <BsSnow />
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div className='flex flex-col justify-between gap-8'>
                  <div className="flex flex-row items-center gap-2">
                    <svg
                      className="fill-meta-3"
                      width="10"
                      height="11"
                      viewBox="0 0 10 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                        fill=""
                      />
                    </svg>
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                      {event.title}
                    </h4>
                  </div>
                  <p className='flex flex-row mr-8'><p className='text-primary'>Link:</p>{event.sources.map(source => {return <a href={source.url} target='_blank'>{source.url}</a>})}</p>
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </>
  );
};

export default Map;
