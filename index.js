//Websocket Documentation
//https://javascript.info/websocket

//Importing External Files
const helper = require('./helper.js');
const roomGeneration = require('./roomGenerationServer.js');

helper.init();

//Creating the actual server
const WebSocket = require('ws');
const server = new WebSocket.Server({port:'80'});

let players = [];
let currentMaze = "";
let currentTasks = "";
let inGameStatus = false; //false = Not In Game, true = In Game
let pacmanLocationX, pacmanLocationZ;
let pacmanLives;
let ghostLocationX, ghostLocationZ;

let keysToCollect = 0, keysCollected = 0;

//User IDs
let ghosts = [], pacman;
//Sockets
let ghostUsers = [], pacmanUser;

//Listens to incoming connection
server.on('connection', socket =>{
  //Sends the number of players that are currently connected so the client knows how many players to render
  //Broadcasts to everyone else that someone has joined the server
  socket.send(`Connection Secured`);
  server.broadcast(`Players Online: ${server.clients.size}`);
  //Listens to messages that is RECEIVED
  socket.on('message', message =>{
    if(message.includes("Connected UserID:")){
      //Stores the userID to the socket (client) so when disconnecting, it can be removed from other client's screen
      //Makes sure that a user can only join once.
      userID = message.toString().substring(18);
      if(server.getUserIDs().includes(userID)){
        socket.close();
        console.log(`${userID} tried to join twice`);
      }
      else{
        socket.userID = message.toString().substring(18);
      }
    }
    else if(message.includes("Connected Username:")){
      //Stores the username to the socket (client) so when disconnecting, it can be removed from other client's screen
      socket.username = message.toString().substring(20);
      server.prune();
      socket.send(`Online Players: ${JSON.stringify(server.getUsers())}`);
      if(inGameStatus){
        socket.send(`Maze: ${currentMaze}`);
        socket.send(`Tasks: ${currentTasks}`);
        socket.send(`Pacman: ${pacman}`);
        socket.send(`Ghosts: ${JSON.stringify(ghosts)}`);
      }
      server.broadcastExclude(`Someone connected! ["${socket.userID}", "${socket.username}"]`,socket);
    }
    else if(message.includes("Player Info:")){
      //SENDS the message to all other connecting clients
      server.broadcastExclude(message.toString(),socket);
    }
    else if(message == process.env['MAGIC_PASSWORD']){
      startGame();
    }
    else if(message == "returnToLobby"){
      socket.send("Location: [0, 1, 3]");
    }
    else if(message == "Spectate"){
      socket.send("Location: [150 , 11, 130]");
      if(players.includes(socket.userID)){
        socket.send("Already in queue");
        players.splice(players.indexOf(socket.userID), 1);
        server.broadcast(`In Queue: ${players.length}`);
        console.log(`In Queue: ${players.length}`);
      }
    }
    else if(message == "Add to queue"){
      if(!inGameStatus){
        if(players.includes(socket.userID)){
          socket.send("Already in queue");
          players.splice(players.indexOf(socket.userID), 1);
          server.broadcast(`In Queue: ${players.length}`);
          console.log(`In Queue: ${players.length}`);
        }
        else if(players.length < 5){
          players.push(socket.userID);
          socket.send("Added to queue");
          server.broadcast(`In Queue: ${players.length}`);
          console.log(`In Queue: ${players.length}`);
          if(players.length >= 5){
            startGame();
          }
        }
        else{
          socket.send(`Queue is full`);
        }
      }
    }
    else if(message == "Pacman clicked"){
      if(inGameStatus){
        if(pacmanLives > 0){
          pacmanLives -= 1;
          for(let i = 0; i < ghostUsers.length; i++){
            helper.spawnGhost(ghostUsers[i], ghostLocationX, ghostLocationZ);
          }
          pacmanUser.send(`Location: [${pacmanLocationX}, -9, ${pacmanLocationZ}]`);
          pacmanUser.send(`Lives: ${pacmanLives}`);
        }
        else{
          for(let i = 0; i < ghostUsers.length; i++){
            ghostUsers[i].send("Ghost Wins");
          }
          endGame();
        }
      }
    }
    else if(message.includes("Key Clicked: ")){
      if(inGameStatus && socket == pacmanUser){
        keysCollected++;
        server.broadcast(message);
        pacmanUser.send(`Keys To Collect: ${keysToCollect - keysCollected}`);
        if(keysCollected >= keysToCollect){
          pacmanUser.send("Pacman Wins");
          endGame();
        }
      }
    }
    else if(message.includes("Wins")){
      //Prevent user from adding wins manually
    }
    else{
      console.log(`I got this: ${message}`);
      server.broadcast(message.toString());
    }
  });
  //Detects when someone disconnects
  socket.on('close', () =>{
    if((typeof socket.userID) != "undefined" || socket.userID != undefined){
      console.log(`Someone disconnected: ${socket.userID}`);
      server.broadcast(`Disconnected: ${socket.userID}`);
      if(players.includes(socket.userID)){
        if(inGameStatus){
          console.log("Going to call endGame()");
          endGame();
        }
        players.splice(players.indexOf(socket.userID), 1);
        server.broadcast(`In Queue: ${players.length}`);
        console.log(`In Queue: ${players.length}`);
      }
    }
  });
});

