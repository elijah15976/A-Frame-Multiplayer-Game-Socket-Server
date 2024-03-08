class TRight{
  constructor(x, z){
    this.name = "TRight";
    this.x = x;
    this.z = z;

    this.up = true;
    this.right = true;
    this.down = true;
    this.left = false;
  }
}

class TUp{
  constructor(x, z){
    this.name = "TUp";
    this.x = x;
    this.z = z;

    this.up = true;
    this.right = true;
    this.down = false;
    this.left = true;
  }
}

class TLeft{
  constructor(x, z){
    this.name = "TLeft";
    this.x = x;
    this.z = z;

    this.up = true;
    this.right = false;
    this.down = true;
    this.left = true;
  }
}

class TDown{
  constructor(x, z){
    this.name = "TDown";
    this.x = x;
    this.z = z;

    this.up = false;
    this.right = true;
    this.down = true;
    this.left = true;
  }
}

class Cross{
  constructor(x, z){
    this.name = "Cross";
    this.x = x;
    this.z = z;

    this.up = true;
    this.right = true;
    this.down = true;
    this.left = true;
  }
}

class StraightLR{
  constructor(x, z){
    this.name = "StraightLR";
    this.x = x;
    this.z = z;

    this.up = false;
    this.right = true;
    this.down = false;
    this.left = true;
  }
}

class StraightUD{
  constructor(x, z){
    this.name = "StraightUD";
    this.x = x;
    this.z = z;

    this.up = true;
    this.right = false;
    this.down = true;
    this.left = false;
  }
}

class CornerRU{
  constructor(x, z){
    this.name = "CornerRU";
    this.x = x;
    this.z = z;

    this.up = true;
    this.right = true;
    this.down = false;
    this.left = false;
  }
}

class CornerRD{
  constructor(x, z){
    this.name = "CornerRD";
    this.x = x;
    this.z = z;

    this.up = false;
    this.right = true;
    this.down = true;
    this.left = false;
  }
}

class CornerLD{
  constructor(x, z){
    this.name = "CornerLD";
    this.x = x;
    this.z = z;

    this.up = false;
    this.right = false;
    this.down = true;
    this.left = true;
  }
}

class CornerLU{
  constructor(x, z){
    this.name = "CornerLU";
    this.x = x;
    this.z = z;

    this.up = true;
    this.right = false;
    this.down = false;
    this.left = true;
  }
}

class RoomRight{
  constructor(x, z){
    this.name = "RoomRight";
    this.x = x;
    this.z = z;

    this.up = false;
    this.right = true;
    this.down = false;
    this.left = false;
  }
}

class RoomUp{
  constructor(x, z){
    this.name = "RoomUp";
    this.x = x;
    this.z = z;

    this.up = true;
    this.right = false;
    this.down = false;
    this.left = false;
  }
}

class RoomLeft{
  constructor(x, z){
    this.name = "RoomLeft";
    this.x = x;
    this.z = z;

    this.up = false;
    this.right = false;
    this.down = false;
    this.left = true;
  }
}

class RoomDown{
  constructor(x, z){
    this.name = "RoomDown";
    this.x = x;
    this.z = z;

    this.up = false;
    this.right = false;
    this.down = true;
    this.left = false;
  }
}

class RoomUD{
  constructor(x, z){
    this.name = "RoomUD";
    this.x = x;
    this.z = z;

    this.up = true;
    this.right = false;
    this.down = true;
    this.left = false;
  }
}

class RoomLR{
  constructor(x, z){
    this.name = "RoomLR";
    this.x = x;
    this.z = z;

    this.up = false;
    this.right = true;
    this.down = false;
    this.left = true;
  }
}

class RoomRU{
  constructor(x, z){
    this.name = "RoomRU";
    this.x = x;
    this.z = z;

    this.up = true;
    this.right = true;
    this.down = false;
    this.left = false;
  }
}

class RoomRD{
  constructor(x, z){
    this.name = "RoomRD";
    this.x = x;
    this.z = z;

    this.up = false;
    this.right = true;
    this.down = true;
    this.left = false;
  }
}

class RoomLD{
  constructor(x, z){
    this.name = "RoomLD";
    this.x = x;
    this.z = z;

    this.up = false;
    this.right = false;
    this.down = true;
    this.left = true;
  }
}

class RoomLU{
  constructor(x, z){
    this.name = "RoomLU";
    this.x = x;
    this.z = z;

    this.up = true;
    this.right = false;
    this.down = false;
    this.left = true;
  }
}

class RoomTR{
  constructor(x, z){
    this.name = "RoomTR";
    this.x = x;
    this.z = z;

    this.up = true;
    this.right = true;
    this.down = true;
    this.left = false;
  }
}

class RoomTU{
  constructor(x, z){
    this.name = "RoomTU";
    this.x = x;
    this.z = z;

    this.up = true;
    this.right = true;
    this.down = false;
    this.left = true;
  }
}

class RoomTL{
  constructor(x, z){
    this.name = "RoomTL";
    this.x = x;
    this.z = z;

    this.up = true;
    this.right = false;
    this.down = true;
    this.left = true;
  }
}

class RoomTD{
  constructor(x, z){
    this.name = "RoomTD";
    this.x = x;
    this.z = z;

    this.up = false;
    this.right = true;
    this.down = true;
    this.left = true;
  }
}

class RoomCross{
  constructor(x, z){
    this.name = "RoomCross";
    this.x = x;
    this.z = z;

    this.up = true;
    this.right = true;
    this.down = true;
    this.left = true;
  }
}

class BlankSpot{
  constructor(x, z){
    this.name = "BlankSpot";
    this.x = x;
    this.z = z;

    this.up = false;
    this.right = false;
    this.down = false;
    this.left = false;
  }
}

module.exports = {
  TRight,
  TUp,
  TLeft,
  TDown,
  Cross,
  StraightLR,
  StraightUD,
  CornerRU,
  CornerRD,
  CornerLD,
  CornerLU,
  RoomRight,
  RoomUp,
  RoomLeft,
  RoomDown,
  RoomUD,
  RoomLR,
  RoomRU,
  RoomRD,
  RoomLD,
  RoomLU,
  RoomTR,
  RoomTU,
  RoomTL,
  RoomTD,
  RoomCross,
  BlankSpot
};