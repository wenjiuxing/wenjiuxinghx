
var IPDomain1 = 'http://api.wms.yncic.com/pmc';
var IPDomain2 = 'http://api.wms.yncic.com/bs';
var IPDomain3='http://api.wms.yncic.com/sap';
// var IPDomain1 ='http://api.wms.yncic.com/pmc';
// var IPDomain2 ='http://api.wms.yncic.com/bs';
//var IPDomain3 ='http://api.wms.yncic.com/sap';
 
//获取领用入库数据
function GetInWarehouseOderDatas(siteCode,WarehousingOderCode,type) {
    var headData = new Array();
    var footData = new Array();
    var detaileds =new Array();
    var temp =new Array();
    var TotalAmount =0;
    var BigTotal ="";
    var result =new Array();
    var InWareHouseData =new Array();
    var postingDate=''
     $.ajax({
       url :IPDomain1+'/wms/ReceiptResources/findRecdeiptHead?warehouseCode='+WarehousingOderCode,
       dataType :'json',
       type : 'Get',
       async : false,
       success : function(headsData) {
        if(headsData!=null&&headsData!=undefined){
           $.ajax({

            //http://api.wms.yncic.com/pmc/wms/ReceiptResources/findReceiptPrint?receiptCode=R3007201810240132'
            url :IPDomain1+'/wms/ReceiptResources/findReceiptPrint?receiptCode='+WarehousingOderCode,
            dataType :'json',
            type : 'Get',
            async : false,
            success : function(data) {
             if(data.data.length>0){
              $.ajax({
                url :IPDomain1+'/wms/ReceiptResources/findDetailByHead?warehouseCode='+WarehousingOderCode,
                dataType :'json',
                type : 'Get',
                async : false,
                success:function(detailData){
                  postingDate=detailData.data[0].postingDate
                 
                }
              })
             //遍历单据明细data
              for(var i=0;i<data.data.length;i++)
              {
                var unitdesc ="";
                var warehouse =""; 
                var warehouseDesc ="";
                var contractNumber = getProcurementContract(headsData.sourceDocuments);
                if(contractNumber==""&&contractNumber==undefined)
                {
                 contractNumber="";
                }
                // var taxPrice = GetTaxPrice(headsData.sourceDocuments,data.data[i].materielCode);  //获取含税单价
                if(data.data[i].measurementUnit!=""&&data.data[i].measurementUnit!=undefined)
                {
                    unitdesc = GetUnitDesc(data.data[i].measurementUnit);//获取单位描述
                }else{
                    unitdesc = "";//获取单位描述
                }
                //给入库明细对象赋值
                detaileds.push(new InWareHouseDetailed(data.data[i].item,data.data[i].materielCode,data.data[i].materielDesc,data.data[i].orderNum,data.data[i].num,unitdesc,data.data[i].taxUnitPrice,data.data[i].totalNetPrice,data.data[i].taxAmount,data.data[i].unitPrice,data.data[i].receivePosition));
                TotalAmount+=Number(parseFloat(data.data[i].unitPrice).toFixed(2));
            } 
                BigTotal = smalltoBIG(TotalAmount.toFixed(2));//转为大写
              if(data.data[0].receiveWarehouse!=undefined&&data.data[0].receiveWarehouse!="")
              {
                warehouse = data.data[0].receiveWarehouse;
                //获取仓库描述
                 warehouseDesc = GetWareHouseDesc(siteCode,warehouse);
              }else{
   
                 warehouseDesc = "";
              }
               headData.push(headsData.warehouseCode);
              // alert(headsData.receiptCreateDate);
               headData.push(postingDate);
               
               headData.push(GetPostDateTime(headsData.warehouseCode));
               headData.push(warehouseDesc+"("+warehouse+")");
               headData.push(headsData.supplierCode);
               headData.push(headsData.supplierName);
               headData.push(contractNumber);
               headData.push(headsData.businessType);
               headData.push(headsData.movementType);
               headData.push(checkVal(GetRequest(headsData.sourceDocuments))); 
             
               temp=detaileds.slice(0); 
               var arrCount = 0;
              if(type=="1")
              {
                if(temp.length>3)
                {
                  arrCount = temp.length%3;
                }else{
                  arrCount =3-temp.length;
                }
              }else {
                if(temp.length>20)
                {
                  arrCount = temp.length%20;
                }else{
                  arrCount =20-temp.length;
                }
              }
              if(arrCount!=0)
              {
                for(var i= 0;i<arrCount ;i++)
                {
                  temp.push(new InWareHouseDetailed('','','','','','','','','',''));
                }
              } 
              footData.push(BigTotal);
              footData.push(TotalAmount.toFixed(2));
              footData.push(getNowFormatDate());
              result=PageResult(temp,type);
              console.log(headData);
              console.log(result);
              console.log(footData);
              InWareHouseData.push(headData);
              InWareHouseData.push(result);
              InWareHouseData.push(footData);
             }
          },error: function () {
                alert("请求错误,请检查参数和接口");
              }
        });
      }
     },error: function () {
           alert("请求错误,请检查参数和接口");
         }
   });
   return InWareHouseData;
   }

