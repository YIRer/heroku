import axios from 'axios';
export default {
  event : {
    title: (title)=>{
      return "yees" + title;
    },
    find : (id)=>{
      return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res =>{
        return res.data;
      });
    }
  }
}