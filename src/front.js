const { ipcRenderer } = window.native;

var vm = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      todo_name:'',
      score:''

    },

    methods: {
      appdata:function(){
        var doc ={
          todo:this.todo_name,
          score:this.score
      }
      


          
          ipcRenderer.send('asynchronous-message',doc);
          ipcRenderer.on('asynchronous-replay',function(responce){
            console.log(responce);
          });
      }

  }   
  });



//   var add_data = new Vue({
//     el: '#add-to-db',
//     data: {
//       name:'Vue.js'
//     },
//     methods: {
//         appdata:function(){
//           debugger;
//             alert("OK")
//             var doc ={
//                 todo:ss,
//                 score:this.app.score
//             };

            
//             ipcRenderer.send('asynchronous-message',doc);
//             ipcRenderer.on('asynchronous-replay',function(responce){
//               console.log(responce);
//             });
//         }

//     }    
// });


