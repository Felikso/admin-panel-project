import React, { useContext, useState } from 'react'
import './ItemCard.css'
import { addData, categories, url, urlAdd, urlEdit, urlImg } from '../../utils/variables'
import { assets } from '../../assets/assets' 
import axios from 'axios'
import { toast } from 'react-toastify'

const ItemCard = ({postData}) => {

    const {name, image, description, price, category, _id} = postData ? postData : '';


    const [edit,setEdit] = useState(false);
    const [img,setImage] = useState('');
    const [data,setData] = useState({
    name: name,
    description:'',
    price:'',
    category:categories[0]
  });


  const onChangeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  } 

  const handleEdit = (e) => {
 
    setEdit(!edit)

  }

/*   useEffect(()=>{
    
    console.log(data)
  },[data]) */

  const onSubmitHandler = async (e) => {
console.log('halo')
    e.preventDefault();

    if (window.confirm('czy na pewno chcesz edytować ten przedmiot?')) {


        const formData = new FormData();
        formData.append('name',data.name);
        formData.append('description',data.description);
        formData.append('price',Number(data.price));
        formData.append('category',data.category);
        formData.append('image',image);

    let o = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    if(img){
        o['image'] = img;
    }
    o['id'] = _id
    
    console.log(o)
    console.log(formData)
    const response = await axios.post(`${url}${urlEdit}`, o);

    if(response.data.success){
      setData({
        name:'',
        description:'',
        price:'',
        category:categories[0]
      })
      setImage(false)
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
  }
}

let allowEdit = edit ? 'allowEdit' : '';
let disabled = edit? '' : 'disabled'

let placeholderImage = image ? `${url}${urlImg}${image}` : assets.upload_area;
  return (
    
      <form onSubmit={onSubmitHandler} className={`addForm ${allowEdit}`}>
        <div className='addDataBox'>

        <div className="addImgUpload flexCol">
          <p>{img ? 'zmień' : addData.addPhoto}</p>
          <label htmlFor='image'>
            <img src={img?URL.createObjectURL(img): placeholderImage} alt={assets.upload_area} />
          </label>
          <input className={`${disabled}`} onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden  /> 
        </div>

        <div className='addData'>
        <div className="addItemName flexCol">
          <p>{addData.itemName}</p>
          <input className={`${disabled}`} onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder={addData.typeItemName}/>

          <p>{addData.itemDesc}</p>
          <textarea className={`${disabled}`} onChange={(e)=>onChangeHandler(e)} value={data.description ? data.description : description} name='description' rows='6' placeholder={addData.typeItemDesc}></textarea>
      </div>

     <div className="addCatPrice">

    <div className="addCat flexCol">
      <p>{addData.itemCat}</p>
      <select className={`${disabled}`} onChange={onChangeHandler} value={data.category ? data.category : category} name='category'>
        {
          categories.map((item,i)=>(
            <option key={i} value={item.replace(' ','-')}>{item}</option>
          ))
        }
      </select>
    </div>
    <div className="addPrice flexCol">
      <p>{addData.itemPrice}</p>
      <input className={`${disabled}`} onChange={onChangeHandler} value={data.price ? data.price : price} type='number' name='price' placeholder={addData.typeItemPrice} />
    </div>
    <a onClick={handleEdit} className='addBtn'>{addData.editBtn}</a> 

      
      <button className={`addBtn ${disabled}`} type='submit'>{addData.addBtn}</button>
  
    </div>
    </div>

    </div>
      </form>
  )
}

export default ItemCard