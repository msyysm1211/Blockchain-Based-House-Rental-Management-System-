pragma solidity >=0.4.21 <0.7.0;
import "./ContractDetail.sol";
import "./Lendhouse.sol";
contract CreateContract{
   /* struct ContractDetail{
        uint waterFee;//水费
        uint electricityFee;//电费
        uint waterMeter;//水表读数
        uint electricityMeter;//电表读数
        uint rentFee; //房租费用
        uint rentTime; //租期
        uint256 startTime; //开始时间
        uint256 endTime; //结束时间
        uint totalFee;//总费用
        address TenantPublickey;//租客公钥
        bytes addInfo;
    }*/
    uint a=10;
    function set()payable public {
     LendHouse  contractDetail =  new LendHouse();
     }
      function set2()payable public {
           //ContractDetail  contractDetail =  new ContractDetail(1,1,1,1,1,1,1,1,1,0x7dF1fD774211Bc6CBA38b4f9ac16d3592d6258e0,0x7dF1fD774211Bc6CBA38b4f9ac16d3592d6258e0,"d4967590eb024589dfb6b9e48a576eb49ebc19d764b0d1d67dc21975e7258e97");
            ContractDetail  contractDetail =  new ContractDetail();
          }
     function test()payable public {
          a=11;
          }
               function test2()pure public returns(uint){
                      return 10;
                      }
    event ContractDetailEvent(address curAd,bool isture,address contractAdd);

    mapping(address =>ContractDetail[])public ContractDetailMap;
      function getSmartContractNum() public view returns(uint){
            uint length;
            for(uint i=0;i<ContractDetailMap[msg.sender].length;i++){
                length++;
            }
            return length;
          }
    //mapping(uint=>RentPamentInfo[]) public rentPaymentInfoMapping;
    function createSmartContract(uint _warterFee, uint _electricityFee,uint _waterMeter,uint _electricityMeter,uint _rentFee, uint _rentTerm, uint256 _startTime, uint256 _endTime,uint _PledgeFee,address _TenantPublickey ,bytes memory _addInfo) payable public {
           address currentUserAdd=msg.sender;
           if(!(_warterFee>0&&_electricityFee>0&&_waterMeter>0&&_electricityMeter>0&&_rentFee>0&&_rentTerm>0&&_startTime>0&&_endTime>0&&_PledgeFee>0&&_TenantPublickey!=address(0)&&_addInfo.length>0)){
               emit ContractDetailEvent(currentUserAdd,false,address(0));
           }
           ContractDetail  contractDetail =  new ContractDetail();
           contractDetail.addHouseInfo(_warterFee,_electricityFee,_waterMeter,_electricityMeter,_rentFee,_rentTerm,_startTime,_endTime,_PledgeFee,_TenantPublickey,currentUserAdd,_addInfo);
           ContractDetailMap[currentUserAdd].push(contractDetail);
           ContractDetailMap[_TenantPublickey].push(contractDetail);
           emit ContractDetailEvent(currentUserAdd,true,address(contractDetail));
       }
}