//领用出库
function GetOutWarehouseOrderDatas(siteCode,outWarehouseOrderCode,type)
{
    var deliveryHead =new Array();
    var deliveryDetails =new Array();
    var datas =new Array();
    var temp =new Array();
    var result =new Array();
    var wareHouseDesc ="";
    var footData =new Array();
    var TotalAmount =0;
  
    var BigTotal ="";
     $.ajax({
       //http://api.wms.yncic.com/pmc/wms/PrintOrderResources/getPrintWmDeliveryOrderVo?orderNo=C3007201811050009
      url :IPDomain1+'/wms/PrintOrderResources/getPrintWmDeliveryOrderVo?orderNo='+outWarehouseOrderCode,
      //url :IPDomain1+'/wms/PrintOrderResources/getPrintWmDeliveryOrderVo?orderNo=C3007201812200006',
       dataType :'json',
       type : 'Get',
       async : false,
       success : function(data) {
        if(data!=null&&data!=undefined){
          var warehouse = getWareHouse(outWarehouseOrderCode);//获取仓库编码
          wareHouseDesc =checkVal(GetWareHouseDesc(siteCode,warehouse));//获取仓库名称
          deliveryHead.push(checkVal(data.data[0].outWarehouseCode));
          deliveryHead.push(checkVal(data.data[0].leadingDepartment));
          deliveryHead.push(checkVal(data.data[0].costCenter));
          deliveryHead.push(checkVal(GetPostDateTime(data.data[0].outWarehouseCode)));
          deliveryHead.push(checkVal(data.data[0].businessType));
          deliveryHead.push(checkVal(data.data[0].movementType));
          deliveryHead.push(wareHouseDesc+"("+warehouse+")");
          deliveryHead.push(checkVal(data.data[0].internalOrders));
          deliveryHead.push(checkVal(GetCostCenter(data.data[0].costCenter)));
          deliveryHead.push(checkVal(data.data[0].productOrder));
          deliveryHead.push(checkVal(data.data[0].purchaseOrderCode));
          if(data.data[0].detailVos.length>0)
          {
           for(i=0;i<data.data[0].detailVos.length;i++)
           {
             console.log(data.data[0].detailVos[i])
            var unitDesc = GetUnitDesc(data.data[0].detailVos[i].measurementUnit);
            deliveryDetails.push(new OutWareHouseDetailed(data.data[0].detailVos[i].itemLine,data.data[0].detailVos[i].materielCode,data.data[0].detailVos[i].materielDesc,data.data[0].detailVos[i].num,unitDesc,data.data[0].detailVos[i].unitPrice,data.data[0].detailVos[i].amount,data.data[0].detailVos[i].outPosition) );
            TotalAmount+=  Math.round(data.data[0].detailVos[i].amount * 100) / 100;
           
           }
  
           temp=deliveryDetails.slice(0); 
           var arrCount = 0;
           if(type=="1")
           {
            if(temp.length>3)
            {
              arrCount = temp.length%3;
            }else{
              arrCount =3-temp.length;
            }
           }else{
            if(temp.length>20)
            {
              arrCount = temp.length%20;
            }else{
              arrCount =20-temp.length;
            }
           }
           if(arrCount!=0)
           {
             for(var i= 0;i<arrCount ;i++)
             {
               temp.push(new OutWareHouseDetailed('','','','','','','',''));
             }
           } 
           result=PageResult(temp,type);
           footData.push(smalltoBIG(TotalAmount.toFixed(2)));
           footData.push(TotalAmount.toFixed(2));
           footData.push(getNowFormatDate());
           footData.push(checkVal(data.data[0].remark));
          }else{
   
           alert("明细为空，请检查 !");
          }
        
        console.log(deliveryHead);
        console.log(result);
        console.log(footData);
        datas.push(deliveryHead);
        datas.push(result);
        datas.push(footData);
       
         }
   
      
     },error: function () {
           alert("请求错误,请检查参数和接口");
        
         }
   });

   return datas;
}

