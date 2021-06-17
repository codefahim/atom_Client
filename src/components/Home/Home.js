import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { userContext } from '../../App';
import image from '../../images/h-01.png';
import imagex from '../../images/h-011.png';
const Home = () => {
  let history = useHistory();
  const handleDashboard = () => {
    console.log('btn ckiclk');
    history.push('/Dashboard');
  };
  const [store, setStore] = useContext(userContext);
    const [innovation, setInnovation] = useState([]);
    let i = store.update;
    useEffect(() => {
      fetch('https://atomsp.herokuapp.com/innovations').then((data) =>
        setInnovation(data)
      );
    }, [i]);
  return (
    <>
      <h2 className='yellow-600 h2 my-5'>Innovations Everywhere!</h2>

      <button
        className='yellow-600 btn-custom mr-auto float-left'
        title='Goto Dashboard Page and Make CRUD Operation!'
        onClick={handleDashboard}
      >
        /Goto Dashboard
      </button>

      <div className='row w-100 text-center m-auto'>
        {innovation.map((data) => (
          <div className='col-md-4 my-3'>
            <Card style={{ width: '80%' }} className='m-auto h-100'>
              <Card.Img
                className='h-50'
                variant='top'
                src={`data:image/png;base64,${data.imageForDB.imgB}`}
              />
              <Card.Body>
                <Card.Title>{data.userInfo.headLine}</Card.Title>
                <Card.Text>{data.userInfo.description}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
