var React = require('react');
var GradientList = require('../constants/GradientList.js');
var gradient_color_list = GradientList.color.split("@")
var color_name_list = GradientList.name.split("@")
var color_set_list = GradientList.color_set.split("@")
var length = gradient_color_list.length
var rotate_arr = ["to right,", "", "to left,", "to top,"]
var rotate_index = 0
var App = React.createClass({
  getInitialState(){
    var index = Math.floor( Math.random() * length)
    if(index <0 || index >= length){
      index = 0
    }
    return {
      color_index: index,
      image_url: "",
      rotate: rotate_arr[rotate_index]
    }
  },

  componentDidMount(){
    this.changeFavicon()
  },

  componentDidUpdate(){
    this.changeFavicon()
  },

  saveImage(){
    var that = this
    var clone_content = $(this.refs.content).clone().empty()
    clone_content.insertBefore(this.refs.content)

    html2canvas(clone_content, {
      onrendered: function(canvas) {
        clone_content.remove()
        var a = document.createElement('a');
        a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        a.download = color_name_list[that.state.color_index];
        a.click();
      }
    });
  },

  changeFavicon(){
    var clone_content = $(this.refs.content).clone().empty()
    clone_content.insertBefore(this.refs.content)
    html2canvas(clone_content, {
      onrendered: function(canvas) {
        clone_content.remove()
        var img_data = canvas.toDataURL("image/jpeg")
        $("#icon").attr("href", canvas.toDataURL("image/jpeg"))
      }
    });
  },

  changeColor(move){
    var index = this.state.color_index + move
    if(index < 0){
      index = length - 1
    }
    if(index >= length){
      index = 0
    }
    this.setState({color_index: index})
  },

  rotateGradien(){
    rotate_index += 1
    if(rotate_index >= rotate_arr.length){
      rotate_index = 0
    }
    this.setState({rotate: rotate_arr[rotate_index]})
  },

  render: function(){
    var color_set = color_set_list[this.state.color_index].split("!")
    var string_color = color_set.toString()
    string_color = string_color.slice(0, string_color.length-1)
    string_color = "linear-gradient(" + this.state.rotate + string_color + ")"
    var text ="→ "
    return (
      <div>
        <div className="navi">
        </div>
        <div className="toolbar">
          <div className="toolbar_list_color">
            <a href="#" className="menu">
              <span class="icon"></span>
            Show all gradients
            </a>
          </div>
          <div className="toolbar_color_set">
            {color_set.map(function(item){
              if(item){
                return ([
                  <li className="hex">
                    <span className="hex_block" style={{background: item}}></span>
                    <span className="hex_name">{item}</span>
                  </li>,
                  <span className="hex_arrow" >{text}</span>
                ])
              }
            })}
          </div>
          <div className="toolbar_action">
            <ul>
              <li onClick={this.rotateGradien} data-toggle="tooltip" data-placement="bottom" title="Rotate gradient">
                <span className="glyphicon glyphicon-repeat"></span>
              </li>
              <li onClick={this.saveImage} data-toggle="tooltip" data-placement="bottom" title="Save">
                <span className="glyphicon glyphicon-save"></span>
              </li>
            </ul>
          </div>
        </div>
        <div className="content" ref="content" style={{background: string_color}}>
          <div className="gradientname">
            <p className="noselect">{color_name_list[this.state.color_index]}</p>
            </div>
          <ul className="prev_next">
            <li onClick={this.changeColor.bind(null, -1)}></li>
            <li onClick={this.changeColor.bind(null, 1)}></li>
          </ul>
        </div>
      </div>
    );
  }
});

export default App