//销售出库
function GetSaleOutWarehouseOrderDatas(siteCode,outWarehouseOrderCode,type)
{
    var deliveryHead =new Array();
    var deliveryDetails =new Array();
    var datas =new Array();
    var temp =new Array();
    var result =new Array();
    var wareHouseDesc ="";
    var footData =new Array();
    var TotalAmount =0;
     $.ajax({
       url :IPDomain1+'/wms/PrintOrderResources/getPrintWmDeliveryOrderSaleVo?orderNo='+outWarehouseOrderCode,
       dataType :'json',
       type : 'Get',
       async : false,
       success : function(data) {
        if(data!=null&&data!=undefined){
          var warehouse = getWareHouse(outWarehouseOrderCode);//获取仓库编码
          wareHouseDesc =checkVal(GetWareHouseDesc(siteCode,warehouse));//获取仓库名称
          deliveryHead.push(checkVal(data.data[0].outWarehouseCode));
          deliveryHead.push(checkVal(data.data[0].customerName));
          deliveryHead.push(wareHouseDesc);
          deliveryHead.push(checkVal(data.data[0].outWarehouseDate));
          deliveryHead.push(checkVal(data.data[0].customerCode));
          deliveryHead.push(checkVal(data.data[0].sourceDocuments));
          deliveryHead.push(data.data[0].movementType);
          if(data.data[0].detailVos.length>0)
          {
           for(i=0;i<data.data[0].detailVos.length;i++)
           {
            var unitDesc = GetUnitDesc(data.data[0].detailVos[0].measurementUnit);
            deliveryDetails.push(new OutWareHouseDetailed(data.data[0].detailVos[i].itemLine,data.data[0].detailVos[i].materielCode,data.data[0].detailVos[i].materielDesc,data.data[0].detailVos[i].num,unitDesc,data.data[0].detailVos[i].unitPrice,data.data[0].detailVos[i].amount,data.data[0].detailVos[i].outPosition) );
            TotalAmount+=Number(parseFloat(data.data[0].detailVos[i].amount).toFixed(2));
           }
  
           temp=deliveryDetails.slice(0); 
           var arrCount = 0;
           if(type=="1")
           {
            if(temp.length>3)
            {
              arrCount = temp.length%3;
            }else{
              arrCount =3-temp.length;
            }
           }else{
            if(temp.length>20)
            {
              arrCount = temp.length%20;
            }else{
              arrCount =20-temp.length;
            }
           }
           if(arrCount!=0)
           {
             for(var i= 0;i<arrCount ;i++)
             {
               temp.push(new OutWareHouseDetailed('','','','','','','',''));
             }
           } 
           result=PageResult(temp,type);
           footData.push(smalltoBIG(TotalAmount.toFixed(2)));
           footData.push(TotalAmount.toFixed(2));
           footData.push(getNowFormatDate());
          }else{
   
           alert("明细为空，请检查 !");
          }
        
        console.log(deliveryHead);
        console.log(result);
        console.log(footData);
        datas.push(deliveryHead);
        datas.push(result);
        datas.push(footData);
         }
   
      
     },error: function () {
           alert("请求错误,请检查参数和接口");
        
         }
   });

   return datas;
}

