pragma solidity >=0.4.21 <0.7.0;
//import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";
contract ContractDetail{
        uint waterFee;//水费
              uint electricityFee;//电费
              uint waterMeter;//水表读数
              uint electricityMeter;//电表读数
              uint rentFee; //房租费用
              uint rentTerm; //租期
              uint256 startTime; //开始时间
              uint256 endTime; //结束时间
              uint PledgeFee;//yajin费用
              address tenantPublickey;//租客公钥f
              address ownerPublickey;//房东公钥
              bytes addInfo;

           function getInfo()  public view returns(uint,uint,uint,uint,uint,uint,uint,uint,uint,address,address,bytes memory){
                 return(waterFee,electricityFee,waterMeter,electricityMeter,rentFee,rentTerm,startTime,endTime,PledgeFee,tenantPublickey,ownerPublickey,addInfo);
             }
        function getInfo2() public view returns (uint,uint,uint,uint,uint,uint,uint){
            return(activeFee,needActiveFee,pledgeCash,currentStage,withDrawCashOwner,withDrawCashTenant,leaseFee);
        }
        function getStatusList() public view returns (ContractStatus,RentFeeStatus,PledgeConfirm){
            return(status,rentstatus,pconfirm);
        }

              ContractStatus status;
              RentFeeStatus rentstatus;
              PledgeConfirm pconfirm;

              uint activeFee;
              uint needActiveFee;
              uint pledgeCash;

              uint currentStageRentFee;
              uint rentCash;

              uint currentStage;
              uint withDrawCashOwner;
              uint withDrawCashTenant;
              uint leaseFee;
              mapping(uint=>RentPamentInfo)  rentPaymentInfoMapping;
              RentPamentInfo  rentPaymentInit  ;



              struct MeterInfo{
                  uint fee;
                  uint lastMonthMeter;
                  uint currentMonthMeter;
                  uint currentMonthUse;
              }

              struct RentPamentInfo{
                   RentFeeStatus status;
                   uint rentFeeTotal;
                   uint createDate;
                   uint paymentDate;
                   MeterInfo waterMeterInfo;
                   MeterInfo electricityMeterInfo;
                   uint rentFeeCash;
                   uint ethRentFeeTaltal;
              }

              enum ContractStatus{
                  ACTIVE_CONTRACT,
                  SIGNTURE_CONTRACT,
                  PLAYING_PLEDGE,
                  PLAYING_RENT,
                  WITHDRAW_PLEDGE,
                  COMPLETED
              }
              enum RentFeeStatus{
                  UN_ADD_METER,
                  UN_PAY_RENT_FEE,
                  PAYED_RENT_FEE,
                  WITHDRAW_RENT_FEE
              }
              enum PledgeConfirm{
                  CREATE,
                  CONFIRMING,
                  UN_ACCEPT,
                  ACCEPT
              }

          event test(uint PledgeFee);
          event ContractStatusEvent(address useraddress, ContractStatus status, bool isture,string output);
          event PledgeWithdrawalStatusEvent(address useraddress, PledgeConfirm status, bool isture,string output);
          event ActiveWithdrawlEvent (address useraddress, uint activefee, bool isture,string output);

  modifier onlyTenant(){
        require(address(msg.sender)==tenantPublickey,"只有租客才能操作");_;
    }
    modifier onlyOwner(){
        require(address(msg.sender)== ownerPublickey,"只有房东才能操作");_;
    }
    modifier onlyContractJoiner(){
        require(address(msg.sender)==ownerPublickey||address(msg.sender)==tenantPublickey,"只有该合同参与者才能操作");_;
    }
    modifier atStatus(ContractStatus _status){
        require(status==_status,"不符合当前状态");_;
    }
    modifier atRentFeeStage(uint _stage, RentFeeStatus _status){
        require(rentPaymentInfoMapping[_stage].status==_status,"该操作不符合当前状态");_;
    }
    modifier atUnConfirmedStage(){
        require(PledgeConfirm.ACCEPT!=pconfirm,"该操作不符合当前状态");_;
    }
    modifier atPledgeStageAccept(){
        require(PledgeConfirm.ACCEPT==pconfirm,"双方未达成一致");_;
    }
     function addHouseInfo (uint _warterFee, uint _electricityFee,uint _waterMeter,uint _electricityMeter,uint _rentFee, uint _rentTime, uint256 _startTime, uint256 _endTime,uint _PledgeFee,address _tenantPublickey ,address _ownerPublickey,bytes memory _addInfo) public {
            waterFee=_warterFee;
            electricityFee=_electricityFee;
            waterMeter=_waterMeter;
            electricityMeter=_electricityMeter;
            rentFee=_rentFee;
            rentTerm=_rentTime;
            startTime=_startTime;
            endTime=_endTime;
            PledgeFee=_PledgeFee;
            tenantPublickey=_tenantPublickey;
            ownerPublickey=_ownerPublickey;
            addInfo=_addInfo;

            rentPaymentInit.rentFeeCash= rentFee=_rentFee;
           // rentPaymentInit.waterMeterInfo.fee=waterFee;
            rentPaymentInit.waterMeterInfo.lastMonthMeter=_waterMeter;
           // rentPaymentInit.electricityMeterInfo.fee=electricityFee;
            rentPaymentInit.electricityMeterInfo.lastMonthMeter=_electricityMeter;
            rentPaymentInit.paymentDate=startTime;
        }
        /*
              struct MeterInfo{
                  uint fee;
                  uint lastMonthMeter;
                  uint currentMonthMeter;
                  uint currentMonthUse;
              }

              struct RentPamentInfo{
                   RentFeeStatus status;
                   uint rentFeeTotal;
                   uint createDate;
                   uint paymentDate;
                   MeterInfo waterMeterInfo;
                   MeterInfo electricityMeterInfo;
                   uint rentFeeCash;
                   uint ethRentFeeTaltal;
              }
*/
 function activeContract() onlyOwner atStatus(ContractStatus.ACTIVE_CONTRACT) payable public{//激活合约
        if(msg.value>=needActiveFee){
            activeFee+=msg.value;
            status= ContractStatus.SIGNTURE_CONTRACT;
            emit ContractStatusEvent(msg.sender,status,true,"激活成功 ");
            return;
        }
        else{
            emit ContractStatusEvent(msg.sender,status,false,"激活失败");
            return;
        }
    }
    function signtureContract() onlyTenant atStatus(ContractStatus.SIGNTURE_CONTRACT) payable public{//签署合约
            status = ContractStatus.PLAYING_PLEDGE;
             emit ContractStatusEvent(msg.sender,status,false,"签名成功");
        }

        function payPledge() onlyTenant atStatus(ContractStatus.PLAYING_PLEDGE) payable public{//支付押金
          pledgeCash +=msg.value;
            if(pledgeCash>PledgeFee){
                emit ContractStatusEvent(msg.sender,status,false,"支付押金过多 ");
                return;
            }
            if(pledgeCash==PledgeFee){
                status = ContractStatus.PLAYING_RENT;
               addRentPamentInfo();
                emit ContractStatusEvent(msg.sender,status,true,"已支付押金 ");
                return;
            }
            else{
                emit ContractStatusEvent(msg.sender,status,false,"支付押金过少 ");
                return;
            }
        }
         function getInfo3() public view returns(uint,uint){
                 return(pledgeCash,PledgeFee);
             }
          function addRentPamentInfo() internal{//添加账单
                if(currentStage==0){
                    rentPaymentInfoMapping[currentStage]=rentPaymentInit;
                    updatePrice(0);
                }
                else{
                    rentPaymentInit.status=RentFeeStatus.UN_ADD_METER;
                    rentPaymentInit.waterMeterInfo.lastMonthMeter=rentPaymentInfoMapping[currentStage-1].waterMeterInfo.lastMonthMeter;
                    rentPaymentInit.waterMeterInfo.currentMonthMeter=0;
                    rentPaymentInit.electricityMeterInfo.lastMonthMeter=rentPaymentInfoMapping[currentStage-1].electricityMeterInfo.lastMonthMeter;
                    rentPaymentInit.electricityMeterInfo.currentMonthMeter=0;
                    rentPaymentInfoMapping[currentStage]=rentPaymentInit;
                }
            }
              function generateMeter(uint _stage,uint _currentWaterMeter, uint _cureentElectricityMeter)
                onlyContractJoiner
                 public {
                    RentPamentInfo storage currentPaymentInfo = rentPaymentInfoMapping[_stage];
                    RentPamentInfo storage prevPaymentInfo =  rentPaymentInfoMapping[_stage-1];
                    MeterInfo storage prevWaterMeterInfo = prevPaymentInfo.waterMeterInfo;
                    MeterInfo storage preElectricMeterInfo = prevPaymentInfo.electricityMeterInfo;
                    uint waterMeterCount=_currentWaterMeter - prevWaterMeterInfo.lastMonthMeter;
                    uint electricityMeterCount = _cureentElectricityMeter - preElectricMeterInfo.lastMonthMeter;

                    currentPaymentInfo.waterMeterInfo.currentMonthMeter=_currentWaterMeter;
                    currentPaymentInfo.waterMeterInfo.fee = waterMeterCount * waterFee;
                    currentPaymentInfo.waterMeterInfo.currentMonthUse = waterMeterCount;

                    currentPaymentInfo.electricityMeterInfo.currentMonthMeter=_cureentElectricityMeter;
                    currentPaymentInfo.electricityMeterInfo.fee = electricityMeterCount * electricityFee;
                    currentPaymentInfo.electricityMeterInfo.currentMonthUse = electricityMeterCount;

                    currentPaymentInfo.waterMeterInfo.lastMonthMeter=_currentWaterMeter;
                     currentPaymentInfo.electricityMeterInfo.lastMonthMeter=_cureentElectricityMeter;

                     emit test3(currentStage,electricityMeterCount);
                    emit test3(waterMeterCount,electricityMeterCount);
                    emit test3(currentPaymentInfo.electricityMeterInfo.fee, currentPaymentInfo.waterMeterInfo.fee);

                    currentPaymentInfo.status=RentFeeStatus.UN_PAY_RENT_FEE;
                    rentPaymentInfoMapping[_stage]=currentPaymentInfo;
                    updatePrice(_stage);
                }
                event test3(uint w,uint e);

                event test2(uint stage,uint rentFeeTotal,uint wfee,uint efee,uint wmeter,uint emeter);
                function setMeter(uint b,uint c)public {
                    currentStage++;
                    addRentPamentInfo();
                    generateMeter(currentStage,b,c);


                    emit test2(currentStage,rentPaymentInfoMapping[currentStage].rentFeeTotal,
                    rentPaymentInfoMapping[currentStage].waterMeterInfo.fee, rentPaymentInfoMapping[currentStage].electricityMeterInfo.fee,
                     rentPaymentInfoMapping[currentStage].waterMeterInfo.lastMonthMeter, rentPaymentInfoMapping[currentStage].electricityMeterInfo.lastMonthMeter);
                }

event test4(uint total,uint wfee,uint efee);
                function updatePrice(uint _stage)internal{//计算总费用

                    uint _waterFee=rentPaymentInfoMapping[_stage].waterMeterInfo.fee;
                    uint _electricityFee=rentPaymentInfoMapping[_stage].electricityMeterInfo.fee;
                    uint total= rentFee+_waterFee+_electricityFee;
                    emit test4(total,_waterFee,_electricityFee);
                    rentPaymentInfoMapping[_stage].rentFeeTotal=total;

                }



        function payRent() onlyTenant atStatus(ContractStatus.PLAYING_RENT) payable public{//支付押金
            uint _stage=currentStage;
            rentCash =msg.value;
            emit test3(rentCash ,rentPaymentInfoMapping[_stage].rentFeeTotal);

            if(rentCash>rentPaymentInfoMapping[_stage].rentFeeTotal){
                emit ContractStatusEvent(msg.sender,status,false,"支付押金过多 ");
                return;
            }
            if(rentCash==rentPaymentInfoMapping[_stage].rentFeeTotal){
                rentPaymentInfoMapping[_stage].status=RentFeeStatus.PAYED_RENT_FEE;
                emit ContractStatusEvent(msg.sender,status,true,"已支付押金 ");
                return;
            }
            else{
                emit ContractStatusEvent(msg.sender,status,false,"支付押金过少 ");
                return;
            }
        }

                function completeRentFee()//完成合约
                onlyContractJoiner
                atStatus(ContractStatus.PLAYING_RENT)public {
                    if(currentStage==rentTerm-1){
                        for(uint i=0;i<=currentStage;i++){
                            if(rentPaymentInfoMapping[i].status!= RentFeeStatus.PAYED_RENT_FEE){
                                emit ContractStatusEvent(msg.sender,status,false,"存在未支付租金  ");
                                return;
                            }
                        }
                    }
                    else{
                            emit ContractStatusEvent(msg.sender,status,false,"未到期");
                            return;
                        }
                    status = ContractStatus.WITHDRAW_PLEDGE;
                    emit ContractStatusEvent(msg.sender,status,true,"finish");
                    return;
                }
                 function judgeWithDrawalPledge(uint _amount) onlyOwner atStatus(ContractStatus.WITHDRAW_PLEDGE) atUnConfirmedStage()public{
                        withDrawCashOwner=pledgeCash - _amount;
                        withDrawCashTenant = _amount;
                        pconfirm=PledgeConfirm.CONFIRMING;
                        emit PledgeWithdrawalStatusEvent(msg.sender,pconfirm,true,"修改状态待租客确认");
                    }
                 function isAgree(uint _agree) onlyTenant atStatus(ContractStatus.WITHDRAW_PLEDGE)
                    atUnConfirmedStage public
                    {
                        if(_agree==2){
                            pconfirm = PledgeConfirm.UN_ACCEPT;
                              emit PledgeWithdrawalStatusEvent(msg.sender,pconfirm,false,"不接受退回押金");
                             emit ContractStatusEvent(msg.sender,status,false,"不接受退回押金");
                        }
                        else if(_agree ==3){
                            pconfirm = PledgeConfirm.ACCEPT;
                            status = ContractStatus.COMPLETED;
                              emit PledgeWithdrawalStatusEvent(msg.sender,pconfirm,true,"接受退回押金 ");
                            emit ContractStatusEvent(msg.sender,status,true,"租赁合同完成");
                        }
                    }
                    function withdrawActiveFee()
                    atStatus(ContractStatus.COMPLETED) onlyOwner payable public{
                        uint amount = activeFee;
                        if(amount>0){
                             activeFee=0;
                             if(!msg.sender.send(amount)){
                                 activeFee=amount;
                                 emit ActiveWithdrawlEvent(msg.sender,activeFee,false,"取出合同余额失败");
                                 return;
                             }
                             else{
                                 emit ActiveWithdrawlEvent(msg.sender,activeFee,true,"取出合同余成功 ");
                                 return;
                             }
                        }
                        else{
                                 revert();
                             }
                    }




}