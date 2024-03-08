const rooms = require('./roomServer.js');

let roomCategories = ["T", "Cross", "Straight", "Corner", "Room"];
let tRooms = ["TRight", "TUp", "TLeft", "TDown"];
let straightRooms = ["StraightLR", "StraightUD"];
let cornerRooms = ["CornerRU", "CornerRD", "CornerLD", "CornerLU"];
let generalRooms = ["RoomRight", "RoomUp", "RoomLeft", "RoomDown", "RoomUD", "RoomLR", "RoomRU", "RoomRD", "RoomLD", "RoomLU", "RoomTR", "RoomTU", "RoomTL", "RoomTD", "RoomCross"];

let maxX = 20;
let maxZ = 16;

let maze = [];
let mazePush = [];
let tasksPush = [];

let amountOfKeys = 0;

module.exports = {
  init: function(){
    initialization();
  },
  generate: function(){
    return generateMaze();
  },
  sendTasks: function(){
    return generateTasks();
  },
  getAmountOfKeys: function(){
    return amountOfKeys;
  }
};

function initialization(){
  maze = [];
  mazePush = [];
  tasksPush = [];
  
  for(let fiosdjla = 0; fiosdjla < maxZ; fiosdjla++){
    let x = new Array(maxX);
    maze.push(x);
  }
  for(let fiosdjla = 0; fiosdjla < maxZ; fiosdjla++){
    let x = new Array(maxX);
    mazePush.push(x);
  }
  for(let dxfclhjkldrb = 0; dxfclhjkldrb < maxZ; dxfclhjkldrb++){
    let x = new Array(maxX);
    tasksPush.push(x);
  }
}

function generateMaze(){
  for(let i = 0; i < maxZ; i++){            //Max Y
    let temporaryZ = i*10;
    for(let j = 0; j < maxX; j++){          //Max X
      let temporaryX = j*10;

      //Corners are hardcoded
      if(i == 0 && j == 0){
        maze[i][j] = new rooms.CornerRD(temporaryX, temporaryZ);
      }
      else if(i == 0 && j == maxX-1){
        if(maze[i][j-1].right){
          maze[i][j] = new rooms.CornerLD(temporaryX, temporaryZ);
        }
        else{
          maze[i][j] = new rooms.RoomDown(temporaryX, temporaryZ);
        }
      }
      else if(i == maxZ-1 && j == 0){
        if(maze[i-1][j].down){
          maze[i][j] = new rooms.CornerRU(temporaryX, temporaryZ);
        }
        else{
          maze[i][j] = new rooms.RoomRight(temporaryX, temporaryZ);
        }
      }
      else if(i == maxZ-1 && j == maxX-1){
        if(maze[i-1][j].down && maze[i][j-1].right){
          maze[i][j] = new rooms.CornerLU(temporaryX, temporaryZ);
        }
        else if(maze[i-1][j].down && !maze[i][j-1].right){
          maze[i][j] = new rooms.RoomUp(temporaryX, temporaryZ);
        }
        else if(!maze[i-1][j].down && maze[i][j-1].right){
          maze[i][j] = new rooms.RoomLeft(temporaryX, temporaryZ);
        }
        else{
          maze[i][j] = new rooms.BlankSpot(temporaryX, temporaryZ);
        }
      }
      //Code for all other rooms (IMPORTANT: ROOM DOORWAY CHECK FAULTY)
      else{
        let roomThatWasPicked;
        if(i == 0){
          do{
            roomThatWasPicked = getRandomRoom(temporaryX, temporaryZ);
          } while(!(maze[i][j-1].right == roomThatWasPicked.left));
        }
        else if(j == 0){
          do{
            roomThatWasPicked = getRandomRoom(temporaryX, temporaryZ);
          } while(!(maze[i-1][j].down == roomThatWasPicked.up));
        }
        else{
          do{
            roomThatWasPicked = getRandomRoom(temporaryX, temporaryZ);
          } while(!(maze[i][j-1].right == roomThatWasPicked.left && maze[i-1][j].down == roomThatWasPicked.up));
        }
        maze[i][j] = roomThatWasPicked;
      }
      
      mazePush[i][j] = maze[i][j].name;
    }
  }

  generateTasks(maze);
  
  let tempString = [];
  for(let l = 0; l < mazePush.length; l++){
    tempString.push(JSON.stringify(mazePush[l]));
  }
  console.log(JSON.stringify(mazePush));
  return JSON.stringify(mazePush);
}