//获取采购结算结算单
function GetPurchaseSettlementOrderDatas(purchaseCode,type)
{
 var deliveryHead = new Array();
 var deliveryDetails =new Array();
 var arr =new Array();
 var datas = new Array();
 var temp =new Array();
 var result =new Array();
 var footData = new Array();
 var TotalAmount=0;
 var NetTotalPrices=0;
 var AdValorems=0;
 var TaxAmounts=0;
 var EstimatedAmountOfMoneys=0;
 var AmountDifferences=0;

  $.ajax({
    url :IPDomain1+'/wms/PrintOrderResources/getPrintPurchaseSettlementVo?orderNo='+purchaseCode,
    dataType :'json',
    type : 'Get',
    async : false,
    success : function(data) {
        if(data.data.length>0){
            deliveryHead.push(checkVal(data.data[0].purchaseSettlementsCode));
            deliveryHead.push(checkVal(data.data[0].supplierCode));
            deliveryHead.push(checkVal(data.data[0].supplierName));
            deliveryHead.push(checkVal(data.data[0].settlementsDate));
            deliveryHead.push(checkVal(GetiNvoiceNumberDatas(purchaseCode)));
            for(var i=0;i<data.data[0].detailVos.length;i++)
            { 
              var netTotalPrice=Number(data.data[0].detailVos[i].totalNetPrice)
              NetTotalPrices+=Number(netTotalPrice.toFixed(2))
              AdValorems+=Number(Number(data.data[0].detailVos[i].totalTaxPrice).toFixed(2))
              TaxAmounts+=Number(Number(data.data[0].detailVos[i].taxPrice).toFixed(2))
              EstimatedAmountOfMoneys+=Number(Number(data.data[0].detailVos[i].estimateMoney).toFixed(2))
              AmountDifferences+=Number(Number(data.data[0].detailVos[i].amountDifferece).toFixed(2))
            var unitDesc = GetUnitDesc(data.data[0].detailVos[i].measurementUnit);
            deliveryDetails.push(new PurchaseSettlementDetailed(data.data[0].detailVos[i].number,data.data[0].detailVos[i].sapPurchaseSettlementsCode,data.data[0].detailVos[i].warehousingCode,data.data[0].detailVos[i].materielCode,data.data[0].detailVos[i].materielDesc,data.data[0].detailVos[i].num,unitDesc,data.data[0].detailVos[i].invoiceNetUnitPrice,data.data[0].detailVos[i].temporaryNetUnitPrice,data.data[0].detailVos[i].estimateMoney,data.data[0].detailVos[i].amountDifferece,data.data[0].detailVos[i].taxPrice,data.data[0].detailVos[i].totalTaxPrice,netTotalPrice));
            TotalAmount+=Number(parseFloat(data.data[0].detailVos[0].invoiceAmount).toFixed(2));
          
         
          }
          
          deliveryHead.push(TotalAmount.toFixed(2));
            temp=deliveryDetails.slice(0); 
            var arrCount = 0;
            if(type=="1")
            {
                if(temp.length>3)
                {
                  arrCount = temp.length%3;
                }else{
                  arrCount =3-temp.length;
                }
            }else{
                if(temp.length>20)
                {
                  arrCount = temp.length%20;
                }else{
                  arrCount =20-temp.length;
                }
            }
            if(arrCount!=0)
            {
              for(var i= 0;i<arrCount ;i++)
              {
                temp.push(new PurchaseSettlementDetailed('','','','','','','','','','','','','',''));
              }
            } 
        
         
            var flag=0;
           
            
          
            for(var a =0;a<temp.length;a+=20)
            {
              var number1 =0;//税额
              var number2 =0;//价税合计
              var number3 =0;//净总价
              var number4 =0;//暂估金额
              var abc =new Array();
              if(flag==0)
              {
                flag=20;
              }
              console.log(temp);
             console.log(a)
              for(var b=0+a;b<(flag+a<temp.length?flag+a:temp.length);b++)
              {
                console.log(temp[b].TaxAmount);
                //税额
                if(temp[b].TaxAmount=="")
                {
                  number1+=0;
                }else{
                  number1+=Number(Number(temp[b].TaxAmount).toFixed(2));
                 
                }
                //价税合计
                if(temp[b].AdValorem=="")
                {
                  number2+=0;
                }else{
                  number2+=Number(Number(temp[b].AdValorem).toFixed(2));
                }
                //经总价
                if(temp[b].NetTotalPrice=="")
                {
 
                  number3+=0;

                }else{
                  number3+=Number(Number(temp[b].NetTotalPrice).toFixed(2));
                }
                  
                //暂估金额
                if(temp[b].EstimatedAmountOfMoney=="")
                {
                  number4+=0;
                }else{
                  number4+=Number(Number(temp[b].EstimatedAmountOfMoney).toFixed(2));
                }

              }
              abc.push(number1.toFixed(2),number2.toFixed(2),number3.toFixed(2),number4).toFixed(2);
              arr.push(abc);
            }
            console.log(arr);
          result=PageResult(temp,type);
         
          footData.push(getNowFormatDate());
          datas.push(deliveryHead);
          datas.push(result);
          datas.push(footData);
          datas.push(arr);
          footData.push(NetTotalPrices.toFixed(2));
          footData.push(AdValorems.toFixed(2));
          footData.push(TaxAmounts.toFixed(2));
          footData.push(EstimatedAmountOfMoneys.toFixed(2));
          footData.push(AmountDifferences.toFixed(2));
           }   
  },error: function () {
        alert("请求错误,请检查参数和接口");
      }
 });

 return datas;
}

//获取移库入库单
function GetMoveInWareHouseOrderDatas(moveCode,type)
{
  var Heads = new Array();
  var Details =new Array();
  var datas =new Array();//返回数组
  var temp =new Array();
  var result =new Array();
  var footData =new Array();
  var TotalAmount =0;
  var postingDate=''
  $.ajax({
    url :IPDomain1+'/wms/InventoryMoveVo/findInventoryMoveVoByMoveCode?moveCode='+moveCode,
    dataType :'json',
    type : 'POST',
    async : false,
    success : function(data) {
     if(data.data.length>0){
  
         Heads.push(checkVal(data.data[0].moveCode));
         Heads.push(checkVal(data.data[0].sourceDocuments));
         Heads.push(checkVal(data.data[0].moveCreateDate));
         Heads.push(checkVal(GetSiteDesc(data.data[0].intoFactory,data.data[0].intoWarehouse)));//移入工厂描述
         Heads.push(checkVal(GetWareHouseDesc(data.data[0].intoFactory,data.data[0].intoWarehouse)));//移入仓库描述
         Heads.push(checkVal(GetSiteDesc(data.data[0].moveFactory,data.data[0].moveWarehouse)));//来源工厂
         Heads.push(checkVal(GetWareHouseDesc(data.data[0].moveFactory,data.data[0].moveWarehouse)));
         if(data.data[0].detailVos.length!=0)
         {
             for(var i=0;i<data.data[0].detailVos.length;i++)
             {
               var unitDesc =  GetUnitDesc(data.data[0].detailVos[i].measurementUnit);
                Details.push(new MoveWareHouseDetailed(data.data[0].detailVos[i].number,data.data[0].detailVos[i].materielCode,data.data[0].detailVos[i].materielDesc,data.data[0].detailVos[i].moveNum,unitDesc,data.data[0].detailVos[i].treasuryUnitPrice,data.data[0].detailVos[i].totalPrice,data.data[0].detailVos[i].intoStorageLocation));
                TotalAmount+=Number(parseFloat(data.data[0].detailVos[i].totalPrice).toFixed(2));
              }
           
             temp=Details.slice(0);
          
             var arrCount = 0;
             if(type=="1")
             {
              if(temp.length>3)
              {
                arrCount = temp.length%3;
              }else{
                arrCount =3-temp.length;
              }
             } else{

              if(temp.length>20)
              {
                arrCount = temp.length%20;
              }else{
                arrCount =20-temp.length;
              }
             }
            
             if(arrCount!=0)
             {
               for(var i= 0;i<arrCount ;i++)
               {
                 temp.push(new MoveWareHouseDetailed('','','','','','','',''));
               }
             } 
             result=PageResult(temp,type);
             footData.push(smalltoBIG(TotalAmount.toFixed(2)));
             footData.push(TotalAmount.toFixed(2));
             footData.push(getNowFormatDate());
             
             console.log(Heads);
             console.log(result);
             console.log(footData);
             datas.push(Heads)
             datas.push(result)
             datas.push(footData)
         }
     }
  },error: function () {
        alert("请求错误,请检查参数和接口"); 
      }
  });
  return datas;
}

