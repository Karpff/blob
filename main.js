var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext('2d');

var ticks = 0;
var ids = 0;

class Circle
{
  constructor(id,x,y,hue)
  {
    this.hue = ticks;
    this.id = id;
    this.x = x;
    this.y = y;
    this.clock = -90;
    this.size = 0;
    this.fall = 0;
  }

  update()
  {
    this.size = Math.sin(this.clock/180*Math.PI)*7+7;
    this.clock+=4;
    this.fall+=0.8;
  }

  drawShadow()
  {
    if(this.clock<270)
    {
      c.beginPath();
      c.arc(this.x,this.y+this.fall,this.size+2,0,Math.PI*2);
      c.fillStyle = "black";
      c.fill();
    }
  }

  draw()
  {
    if(this.clock<270)
    {
      c.beginPath();
      c.arc(this.x,this.y+this.fall,this.size,0,Math.PI*2);
      c.fillStyle = 'hsl('+this.hue+',50%,50%)';
      c.fill();
    }
    else
    {
      for(let i=0;i<circles.length;i++)
      {
        if(circles[i]==this)circles.splice(i,1);
        break;
      }
    }
  }
}

window.addEventListener('mousemove',e=>
{
  mouseX = e.clientX;
  mouseY = e.clientY;
});

var mouseX = 0;
var mouseY = 0;

var circles = [];

function generate()
{
  circles.push(new Circle(ids,mouseX,mouseY));
  ids++;
  setTimeout(generate,1);
}

function animate()
{
  ticks++;
  c.fillStyle = 'rgba(50,50,60,1)';
  c.fillRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<circles.length;i++)
  {
    circles[i].update();
    circles[i].drawShadow();
  }
  for(let i=0;i<circles.length;i++)
  {
    circles[i].draw();
  }
  window.requestAnimationFrame(animate);
}
animate();
generate();