//Creating a function so that we can broadcast messages to all clients
server.broadcast = (msg)=>{
  server.clients.forEach(function each(client) {
    client.send(msg.toString());
  });
}

//Creating a function so that we can broadcast messages to all clients EXCEPT the sender
server.broadcastExclude = (msg, sender)=>{
  server.clients.forEach(function(client) {
    if (client !== sender) {
      client.send(msg);
    }
  });
}

//Creating a function so that we can send a messages to a specific client outside the connection event
server.sendTo = (msg, recipient)=>{
  server.clients.forEach(function(client) {
    if (client.userID == recipient) {
      client.send(msg);
    }
  });
}

//Creating a function that will return a socket when looking up a userID
//Increases efficiency of code by not looping through all clients all the time
server.getUser = (userID)=>{
  for (const client of server.clients) {
    if (client.userID === userID) {
      return client;
    }
  }
}

//Creating a function so that we can get ALL clients' user information at once
server.getUsers = ()=>{
  let playerList = [];
  server.clients.forEach(function each(client) {
    let tempList = [];
    tempList.push(client.userID);
    tempList.push(client.username);
    playerList.push(tempList);
  });
  return playerList;
}

//Creating a function so that we can get ALL clients' userID at once
server.getUserIDs = ()=>{
  let playerList = [];
  server.clients.forEach(function each(client) {
    playerList.push(client.userID);
  });
  return playerList;
}

//Creating a function so that we can get ALL clients' username at once
server.getUsernames = ()=>{
  let playerList = [];
  server.clients.forEach(function each(client) {
    playerList.push(client.username);
  });
  return playerList;
}

server.prune = ()=>{
  server.clients.forEach(function each(client) {
    if(client.userID == null || client.username == null){
      client.close();
    }
  });
}

/********************* GAME LOGIC STUFF *********************/

//Initialize the game
function startGame(){
  inGameStatus = true;
  helper.gameStatusSetTrue();
  roomGeneration.init();
  currentMaze = roomGeneration.generate();
  currentTasks = roomGeneration.sendTasks();
  server.broadcast(`Maze: ${currentMaze}`);
  server.broadcast(`Tasks: ${currentTasks}`);

  pacman = "";
  ghosts = [];
  pacmanUser = undefined;
  ghostUsers = [];

  //Deligate teams
  pacman = players.random();
  pacmanUser = server.getUser(pacman);
  for(let i = 0; i < players.length; i++){
    if(players[i] != pacman){
      ghosts.push(players[i]);
      ghostUsers.push(server.getUser(players[i]));
    }
  }
  
  server.broadcast(`Pacman: ${pacman}`);
  server.broadcast(`Ghosts: ${JSON.stringify(ghosts)}`);
  
  pacmanLives = 3;
  pacmanUser.send(`Lives: ${pacmanLives}`);

  keysCollected = 0;

  let amountOfKeys = roomGeneration.getAmountOfKeys();
  let lowerBound = Math.floor(amountOfKeys*(1/4));
  let upperBound = Math.floor(amountOfKeys*(1/2));
  keysToCollect = Math.floor(Math.random()*(upperBound-lowerBound) + lowerBound);
  setTimeout(()=>{
    pacmanUser.send(`Keys To Collect: ${keysToCollect - keysCollected}`);
  }, 5000);

  //Generate Pacman spawn location
  pacmanLocationX = (10*(Math.floor(Math.random()*10))+3)+50;
  pacmanLocationZ = (10*(Math.floor(Math.random()*10))+3)+50;
  
  pacmanUser.send(`Location: [${pacmanLocationX}, -9, ${pacmanLocationZ}]`);

  //Generate Ghost spawn location
  do{
    ghostLocationX = (10*(Math.floor(Math.random()*10))+3)+50;
    ghostLocationZ = (10*(Math.floor(Math.random()*10))+3)+50;
  } while(`${ghostLocationX} ${ghostLocationZ}` == `${pacmanLocationX} ${pacmanLocationZ}`);

  //Send to ghost room
  for(let i = 0; i < ghostUsers.length; i++){
    helper.spawnGhost(ghostUsers[i], ghostLocationX, ghostLocationZ);
  }
}

//Stop the game
function endGame(){
  if(inGameStatus){
    try{
      pacmanUser.send(`Location: [0, 1, 3]`);
    }
    catch(error){
      console.log(error);
    }
    console.log("Pacman sent to lobby");
  
    for(let i = 0; i < ghostUsers.length; i++){
      try{
        ghostUsers[i].send(`Location: [0, 1, 3]`);
      }
      catch(error){
        console.log(error);
      }
    }
    console.log("Ghost sent to lobby");
  }
  inGameStatus = false;
  helper.gameStatusSetFalse();
  console.log("inGameStatus set to false");

  currentMaze = "";
  currentTasks = "";
  keysToCollect = 0;
  keysCollected = 0;
  players = [];
  pacman = "";
  ghosts = [];
  pacmanUser = undefined;
  ghostUsers = [];
  console.log("Reset player and maze info");

  server.broadcast("Game End");
  console.log("Game End");
  
  server.broadcast(`In Queue: ${players.length}`);
  console.log(`In Queue: ${players.length}`);
}