//获取移库出库单
function GetMoveOutWareHouseOrderDatas(moveCode,type)
{
  var Heads = new Array();
  var Details =new Array();
  var datas =new Array();//返回数组
  var temp =new Array();
  var result =new Array();
  var footData =new Array();
  var TotalAmount =0;
  $.ajax({
    url :IPDomain1+'/wms/InventoryMoveVo/findInventoryMoveVoByMoveCode?moveCode='+moveCode,
    dataType :'json',
    type : 'POST',
    async : false,
    success : function(data) {
     if(data.data.length>0){
         Heads.push(checkVal(data.data[0].moveCode));
         Heads.push(checkVal(data.data[0].moveCreateDate));
         Heads.push(checkVal(GetSiteDesc(data.data[0].moveFactory,data.data[0].moveWarehouse)))//来源工厂
         Heads.push(checkVal(GetWareHouseDesc(data.data[0].moveFactory,data.data[0].moveWarehouse)))//来源工厂
         Heads.push(checkVal(GetSiteDesc(data.data[0].intoFactory,data.data[0].intoWarehouse)))//移入工厂描述
         Heads.push(checkVal(GetWareHouseDesc(data.data[0].intoFactory,data.data[0].intoWarehouse)))//移入仓库描述
         if(data.data[0].detailVos.length!=0)
         {
            console.log(data.data[0].detailVos);
             for(var i=0;i<data.data[0].detailVos.length;i++)
             {
               var unitDesc =  GetUnitDesc(data.data[0].detailVos[i].measurementUnit);
                Details.push(new MoveWareHouseDetailed(data.data[0].detailVos[i].number,
                  data.data[0].detailVos[i].materielCode,
                  data.data[0].detailVos[i].materielDesc,
                  data.data[0].detailVos[i].moveNum,
                  unitDesc,
                  data.data[0].detailVos[i].treasuryUnitPrice,
                  data.data[0].detailVos[i].totalPrice,
                  data.data[0].detailVos[i].moveStorageLocation));

                TotalAmount+=Number(parseFloat(data.data[0].detailVos[i].totalPrice).toFixed(2))
              }
           
             temp=Details.slice(0);
             var arrCount = 0;
             if(type=="1")
             {
              if(temp.length>3)
              {
                arrCount = temp.length%3;
              }else{
                arrCount =3-temp.length;
              }
             } else{

              if(temp.length>20)
              {
                arrCount = temp.length%20;
              }else{
                arrCount =20-temp.length;
              }
             }
            
             if(arrCount!=0)
             {
               for(var i= 0;i<arrCount ;i++)
               {
                 temp.push(new MoveWareHouseDetailed('','','','','','','',''));
               }
             } 
             result=PageResult(temp,type);
             footData.push(smalltoBIG(TotalAmount.toFixed(2)));
             footData.push(TotalAmount.toFixed(2));
             footData.push(getNowFormatDate());
             console.log(Heads);
             console.log(result);
             console.log(footData);
             datas.push(Heads)
             datas.push(result)
             datas.push(footData)
         }
     }
  },error: function () {
        alert("请求错误,请检查参数和接口"); 
      }
  });
  return datas;
}

