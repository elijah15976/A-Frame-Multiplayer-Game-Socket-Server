module.exports = {
  init:function(){
    initialize();
  },
  spawnGhost:function(ghost, locationX, locationZ){
    spawnGhost(ghost, locationX, locationZ);
  },
  gameStatusSetTrue:function(){
    gameStatus = true;
  },
  gameStatusSetFalse:function(){
    gameStatus = false;
  }
};

let gameStatus = false;

function initialize(){
  Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }
}

function spawnGhost(ghost, locationX, locationZ){
  ghost.send(`Location: [0, 11, 0]`);
  ghost.send(`Start Countdown`);
  setTimeout(()=>{
    if(gameStatus){
      ghost.send(`Location: [${locationX}, -9, ${locationZ}]`);
    }
  }, 10000);
}