import React from 'react'

const ConfirmModal = ({title,yes,no}) => {

    const [confirm, setConfirm] = useState(false);
  return (
    <div className='confirmModal'>
        <h2>{title ? tutle : 'na pewno chcesz to zrobić?'}</h2>
        <div className='confirmAnswerBox'>
            <button className='yes' onClick={()=>setConfirm(true)}>
                {yes ? yes : 'tak'}
            </button>
            <button className='no' onClick={()=>setConfirm(false)}>
                {no ? no : 'nie' }
            </button>
        </div>
    </div>
  )
}

export default ConfirmModal