//获取退料入库
function GetReturnWarehouseReceiptDatas(siteCode,code,type) {
  //无数据写不了
  var headData = new Array();
  var footData = new Array();
  var detaileds =new Array();
  var wareHouseDesc ="";
  var temp =new Array();
  var TotalAmount =0;
  var result =new Array();
  var datas =new Array();
  $.ajax({
      url: IPDomain1+'/wms/ReceiptResources/findWmReciptVoByWarehouseCode?warehouseCode='+ code,
      dataType: 'json',
      type: 'POST',
      async: false,
      success: function (data) {
          if (data.data.length > 0) {
              if (data.data[0].detailVos.length != 0) {
                  headData.push(checkVal(data.data[0].warehouseCode));
                  headData.push(checkVal(data.data[0].businessType));
                  headData.push(checkVal(data.data[0].movementType));
                  headData.push(checkVal(data.data[0].receiptCreateDate));
                  var WareHouseCode =checkVal(data.data[0].receiveWarehouse);
                  headData.push(checkVal(data.data[0].costCenter));
                  headData.push(checkVal(data.data[0].internalOrder));
                  if(""!=WareHouseCode)
                  {
                      wareHouseDesc =checkVal(GetWareHouseDesc(siteCode,warehouse));//获取仓库名称
                  }else{
                      wareHouseDesc="";
                  }
                  headData.push(checkVal(wareHouseDesc+"("+WareHouseCode+")"));
               
                  for (var i = 0; i < data.data[0].detailVos.length; i++) {
                      var unitDesc = GetUnitDesc(data.data[0].detailVos[i].measurementUnit);
                      detaileds.push(new ReturnInWareHouseDetailed(data.data[0].detailVos[i].item,data.data[0].detailVos[i].materielCode,
                      data.data[0].detailVos[i].materielDesc,data.data[0].detailVos[i].num,unitDesc,data.data[0].detailVos[i].noTaxUnitPrice,
                      data.data[0].detailVos[i].totalNetPrice,data.data[0].detailVos[i].receivePosition));
                      TotalAmount+=Math.round(data.data[0].detailVos[i].totalNetPrice * 100) / 100;
                  }
                  temp = detaileds.slice(0);
                  var arrCount = 0;
                  if (type == "1") {
                      if (temp.length > 3) {
                          arrCount = temp.length % 3;
                      } else {
                          arrCount = 3 - temp.length;
                      }
                  } else {
                      if (temp.length > 20) {
                          arrCount = temp.length % 20;
                      } else {
                          arrCount = 20 - temp.length;
                      }
                  }
                  if (arrCount != 0) {
                      for (var i = 0; i < arrCount; i++) {
                          temp.push(new ReturnInWareHouseDetailed('', '', '', '', '', '', '', '',''));
                      }
                  }
                  result = PageResult(temp, type);
                  footData.push(TotalAmount.toFixed(2));
                  footData.push(smalltoBIG(TotalAmount.toFixed(2)));
                  footData.push(getNowFormatDate());
                  datas.push(headData)
                  datas.push(result)
                  datas.push(footData)
              }
          }
      }, error: function () {
          alert("请求错误,请检查参数和接口");
      }
  });
  return datas;
}

//采购退货
function GetPurchaseOutWarehouseDatas(siteCode,purchaseOutWarehouseCode,type)
{
  var Heads = new Array();
  var Details =new Array();
  var datas =new Array();//返回数组
  var temp =new Array();
  var result =new Array();
  var footData =new Array();
  var TotalAmount =0;
  $.ajax({
    url :IPDomain1+'/wms/PrintOrderResources/getPrintWmPurchaseDeliveryVo?orderNo='+purchaseOutWarehouseCode,
    dataType :'json',
    type : 'GET',
    async : false,
    success : function(data) {
     if(data.data.length>0){
        
         Heads.push(checkVal(data.data[0].outWarehouseCode));
         Heads.push(checkVal(data.data[0].outWarehouseDate));
         Heads.push(checkVal(GetWareHouseDesc(siteCode,getWareHouse(purchaseOutWarehouseCode))))
         Heads.push(checkVal(data.data[0].supplierCode));
         Heads.push(checkVal(data.data[0].supplierName));
         Heads.push(checkVal(data.data[0].sourceDocuments));
         Heads.push(checkVal(data.data[0].businessType));
         Heads.push(checkVal(data.data[0].movementType));
         if(data.data[0].detailVos.length!=0)
         {
             for(var i=0;i<data.data[0].detailVos.length;i++)
             {
               var unitDesc =GetUnitDesc(data.data[0].detailVos[i].measurementUnit);
               //计算无税金额
                var noTaxAmount =Number(data.data[0].detailVos[i].num)*(Number(data.data[0].detailVos[i].unitPrice)/(1+Number(toPoint(data.data[0].detailVos[i].tax))));
                var taxAmount = noTaxAmount*Number(toPoint(data.data[0].detailVos[i].tax));
                var adValorem =noTaxAmount+(Number(data.data[0].detailVos[i].unitPrice)*Number(data.data[0].detailVos[i].num) - noTaxAmount);
                Details.push(new PurchaseOutWarehouseDetailed(data.data[0].detailVos[i].itemLine,data.data[0].detailVos[i].materielCode,data.data[0].detailVos[i].materielDesc,data.data[0].detailVos[i].applyNum,data.data[0].detailVos[i].num,unitDesc,data.data[0].detailVos[i].unitPrice,noTaxAmount.toFixed(2),taxAmount.toFixed(2),adValorem.toFixed(2),data.data[0].detailVos[i].outArea,data.data[0].detailVos[i].outPosition));
                TotalAmount+=Number(parseFloat(adValorem).toFixed(2));
              }
           
             temp=Details.slice(0);
             var arrCount = 0;
             if(type=="1")
             {
              if(temp.length>3)
              {
                arrCount = temp.length%3;
              }else{
                arrCount =3-temp.length;
              }
             } else{

              if(temp.length>20)
              {
                arrCount = temp.length%20;
              }else{
                arrCount =20-temp.length;
              }
             }
            
             if(arrCount!=0)
             {
               for(var i= 0;i<arrCount ;i++)
               {
                 temp.push(new PurchaseOutWarehouseDetailed('','','','','','','','','','','',''));
               }
             } 
             result=PageResult(temp,type);
             footData.push(smalltoBIG(TotalAmount.toFixed(2)));
             footData.push(TotalAmount.toFixed(2));
             footData.push(getNowFormatDate());
             console.log(Heads);
             console.log(result);
             console.log(footData);
             datas.push(Heads)
             datas.push(result)
             datas.push(footData)
         }
     }
  },error: function () {
        alert("请求错误,请检查参数和接口"); 
      }
  });
  return datas;

}

