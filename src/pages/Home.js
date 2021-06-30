import Header from '../components/Header'
import Meta from '../components/Meta'
import axios from 'axios';

import { useEffect, useState } from 'react';

const Home = () => {
  // page content
  const pageTitle = 'Home'
  const pageDescription = 'welcome to react bootstrap templates'
  const [items, setItems] = useState([])
  const collectionName = `Pete's Collection`; 

  useEffect( async () => {
    await fetchList();
  }, [])
  
  const fetchList = async () => {
    const url = "https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&owner=0x8c059e23890ad6e2a423fb5235956e17c7c92d7f"
    console.log('fetching data')  
      try {
        let response = await axios.get(url)
        setItems(response.data.assets);
        console.log(JSON.stringify(items));
      }catch(err) {
        console.log('error fetching assets:' + err);
      }
  }

  const listItems = items.map((item) =>
    <tr>
      <td>
          <a href={item.permalink} target="_blank">
          <img src={item.image_preview_url}/>
          </a>
        </td>
        <td>
          Name: { item.name }<br/>
          Description: { item.description }<br/>
          
          <a href={item.permalink} target="_blank">Link</a>
          
        </td>
    </tr>
  );

  return (
    <div>
      {/* <Meta title={pageTitle}/>
      <Header head={pageTitle} description={pageDescription} /> */}
      <h2>{ collectionName }</h2>
       <table  class="table table-bordered bordered-primary table-striped product-table">
        {listItems}
    </table> 
    
    </div>
  )
}

export default Home