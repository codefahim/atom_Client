import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  FaHome,
  FaPlusSquare,
  FaTrash,
  FaDatabase,
  FaRegListAlt,
} from 'react-icons/fa';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Spinner, Button, Modal } from 'react-bootstrap';
import { useContext } from 'react';
import { userContext } from '../../App';

const Dashboard = () => {
  const [innovation, setInnovation] = useState([]);
  const [store, setStore] = useContext(userContext);
  let i = store.update;

  console.log(store);
  useEffect(() => {
    fetch('http://localhost:5000/innovations')
      .then((res) => res.json())
      .then((data) => setInnovation(data));
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
          Update Innovation
        </Link>
      </li>
      <li className='list-item-custom'>
        <Link to='/Home' className='a-custom'>
          <FaDatabase className='mr-3' />
          Remove Innovation
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
        <>
          {innovation?.map((data) => (
            <div>fahim</div>
          ))}
        </>
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
function UpdateInnovation({ innovation }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const [Exinfo, setExinfo] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSubmit = (data) => {
    console.log(data);
  };
  const onTodoChange = (e) => {
    setExinfo(e);
  };
  return (
    <div className='text-center m-auto w-50'>
      <table class='table'>
        <thead>
          <tr>
            <th scope='col'>Image</th>
            <th scope='col'>Title</th>
            <th scope='col'>Description</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        {innovation?.map((data) => (
          <tbody>
            <tr>
              <td>
                {' '}
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
                <Button variant='primary' onClick={handleShow}>
                  Update
                </Button>
              </td>
            </tr>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)} className='m-5'>
                  <input
                    className='input'
                    {...register('HeadLine')}
                    onChange={(e) => onTodoChange(e.target.value)}
                    value={Exinfo !== '' ? Exinfo : data?.userInfo?.headLine}
                  />
                  {/* <textarea
                className='input'
                {...register('Description')}
                onChange={(e) => onTodoChange(e.target.value)}
                value={SingleProduct !== '' ? SingleProduct : bio}
              /> */}
                  <input type='submit' value='Update' />
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
                <Button variant='primary' onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </tbody>
        ))}
      </table>
    </div>
  );
}
