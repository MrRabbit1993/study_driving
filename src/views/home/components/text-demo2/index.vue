<script>
  import countBlock from '@/components/countBlock/index.js'
export default {
  name:"text-demo-2",
  components:{countBlock},
  data(){
    return{
      title:"demo测试1",
      value:{
        value: "000",
        unit: "亩"
      },
      info:[{
        prefix:"测试",
        percent:"12",
        unit:"亩",
        type:1,
      }]
    }
  },
  methods:{
    updateInfo(item){
      const {id,name} = item
      this.title = name
      this.info[0].prefix = name
      this.info[0].percent = id
      this.value.value = `${id}00`
    }
  },
  render(){
    return <countBlock class="left-one-content" title={this.title} value={this.value} info={this.info}/>
  }
}
</script>