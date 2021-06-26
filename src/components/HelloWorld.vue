<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
  
  <table border="1"  class="table table-bordred table-striped product-table">
      
      <tr v-for="item in items" :key="item">
        <td>
          <a :href="item.permalink" target="_blank">
          <img :src="item.image_preview_url"/>
          </a>
        </td>
        <td>
          Name: {{ item.name }}<br/>
          Description: {{ item.description }}<br/>
          
          <a :href="item.permalink" target="_blank">Link</a>
        </td>
        
      </tr>
    </table>


  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: `Pete's Collection`,
      items: [
        
      ]
    }
  },
  created: async function() {
    console.log('fetching assets');
    this.fetchList();
  },
  methods: {
    async fetchList() {
      const url = "https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&owner=0x8c059e23890ad6e2a423fb5235956e17c7c92d7f"
        try {
          let response = await axios.get(url)
          this.items = response.data.assets;
          console.log(JSON.stringify(this.list));
        }catch(err) {
          console.log('error fetching assets:' + err);
        }
    }
    
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
