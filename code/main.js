import kaboom from "kaboom"

// initialize context
kaboom()

// load assets
loadSprite("egg", "sprites/egg.png")
loadSprite("VERY NICE BACKGROUND GRASS WITH SHEEP", "sprites/VERY NICE BACKGROUND GRASS WITH SHEEP.jpg")
loadSprite("Pipe", "sprites/Pipe.png")

let highScore = 0

scene("game", () => {
 const PIPE_GAP = 300
  let score = 0

 add([
   sprite("VERY NICE BACKGROUND GRASS WITH SHEEP", {width: width(), height: height()})//fill in bg
 ])

  
 //const scoreText = add([
   //text(score, {size: 100})
 //])

  
// add a character to screen
 const player = add([
	// list of components
	 sprite("egg"),
	 pos(80, 40),
	 area(),
   body(),
 ])

  

 function producePipes() {
  const offset = rand(-50, 50)
  add([
    sprite("Pipe"),
    pos(width(), height()/2 + offset + PIPE_GAP/2),
    "pipe",
    area(),
    {passed: false}
  ])

  add([
    sprite("Pipe", {flipY: true}),
    pos(width(), height()/2 + offset - PIPE_GAP/2),
    origin("botleft"),
    "pipe",
    area()
  ])
 }  

  
 loop(1.5, () => {
   producePipes()
 })

 producePipes()
  
 action("pipe", (pipe) => {
   pipe.move(-360, 0)  //to adjust speed of pipes

   if (pipe.passed == false && pipe.pos.x < player.pos.x) {
     pipe.passed = true
     score += 1
     //debug.log(score);
   }
 })

  

  
 player.collides("pipe", () => {
   go('gameover', score)
 })

 player.action(() => {
   if (player.pos.y > height() + 30 || player.pos.y < -30) {
     go("gameover", score)
   }
 })

  
  

 keyPress("space", () => {
   player.jump(600);
 })
})

 scene("gameover", (score) => {
  if (score > highScore) {
    hgihScore = score
  }
   
  add([
   text("GAMEOVER!\n" + "score: " + score + "\nhigh score: " + highScore)
  ])

  keyPress("space", () => {
    go("game")
  })
})

go("game")