//获取发票号
function GetiNvoiceNumberDatas(purchaseSettlementsCode)
{
    //var purchaseSettlementsCode = "PS3007201810220005";
    //var params =new Array();
    var result ="";
    var strParams = {
        "factoryList": [],
        "invoiceNumber": "",
        "operationDateE":"",
        "operationDateS":"",
        "purchaseSettlementsCode": purchaseSettlementsCode,
        "sapPurchaseSettlementsCode": "",
        "supplierCode": ""
    }

     $.ajax({
       url :IPDomain1+'/wms/smPurchaseStatementsResources/getSettlementsHead?page=1&num=1',
       dataType :'json',
       type : 'POST',
       contentType: "application/json; charset=utf-8", 
       data:JSON.stringify(strParams),
       async : false,
       success : function(data) {
          if(data.content.length>0) 
          {
            result =data.content[0].invoiceNumber;
          }
     },error: function () {
           alert("请求错误,请检查参数和接口");
        
         }
   });
    
   return result;

}

//获取采购订单合同编码
function getProcurementContract(purchaseCode)
{
if(purchaseCode!=""||purchaseCode!=null)
{
  var cotractNum="";
  $.ajax({
    url :IPDomain1+'/wms/omPurchaseOrderHead/findPurchasaeOrderHeadByPurchaseCode?purchaseCode='+purchaseCode,
    dataType :'json',
    type : 'Get',
    async : false,
    success : function(data) {
     if(data.data.length>0){
         cotractNum=data.data[0].cotractNum; 
     }
  },error: function () {
        alert("请求错误,请检查参数和接口");
       
      }
  });
  return cotractNum ;
}else {
  alert("该订单为获取到合同号，请检查订单号后再重试！")
  return
}
}

//获取含税单价
function GetTaxPrice(purchaseCode,MaterielCode)
{
   var taxprice ="";
  $.ajax({
    url :IPDomain1+'/wms/omPurchaseOrderDetail/findAllByPurchaseHeadCodeAndMaterielCode?headCode='+purchaseCode+'&materielCode='+MaterielCode,
    dataType :'json',
    type : 'Get',
    async : false,
    success : function(data) {
     if(data.data.length>0){
    
      taxprice= data.data[0].taxPrice;
      
     }
  },error: function () {
        alert("请求错误,请检查参数和接口");
       
      }
  });
  return taxprice;
}

//获取仓库描述
function GetWareHouseDesc(siteCode,wareHouseCode)
{
  var arr =[];
  arr.push(siteCode);
  var post_data = {
    "enterpriseCode": "",
    "enterpriseName": "",
    "factoryCode": "",
    "factoryCodes": arr,
    "factoryName": "",
    "warehouseCode": wareHouseCode,
    "warehouseName": "",
    "warehouseType": ""
  };
  var wareHouseDesc ="";
  $.ajax({
    url :IPDomain2+'/bm/bmWarhouseProperties/findAllWarehouseByVo?page=1&size=1',
    dataType :'json',
    type : 'POST',
    contentType: "application/json; charset=utf-8", 
    data:JSON.stringify(post_data),
    async : false,
    success : function(data) {
     if(data.content.length>0){
      wareHouseDesc = data.content[0].warehouseName;
     }
  },error: function () {
        alert("请求错误,请检查参数和接口");
      }
  });
  return wareHouseDesc;
}

