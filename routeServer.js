const axios = require('axios');
const decorder = require('./decorder');

/* class routeServer {
  getPoints(point1, point2) {
  
    const url = 'http://localhost:8989/route?point=' + point1 +'&point=' + point2 + '&profile=car';

    axios.get(url).then(response => {
      // レスポンスデータの paths[0].points のみを取り出して変数に代入
      const points = response.data.paths[0].points;
    
      //console.log(decorder(points)); // points をコンソールに表示
    })
    .catch(error => {
      if (error.response) {
        console.error('Response Error:', error.response.data);
      } else if (error.request) {
        console.error('No Response:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    });

    //return points;
    
  }
} */

