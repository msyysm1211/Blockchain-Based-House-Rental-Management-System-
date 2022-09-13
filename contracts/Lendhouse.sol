pragma solidity >=0.4.21 <0.7.0;

contract LendHouse {
 /* address Owner;//卖方
  address Customer;//买方
  string Housename;//房屋名字
  uint Houseprice;//价格  */
  /*
  struct house{
        address Owner;//
        address Customer;
        string Housename;
        uint Houseprice;
  }*/

 // house  [] public houselist;
  struct HouseInfo{
      string HouseHash;
      uint Status;
      uint HouseIndex;
  }
  uint  HouseInfoCount;//所有房源数量
  HouseInfo [] HouseInfoArr;//存储house结构的数组集合cun'chu存储fanfang'zi房子suo'you房子所有 xin'x
  mapping(address=>HouseInfo[])  public  HouseInfoMap;// 将根据键（房东的地址）值／(HashlnfoArrQ    1       `Q.存储结构的数组集合） 对存储房东自己的 房源
  //house houseinfo= house(Owner,Customer,Housename,Houseprice);

/* function setInfo(address owner,address customer, string housename,uint houseprice)public {
      houselist.push(house(owner,customer,housename,houseprice));
  }*/
/*  function searchOwner() pure public  returns( string memory){
      uint i=0;
      string memory allAddress;
      for(i;i< HouseInfoMap[msg.sender].length;i++){
      allAddress=allAddress+','+HouseInfoMap[msg.sender][i];
      }
  }*/
    function getHashDataByRange(uint _start, uint _to) public  returns(bytes memory){
        require(_start>=0&&_to>=_start&&HouseInfoCount>=0,"传参五 ");
        string memory hash;
        string [] memory hashArr= new string[](HouseInfoCount);
        uint _int =0;
        for(uint256 i=0;i<HouseInfoArr.length;i++){
            hash=HouseInfoArr[i].HouseHash;
            if(HouseInfoArr[i].Status==0)
            {
                 hashArr[_int]=hash;
                 _int ++;
            }
        }
        return getAsBytes(hashArr,_start,_to);
    }
  function getHouseNum() public view returns(uint){
   return HouseInfoMap[msg.sender].length;
    }
    function getShowStatusNum() public view returns(uint){
        uint length;
        for(uint i=0;i<HouseInfoArr.length;i++){
            if(HouseInfoArr[i].Status==0)
            length++;
        }
   return length;
    }
  function addHash(string memory hash,uint status) public{//房主添加房源
        HouseInfoArr.push(HouseInfo(hash,status,HouseInfoArr.length));
        HouseInfoMap[msg.sender].push(HouseInfo(hash,status,HouseInfoArr.length-1));
        HouseInfoCount++;
  }
  function getHouseInfoArrIndex(uint targetIndex) public view returns(string memory,uint,uint){//房主查看个人房源
      require(HouseInfoMap[msg.sender].length>targetIndex,"数组越界");
      HouseInfo [] memory TargetHasharr=  HouseInfoMap[msg.sender];
      HouseInfo memory TargetHouseInfo= TargetHasharr[targetIndex];
      return(TargetHouseInfo.HouseHash,TargetHouseInfo.Status,TargetHouseInfo.HouseIndex);
  }
  function updateStatus(uint status,uint targetIndex) public {//房主修改房源
      require(status==0||status==1||status==2||status==3,"无此状态");
      require(HouseInfoMap[msg.sender].length>targetIndex,"数组越界 ");
       HouseInfo memory TargetHouseInfo= HouseInfoMap[msg.sender][targetIndex];
        require(status!=TargetHouseInfo.Status,"无此状态");
        HouseInfoMap[msg.sender][targetIndex].Status=status;
        HouseInfoArr[TargetHouseInfo.HouseIndex].Status=status;
  }
 /* function getAsBytes(string [] memory _arr ,uint256 _from,uint256 _to) internal pure returns ( bytes memory){
     string=
  }*/
  function toString(uint _start, uint _to)  public  returns(string memory){
      string memory test=byte32ToString(getHashDataByRange( _start,  _to));
      return test;
  }

   function byte32ToString(bytes memory b) public returns (string memory) {

       bytes memory names = new bytes(b.length);

       for(uint i = 0; i < b.length; i++) {

           names[i] = b[i];
       }

       return string(names);
   }

  function getAsBytes(string [] memory _arr ,uint256 _from,uint256 _to) internal  returns ( bytes memory){
      uint256 bytesSize =0;
      bytes memory elem;
      uint8 len;
      for(uint256 a=_from;a<_to;a++){
          elem = bytes(_arr[a]);
          uint8 elemlength=uint8(elem.length);
          uint len8= lengthBytes(elemlength);
          len=uint8(len8);
          require(len!=255,"len!=255");
          bytesSize +=1+len+elem.length;
      }
      uint256 counter=0;
      bytes memory b = new bytes(bytesSize);
      for(uint256 x= _from;x<_to;x++)
      {
          elem= bytes(_arr[x]);
           uint8 elemlength=uint8(elem.length);
          uint len8= lengthBytes(elemlength);
          len=uint8(len8);
          b[counter]=byte(len);
          counter++;
          for(uint y=0;y<len;y++){
              b[counter]=byte(uint8(elem.length/(2**(8*(len-1-y)))));
              counter++;
          }
          for(uint z=0;z<elem.length;z++){
              b[counter]=elem[z];
              counter++;
          }
      }
      return b;
  }
  function lengthBytes(uint8 elemlength) public returns(uint){
      uint length=(toBytes(elemlength)).length;
      return length;
  }
    function toBytes(uint8 x) public  returns (bytes memory b) {
        b = new bytes(32);
        for (uint i = 0; i < 32; i++) {
            b[i] = byte(uint8(x / (2**(8*(31 - i)))));
        }
    }

}
