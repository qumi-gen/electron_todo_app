const { ipcRenderer } = window.native;

var vm = new Vue({
    el: '#input_app',
    data: {
      message: 'Hello Vue!',
      todo_name:'',
      score:'',
      items:[
        {score_val:"1"},
        {score_val:"2"},
        {score_val:"3"},
        {score_val:"4"},
        {score_val:"5"},
        {score_val:"6"},
        {score_val:"7"},
        {score_val:"8"},
        {score_val:"9"}
      ]
    },

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

var vm2 = new Vue({
el:'#todolist',
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

