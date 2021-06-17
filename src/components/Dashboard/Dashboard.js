import React, { useState, useEffect } from 'react';
import {
  FaHome,
  FaPlusSquare,
  FaTrash,
  FaRegListAlt,
} from 'react-icons/fa';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Spinner, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { userContext } from '../../App';
import emailjs from 'emailjs-com';
const Dashboard = () => {
  const [innovation, setInnovation] = useState([]);
  const [store, setStore] = useContext(userContext);
  let i = store.update;
 function sendEmail(e) {
   e.preventDefault();

   emailjs
     .sendForm('service_cewwx7w', 'template_g9rpswi', e.target )
     .then(
       (result) => {
         console.log(result.text);
       },
       (error) => {
         console.log(error.text);
       }
     );
 }
  
  useEffect(() => {
    fetch('https://atomsp.herokuapp.com/innovations').then((data) => {
      setInnovation(data);
    });
  }, [i]);
  console.log(innovation);
  return (
    <div className='row w-100 text-center m-auto '>
      <Header />
      <Router>
        <div className='col-md-3 height-100vh bg-gradient'>
          <Sidebar />
        </div>
        <div className='col-md-9 height-100vh yellow-50 overflow-auto'>
          <Switch>
            <Route path='/DashboardHome'>
              <DashboardHome innovation={innovation} />
            </Route>
            <Route path='/AddInnovation' component={AddInnovation} />
            <Route path='/UpdateInnovation'>
              <UpdateInnovation innovation={innovation} />
            </Route>
            <Route path='*' component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Dashboard;
function Sidebar() {
  return (
    <ul className='p-0 text-left'>
      <li className='list-item-custom'>
        <Link to='/DashboardHome' className='a-custom'>
          <FaRegListAlt className='mr-3' />
          List Of Innovation
        </Link>
      </li>
      <li className='list-item-custom'>
        <Link to='/AddInnovation' className='a-custom'>
          <FaPlusSquare className='mr-3' />
          Add Innovation
        </Link>
      </li>
      <li className='list-item-custom'>
        <Link to='/UpdateInnovation' className='a-custom'>
          <FaTrash className='mr-3' />
          Update/Delete Innovation
        </Link>
      </li>
    </ul>
  );
}

function NoMatch() {
  return (
    <div>Welcome To Dashboard! Choose A option to make CRUD operation.</div>
  );
}
function Header() {
  return (
    <div style={{ height: '5vh', width: '100%' }} className='row'>
      <div className='col-md-3 bg-gradient'></div>
      <div className='col-md-9'>
        <li className='list-item-custom'>
          <Link to='/Home' className='a-custom'>
            <FaHome className='mr-3' />
            Home
          </Link>
        </li>
      </div>
    </div>
  );
}

function DashboardHome({ innovation }) {
  return (
    <div>
      {innovation.length === 0 && (
        <>
          <h4>Data Loading , Please Wait.</h4>
          <Spinner animation='border' variant='success' />
        </>
      )}
      {innovation.length >= 1 && (
        <table class='table'>
          <thead>
            <tr>
              <th scope='col'>Image</th>
              <th scope='col'>Title</th>
              <th scope='col'>Description</th>
            </tr>
          </thead>
          {innovation?.map((data) => (
            <tbody>
              <tr>
                <td>
                  <img
                    src={`data:image/png;base64,${data.imageForDB.imgB}`}
                    alt=''
                    width='100px'
                    height='100px'
                    className='rounded-circle'
                  />
                </td>
                <td>{data.userInfo.headLine}</td>
                <td>{data.userInfo.description}</td>
          
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </div>
  );
}

//Add Innovation
function AddInnovation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [Loading, setLoading] = useState(false);
  const [Recall, setRecall] = useState(false);
  const [store, setStore] = useContext(userContext);
  const onSubmit = (data) => {
    setLoading(true);
    const image = data.image[0];
    const formData = new FormData();
    formData.append('headLine', data.headLine);
    formData.append('description', data.description);
    formData.append('image', image);
    fetch(`http://localhost:5000/insertInnovation`, {
      method: 'POST',
      body: formData,
    }).then((result) => {
      setRecall(!Recall);
      if (result.status === 200) {
        alert('Product Upload Successfully');
        const formReset = document.getElementById('form');
        setLoading(false);

        const updateData = { ...store };
        updateData.update = !updateData.update;
        setStore(updateData);
        formReset.reset();
      } else {
        alert('Product Not Upload!Please try one more time.');
        setLoading(false);
      }
    });
    console.log(data);
  };
  return (
    <div className='text-center m-auto w-50'>
      <form onSubmit={handleSubmit(onSubmit)} id='form' className='m-5'>
        <input
          className='input'
          placeholder='Enter Head line'
          {...register('headLine')}
          required
        />
        <textarea
          className='input'
          placeholder='Enter Description'
          {...register('description')}
          required
        />
        <input className='input' type='file' {...register('image')} required />
        {!Loading && <input type='submit' value='Upload' />}
        {Loading && (
          <>
            <h4>Uploading, Please Wait.</h4>
            <Spinner animation='border' variant='success' />
          </>
        )}
      </form>
    </div>
  );
}

//Update innovation
function UpdateInnovation({ innovation })
{
  const [store, setStore] = useContext(userContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [Exinfo, setExinfo] = useState('');
  const [Exinfoo, setExinfoo] = useState('');
  const [info, setInfo] = useState({});

  // Find Specific innovation Id
  const handleId = (id) => {
    localStorage.setItem('id', id);
    let info = innovation.find((uid) => uid._id === id);
    setInfo(info);
  };

  //Handle Delete Innovation
  const handleDelete = (id) => {
    fetch(`https://atomsp.herokuapp.com/DeleteInnovation/` + id, {
      method: 'DELETE',
    }).then((result) => {
      if (result.status === 200) {
        alert('Innovation Delete Successfully');
        const updateData = { ...store };
        updateData.update = !updateData.update;
        setStore(updateData);
      } else {
        alert('Innovation Not Delete!Please try one more time.');
      }
    });
  };

  // State for hold input Data
  const onTodoChange = (e) => {
    setExinfo(e);
  };

  // State for hold input Data
  const onTodoChangee = (e) => {
    setExinfoo(e);
  };
  
  // On Form Submit
  const onSubmit = (data) => {
    console.log(data);
    const uid = info?._id;
    const formData = new FormData();
    formData.append('headLine', data.headLine);
    formData.append('description', data.description);
    fetch(`https://atomsp.herokuapp.com/updateInnovation/` + uid, {
      method: 'PATCH',
      body: formData,
    }).then((result) => {
      data = {};
      if (result.status === 200) {
        alert('Product Update Successfully');

        const updateData = { ...store };
        updateData.update = !updateData.update;
        setStore(updateData);
      } else {
        alert('Product Can not Update');
      }
    });
  };

  // return 
  return (
    <div className='text-center m-auto w-50'>
      <form onSubmit={handleSubmit(onSubmit)} className='m-5'>
        <input
          className='input'
          {...register('headLine', { required: true })}
          onChange={(e) => onTodoChange(e.target.value)}
          value={Exinfo !== '' ? Exinfo : info?.userInfo?.headLine}
        />
        <textarea
          className='input'
          {...register('description', { required: true })}
          onChange={(e) => onTodoChangee(e.target.value)}
          value={Exinfoo !== '' ? Exinfoo : info?.userInfo?.description}
        />
        <input type='submit' value='Update' />
      </form>
      <table class='table'>
        <thead>
          <tr>
            <th scope='col'>Image</th>
            <th scope='col'>Title</th>
            <th scope='col'>Description</th>
            <th scope='col'>Action</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        {innovation?.map((data) => (
          <tbody>
            <tr>
              <td>
                <img
                  src={`data:image/png;base64,${data.imageForDB.imgB}`}
                  alt=''
                  width='100px'
                  height='100px'
                  className='rounded-circle'
                />
              </td>
              <td>{data.userInfo.headLine}</td>
              <td>{data.userInfo.description}</td>
              <td>
                <Button className='mt-3' onClick={() => handleId(data._id)}>
                  Update
                </Button>
              </td>
              <td>
                <Button className='mt-3' onClick={() => handleDelete(data._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
