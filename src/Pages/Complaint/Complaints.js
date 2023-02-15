import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { language } from '../../utils/utils';
import ComplaintInfo from './ComplaintInfo';

function Complaints() {

  const { complaints } = useSelector(state => state.complaints);
  const [complaintsList, setComplaintsList] = useState([]);

  useEffect(() => {

    setComplaintsList(complaints);

    return () => {
      setComplaintsList([]);
    }
  }, [complaints]);


  if (complaintsList.length !== 0) {
    return (
      <div className="w-100 px-1 gap-2 d-grid">
        <div className='w-100 d-flex gap-2 border-bottom'>
            <strong className='w-25 h5 px-2'>ID</strong>
            <strong className='w-25 h5 px-1'>
              {language.includes("tr") ? "Başlık" : "Title"}
            </strong>
            <strong className='w-50 h5 px-1'>
              {language.includes("tr") ? "Detay" : "Detail"}
            </strong>
        </div>


        {complaints.map((complaint, index) => {
          return (
            <ComplaintInfo key={complaint._id} complaintInfo={complaint} index={index} />
          )
        })}
      </div>
    )
  } else {
    return (
      <div className="w-100 px-1 gap-2 d-grid">
        <div className='w-100 d-flex gap-2 border-bottom'>
            <strong className='w-25 h5 px-2'>ID</strong>
            <strong className='w-25 h5 px-1'>
              {language.includes("tr") ? "Başlık" : "Title"}
            </strong>
            <strong className='w-50 h5 px-1'>
              {language.includes("tr") ? "Detay" : "Detail"}
            </strong>
        </div>

        <div className="alert alert-primary mt-2" role="alert">
          {language.includes("tr") ? "Şikayet Bulunmamaktadır." : "No Complaints."}
        </div>

      </div>
    )
  }
}

export default Complaints