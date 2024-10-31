import React from 'react'
import { useParams } from 'react-router-dom';

function UserDetail() {
    const param = useParams();
    console.log(param.id);


  return (
    <div>UserDetail</div>
  )
}

export default UserDetail