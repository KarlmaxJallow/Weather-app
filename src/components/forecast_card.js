import React from 'react'
import Image from 'next/image'
import moment from 'moment'

const Index =({data})=>{


  console.log("testing"+ data);

    return (
        <>
    <div className="day">
        <h5>{moment(data.dt_txt).format('dddd')}</h5>
      <div className="card">
        <div className="icon"><Image src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} width={100} height={100} alt="sunny image"/></div>
        <div className='weather_text'>{data.weather[0].main}</div>
      </div>
      </div>

        </>
    )
}

export default Index