//工厂描述
function GetSiteDesc(siteCode,wareHouseCode)
{
  var arr =[];
  arr.push(siteCode);
  var post_data = {
    "enterpriseCode": "",
    "enterpriseName": "",
    "factoryCode": "",
    "factoryCodes": arr,
    "factoryName": "",
    "warehouseCode": wareHouseCode,
    "warehouseName": "",
    "warehouseType": ""
  };
  var siteDesc ="";
  $.ajax({
    url :IPDomain2+'/bm/bmWarhouseProperties/findAllWarehouseByVo?page=1&size=1',
    dataType :'json',
    type : 'POST',
    contentType: "application/json; charset=utf-8", 
    data:JSON.stringify(post_data),
    async : false,
    success : function(data) {
     if(data.content.length>0){
      siteDesc = data.content[0].factoryName;
     }
  },error: function () {
        alert("请求错误,请检查参数和接口");
      }
  });
  return siteDesc;
}

//获取单位描述
function GetUnitDesc(unit)
{
   var unitDesc ="";
  $.ajax({
    url :IPDomain1+'/wms/bmUnitProperties/getBaseUnitInfoByCode?code='+unit,
    dataType :'json',
    type : 'Get',
    async : false,
    success : function(data) {
     if(data.data.length>0)
     {
        unitDesc=data.data[0].other;
     }
  },error: function (error) {
      
       console.log(error);
      }
  });
  
  return unitDesc;
}

function GetPostDateTime(code)
{
  var result="";
  $.ajax({
    url :IPDomain1+'/wms/WmDeliveryOrderResources/findDetailHeadId?page=1&size=1&outWarehouseCode='+code,
    dataType :'json',
    type : 'Get',
    async : false,
    success : function(data) {
     if(data.content.length>0)
     {

      result=data.content[0].postingDate;
     }
  },error: function (error) {
      
       console.log(error);
      }
  });
 return result;
}

function GetCostCenter(code)
{
  var result="";
  $.ajax({
    url :IPDomain3+'/wms/SapCostcenterResources/findByCostcenterCode?costcenterCode='+code,
    dataType :'json',
    type : 'Get',
    async : false,
    success : function(data) {
     if(data.length>0)
     {
    
      result=data[0].costcenterDesc;
     }
  },error: function (error) {
      
       console.log(error);
      }
  });
 return result;
}


/** 数字金额大写转换(可以处理整数,小数,负数) */    
function smalltoBIG(n)     
   {    
       var fraction = ['角', '分'];    
       var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];    
       var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];    
       var head = n < 0? '欠': '';    
       n = Math.abs(n);    
     
       var s = '';    
     
       for (var i = 0; i < fraction.length; i++)     
       {    
           s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');    
       }    
       s = s || '整';    
       n = Math.floor(n);    
     
       for (var i = 0; i < unit[0].length && n > 0; i++)     
       {    
           var p = '';    
           for (var j = 0; j < unit[1].length && n > 0; j++)     
           {    
               p = digit[n % 10] + unit[1][j] + p;    
               n = Math.floor(n / 10);    
           }    
           s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;    
       }    
       return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');    
   }  

//获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

//明细分页
function PageResult (detaileds,type)
{
    var result =new Array();
    if(type=="1")
    {
        for(var i=0;i<detaileds.length;i+=3){
            result.push(detaileds.slice(i,i+3));
           }
           return result;
    }else {
        for(var i=0;i<detaileds.length;i+=20){
            result.push(detaileds.slice(i,i+20));
           }
           return result;
           
    }
}

//获取仓库（出库）
function getWareHouse(oderCode)
{
  var wareHouse ="";
  $.ajax({
    url :IPDomain1+'/wms/WmDeliveryOrderResources/findDetailHeadId?page=1&size=1&outWarehouseCode='+oderCode,
    dataType :'json',
    type : 'Get',
    async : false,
    success : function(data) {
     
      if(data.content.length>0)
      {
       wareHouse =data.content[0].outWarehouse;
      }


   
  },error: function () {
        alert("请求错误,请检查参数和接口");
     
      }
});

return wareHouse;
}


function GetRequest (code)
{
    var result ="";
    $.ajax({
      url :IPDomain1+'/wms/omPurchaseOrderHead/findPurchasaeOrderHeadByPurchaseCode?purchaseCode='+code,
      dataType :'json',
      type : 'GET',
      async : false,
      success : function(data) {
      if(data!=null)
      {
        result=data.data[0].purchaseVoucherno;
      }else{
        result="";
      }
    },error: function () {
        result=null;
        }
    });
    return result;
}

//校验值是否为空
function checkVal(value)
{
    var checkedVal ="";
     if(value==""||value==null||value==undefined)
     {
        checkedVal ="";
     }else {
        checkedVal=value;
     }
  return checkedVal;
}

//百分数转成小数
function toPoint(percent){
  var str=percent.replace("%","");
  str= str/100;
  return str;
}