function generateTasks(){
  let options = ["key", "blank", "blank", "blank", "blank", "blank", "blank", "blank"];
  // let options = ["key", "blank"];
  amountOfKeys = 0;
  
  for(let i = 0; i < maxZ; i++){
    for(let j = 0; j < maxX; j++){
      let item = options.random();
      if(item == "key"){
        amountOfKeys++;
      }
      tasksPush[i][j] = item;
    }
  }
  
  console.log(JSON.stringify(tasksPush));
  return JSON.stringify(tasksPush);
}


//Don't change anything here this is perfect AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
function getRandomRoom(x, y){
  let roomType = roomCategories.random();
  //T Rooms
  if(roomType == "T"){
    let finalRoom = tRooms.random();
    if(finalRoom == "TRight"){
      return new rooms.TRight(x, y);
    }
    else if(finalRoom == "TUp"){
      return new rooms.TUp(x, y);
    }
    else if(finalRoom == "TLeft"){
      return new rooms.TLeft(x, y);
    }
    else if(finalRoom == "TDown"){
      return new rooms.TDown(x, y);
    }
  }
  //Cross Room
  else if(roomType == "Cross"){
    return new rooms.Cross(x, y);
  }
  //Straight Rooms
  else if(roomType == "Straight"){
    let finalRoom = straightRooms.random();
    if(finalRoom == "StraightLR"){
      return new rooms.StraightLR(x, y);
    }
    else if(finalRoom == "StraightUD"){
      return new rooms.StraightUD(x, y);
    }
  }
  //Corner Rooms
  else if(roomType == "Corner"){
    let finalRoom = cornerRooms.random();
    if(finalRoom == "CornerRU"){
      return new rooms.CornerRU(x, y);
    }
    else if(finalRoom == "CornerRD"){
      return new rooms.CornerRD(x, y);
    }
    else if(finalRoom == "CornerLD"){
      return new rooms.CornerLD(x, y);
    }
    else if(finalRoom == "CornerLU"){
      return new rooms.CornerLU(x, y);
    }
  }
  //General Rooms
  else if(roomType == "Room"){
    let finalRoom = generalRooms.random();
    if(finalRoom == "RoomRight"){
      return new rooms.RoomRight(x, y);
    }
    else if(finalRoom == "RoomUp"){
      return new rooms.RoomUp(x, y);
    }
    else if(finalRoom == "RoomLeft"){
      return new rooms.RoomLeft(x, y);
    }
    else if(finalRoom == "RoomDown"){
      return new rooms.RoomDown(x, y);
    }
    else if(finalRoom == "RoomUD"){
      return new rooms.RoomUD(x, y);
    }
    else if(finalRoom == "RoomLR"){
      return new rooms.RoomLR(x, y);
    }
    else if(finalRoom == "RoomRU"){
      return new rooms.RoomRU(x, y);
    }
    else if(finalRoom == "RoomRD"){
      return new rooms.RoomRD(x, y);
    }
    else if(finalRoom == "RoomLD"){
      return new rooms.RoomLD(x, y);
    }
    else if(finalRoom == "RoomLU"){
      return new rooms.RoomLU(x, y);
    }
    else if(finalRoom == "RoomTR"){
      return new rooms.RoomTR(x, y);
    }
    else if(finalRoom == "RoomTU"){
      return new rooms.RoomTU(x, y);
    }
    else if(finalRoom == "RoomTL"){
      return new rooms.RoomTL(x, y);
    }
    else if(finalRoom == "RoomTD"){
      return new rooms.RoomTD(x, y);
    }
    else if(finalRoom == "RoomCross"){
      return new rooms.RoomCross(x, y);
    }
  }
  //Blank Spot
  else{
    return new rooms.BlankSpot();
  }
}