const { ipcRenderer } = window.native;

var vm = new Vue({
    el: '#input_app',
    data: {
      message: 'Hello Vue!',
      todo_name:'',
      score:'',

    },

  //   created:function(){
  //     ipcRenderer.send('init-message');
  //     ipcRenderer.on('init-replay',(event,args) =>{
  //       {
  //       //console.log(args);
  //       vm2.todo_data = args;

  //       vm.todo_name = '';
  //       vm.score = '';
  //     }
  // });
  //   },

    methods: {
      appdata:function(){
        var doc ={
          todo:this.todo_name,
          score:this.score,
          checked:false
      }
          ipcRenderer.send('asynchronous-message',doc);
          ipcRenderer.on('asynchronous-replay',(event,args) =>{
            {
            //console.log(args);
            vm2.todo_data = args;
            vm.todo_name = '';
            vm.score = '';
          }
      });
  }   
}
});



//var todo_data_list = {todo_data:''}

var vm2 = new Vue({
  el:'#todolist',
  // data:{
  //   checked:'',
  //   todo_data_list:{todo_data:''},
    
  // }
data:{
  todo_data:'',
},

created:function(){
  ipcRenderer.send('init-message');
  ipcRenderer.on('init-replay',(event,args) =>{
    {
    //console.log(args);
    vm2.todo_data = args;
    
    vm.todo_name = '';
    vm.score = '';
  }
});
},

methods:{
  
  is_checked:function(){
    //debugger;
    // for(checked_todo in this.todo_data){
    //   //debugger;
    //   if(checked_todo.checked){
        
    //     ipcRenderer.send('is_check',checked_todo);
    //     break;
    //   }
    // }
    
    len = this.todo_data.length;
    var i = 0;
    debugger;
    while(i < len){
      update_todo_data = this.todo_data[i];
      if(update_todo_data.checked){
        ipcRenderer.send('is_check',update_todo_data);

        ipcRenderer.on('is_check-replay',(event,args) =>{
          {
          //console.log(args);
          vm2.todo_data = args;
          
          vm.todo_name = '';
          vm.score = '';
        }
      });
        break;
      }
      i=i+1;
    }  
  }
}

});

