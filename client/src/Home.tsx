import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import reverseGeocode from './reverseGeocode';



function Home() {
  const navigate = useNavigate()
  const [currentlocation , setCurrentLocation] = useState('')
  const token = localStorage.getItem('token')
  console.log(token,'token')
  const [data , setData] = useState([])
  let decoded 
  if(token){
     decoded = jwtDecode(token)
  }
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  useEffect(() => {

  },[])
  
  const getUserDetails = async() => {
    try{
        const response = await axios.get(`${BASE_URL}/api/details/${decoded.id}/`)
        if(response.status === 200){
          setData(response.data)
          console.log(response.data)
        } 
    }catch (err) {
      console.log(err)
    }
  }
  

  useEffect(() => {
    if(!token){
      navigate('login')
    }
  },[])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
       
          reverseGeocode(latitude, longitude).then(setCurrentLocation);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
 }, []);

 console.log(currentlocation)

  return (
<div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
    <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
            User database
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Details and informations about user.
        </p>
    </div>
    <div className="border-t border-gray-200">
        <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Username
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {decoded?.username}
                </dd>
            </div>
   
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Enter Location
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {decoded?.location}
                </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Live Location 
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {currentlocation}
                </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                    Phone Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {decoded?.phone_number}
                  </dd>
            </div>
        </dl>
    </div>
</div>
  )
}

export default Home