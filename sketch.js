//宣告一個球的物件，為一個陣列，陣列內可以放很多球的資訊
var balls = []
var ball
var colors = "E06A4E-DEB853-789F8A-5A3D2B".split("-").map(a=>"#"+a)
class ball_class{ //宣告一個ball_class物件
  constructor(args){  //描述物件的初始值，只有設定物件的資料內容
    this.p = args.p || {x:width/2,y:height/2} //球位置
    this.r = args.r || random(50,150)  //球大小
    this.color = args.color || random(colors)
    this.v = args.v || {x:random(-5,5),y:random(-5,5)}
    this.a = args.a || {x:0,y:random(0.7,1.2)} //加速度
    this.rid = random(10000)
  } 
  draw(){
    push()
      translate(this.p.x,this.p.y)  //把原點設定到圓心
      fill(this.color)
      ellipse(0, this.r / 7.5, this.r / 2.2, this.r / 3)
      rectMode(CENTER);
      rect(0, 0, this.r, this.r, this.r / 2, this.r / 2, 0, 0)
      fill("#000000");
      circle(-this.r / 6, -this.r / 50, this.r / 7.5);
      circle(this.r / 6, -this.r / 50, this.r / 7.5);
      fill("#FAEBCD");
      ellipse(0, this.r / 7.5, this.r / 2.2, this.r / 3)
      fill(this.color);
      ellipse(0, this.r / 11, this.r / 5, this.r / 7)
      pop() //把原點恢復到左上角
    
    
  }
  update(){
    
      this.p.x = this.p.x + this.v.x 
      this.p.y = this.p.y + this.v.y
    
    if(this.p.x<0){
      this.v.x = -this.v.x
    }
    if(this.p.x>width){
      this.v.x = -this.v.x
    }
    if(this.p.y<0){
      this.v.y = -this.v.y
    }
    if(this.p.y>height){
      this.v.y = -this.v.y
    }
  }
  isBAllInRange(){ //計算物件與滑鼠間的距離是否小於直徑
    //d:把目前這個物件的位置與滑鼠間的距離
    let d = dist(mouseX,mouseY,this.p.x,this.p.y)
    if(d<this.r){
      return true
    }
    else{
      return false
    }
  }
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  for(i=0;i<50;i++){
    ball= new ball_class({  //傳一串參數值到class內
    v:{x:random(-2,2),y:random(-2,2)},
    p:{x:random(0,width),y:random(0,height)},
    a:{x:0,y:0}
    })
    balls.push(ball) //把產生的ball物件推(存)入到balls陣列內
  }
}
var score = 0
function draw() {
  background("#FAEBCD");
  //stroke(0)
  //strokeWeight(5)
  //line(0,-10,-15,10,15)
  fill("#f00")
  textSize(70)
  text("得分:"+score,150,150)

  noStroke()
  for(j=0;j<balls.length;j++){
    ball = balls[j]
    ball.draw()
    ball.update()
    
  }
  fill(0)
  rect(mouseX,mouseY,10,50)
  fill("#f00")
  rect(mouseX-20,mouseY-10,40,25)
  ellipse(mouseX-20,mouseY-10+25/2,25)
}

function mousePressed(){
  
    //讓物件消失
    for(let ball of balls){ //balls放著所有五件，每次拿出一個物件放到ball
      if(ball.isBAllInRange()){
        balls.splice(balls.indexOf(ball),1)
        score=score+1
      }
    }
    print(score)

}
