
//验收入库打印
function  doWarehouseReceiptPrint(flag,department,siteCode,WarehousingOderCode,title,type)
{
  // var WarehousingOderCode='R3007201810240132';
  // var title ='abc';
  // var department = "采购部";
  // var siteCode="0050";
  // var type = "1"
  var InWareHouseDatas= GetInWarehouseOderDatas(siteCode,WarehousingOderCode,type);
  console.log(InWareHouseDatas)
  if(InWareHouseDatas.length==0)
  {
    alert("缺少打印数据，请重试！");
   return ;
  }
    var strHtml='<style type="text/css">table,table tr th, table tr td { border:1px solid ; } table{border-collapse:collapse;}</style>'
    +'<table border="0" width="100%" cellspacing="0" cellpadding="0" text-align:center>'
    +'         <tr style="height: 15mm">'
    +'               <td align="center" style="font-size: 4mm; font-weight: bold"  colspan="11" >'+title+'物资入库单</td>'
    +'         </tr>'
    +'         <tr style="font-size: 3mm;height: 5mm">'
    +'               <td align="center" width="10%">单号：</td>'
    +'               <td colspan="10">'+InWareHouseDatas[0][0]+'</td>'
    +'         </tr>'
    +'         <tr style="font-size: 3mm;height: 5mm">'
    +'                 <td align="center" width="10%">部门：</td>'
    +'                 <td colspan="2">'+department+'</td>'
    +'                 <td align="center"width="10%">过账日期：</td>'
    +'                 <td colspan="4">'+InWareHouseDatas[0][1]+'</td>'
    +'                 <td align="center"width="10%">仓库：</td>'
    +'                 <td colspan="2">'+InWareHouseDatas[0][3]+'</td>'
    +'         </tr>'
    +'         <tr style="font-size: 3mm;height: 5mm;">'
    +'                 <td align="center" width="10%">供应商编码：</td>'
    +'                 <td colspan="2">'+InWareHouseDatas[0][4]+'</td>'
    +'                 <td align="center"width="10%">供应商名称：</td>'
    +'                 <td colspan="4">'+InWareHouseDatas[0][5]+'</td>'
    +'                 <td align="center"width="10%">合同编号：</td>'
    +'                 <td colspan="2">'+InWareHouseDatas[0][6]+'</td>'
    +'         </tr>'
    +'         <tr style="font-size: 3mm;height: 5mm">'
    +'                 <td align="center" width="10%">业务类型：</td>'
    +'                 <td colspan="2">'+InWareHouseDatas[0][7]+'</td>'
    +'                 <td align="center"width="10%">移动类型：</td>'
    +'                 <td colspan="4">'+InWareHouseDatas[0][8]+'</td>'
    +'                 <td align="center"width="10%">SAP订单号：</td>'
    +'                 <td colspan="2">'+InWareHouseDatas[0][9]+'</td>'
    +'         </tr>'
    +'         <tr style="font-size: 3mm;height:10mm">'
    +'                 <td align="center" >行项目</td>'
    +'                 <td align="center">物料编码</td>'
    +'                 <td align="center">物料短描述</td>'
    +'                 <td align="center">应收数量</td>'
    +'                 <td align="center">实收数量</td>'
    +'                 <td align="center">计量单位</td>'
    +'                 <td align="center">单价</td>'
    +'                 <td align="center">无税金额</td>'
    +'                 <td align="center">税额</td>'
    +'                 <td align="center">价税合计</td>'
    +'                 <td align="center">货位号</td>'
    +'         </tr>' ;

    var footHtml =' <tr  style="font-size: 3mm;height: 5mm">'
    +'                 <td colspan="7">价税合计（大写）: '+InWareHouseDatas[2][0]+' </td>'
    +'                 <td  colspan="4">¥ : '+InWareHouseDatas[2][1]+'  </td></tr>'
    +'                 <tr  style="font-size: 3mm;height: 5mm">'
    +'                 <td>备注:</td>'
    +'                 <td colspan="10"></td></tr>'
    +'                 <tr  style="font-size: 3mm;height: 5mm">'
    +'                 <td colspan="2" >采购:</td>'
    +'                 <td colspan="2">验收:</td>'
    +'                 <td colspan="2">仓管:</td>'
    +'                 <td colspan="2">财务:</td>'
    +'                 <td colspan="3">单据打印日期: '+InWareHouseDatas[2][2]+'</td>'
    +'         </tr></table>' ;

    LODOP.PRINT_INIT(type+"InWareHouseOrder"); // 打印初始化
    if(type == "1")
    {
      LODOP.SET_PRINT_PAGESIZE(1,'240mm','95mm',''); // 设置纸张大小
    }else{

      LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4"); // 设置纸张大小
    }
   
    for(var i=0;i<InWareHouseDatas[1].length;i++)
    {
      var ht=strHtml;
      var htms='';
       for(var j=0;j<InWareHouseDatas[1][i].length;j++)
       {
        htms +='<tr style="font-size: 3mm;height: 5mm">'
        +'                 <td align="center">'+InWareHouseDatas[1][i][j].Id+'</td>'
        +'                 <td align="center">'+InWareHouseDatas[1][i][j].MaterielCode+'</td>'
        +'                 <td align="center">'+InWareHouseDatas[1][i][j].MaterielDesc+'</td>'
        +'                 <td align="center">'+InWareHouseDatas[1][i][j].AmountReceivable+'</td>'
        +'                 <td align="center">'+InWareHouseDatas[1][i][j].CollectionQuantity+'</td>'
        +'                 <td align="center">'+InWareHouseDatas[1][i][j].MeasurementUnit+'</td>'
        +'                 <td align="center">'+InWareHouseDatas[1][i][j].UnitPrice+'</td>'
        +'                 <td align="center">'+InWareHouseDatas[1][i][j].TaxFreeAmount+'</td>'
        +'                 <td align="center">'+InWareHouseDatas[1][i][j].TaxAmount+'</td>'
        +'                 <td align="center">'+InWareHouseDatas[1][i][j].AdValorem+'</td>'
        +'                 <td align="center">'+InWareHouseDatas[1][i][j].FreightNumber+'</td>'
        +'         </tr>' 
       }
       ht+=htms+footHtml;
       LODOP.NewPage();
       LODOP.ADD_PRINT_TABLE("1mm","2%",'96%','100%',ht);// 增加表格打印项（超文本模式）
       ht="";
    }
      LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
      if(type == "1")
      {
        LODOP.ADD_PRINT_TEXT(310,720,200,20,"第#页/共&页"); //加纯文本打印项
      }else{
  
        LODOP.ADD_PRINT_TEXT(650,720,200,20,"第#页/共&页"); //加纯文本打印项
      }
   
      LODOP.SET_PRINT_STYLEA(0,"ItemType",2); // 设置打印项风格
      LODOP.SET_PRINT_STYLEA(0,"Horient",1);
      if(flag==1)
      {
        LODOP.PRINT();
      }else{
        LODOP.PREVIEW(); 
      }
     
}      

//领用出库打印
function doWareHouseDeliveryPrint(flag,department,siteCode,WarehousingOderCode,title,type)
{
  // var WarehousingOderCode ="C3007201812200006";
  // var title ="abc"
  // var department ="采购部";
  // var siteCode ="0050";
  // var type ="0";
  var OutWareHouseDatas=GetOutWarehouseOrderDatas(siteCode,WarehousingOderCode,type);
  console.log(OutWareHouseDatas);
  if(OutWareHouseDatas.length==0)
  {
    alert("缺少打印数据，请重试！");
   return ;
  }
  
    var strHtml='<style type="text/css">table,table tr th, table tr td { border:1px solid ; } table{border-collapse:collapse;}</style>'
    +'<table border="0" width="100%" cellspacing="0" cellpadding="0" text-align:center>'
    +'         <tr style="height: 15mm">'
    +'               <td align="center" style="font-size: 4mm; font-weight: bold"  colspan="8" >'+title+'物资出库单</td>'
    +'         </tr>'
    +'         <tr style="font-size: 3mm;height: 5mm">'
    +'               <td align="center" width="10%">单号：</td>'
    +'               <td colspan="7">'+OutWareHouseDatas[0][0]+'</td>'
    +'         </tr>'
    +'         <tr style="font-size: 3mm;height: 5mm">'
    +'                 <td align="center" width="10%">领用部门：</td>'
    +'                 <td >'+OutWareHouseDatas[0][8]+'</td>'
    +'                 <td align="center"width="10%">成本中心:</td>'
    +'                 <td colspan="2">'+OutWareHouseDatas[0][2]+'</td>'
    +'                 <td align="center"width="10%">出库日期:</td>'
    +'                 <td colspan="2">'+OutWareHouseDatas[0][3]+'</td>'
    +'         </tr>'
    +'         <tr style="font-size: 3mm;height: 5mm">'
    +'                 <td align="center" width="10%">业务类型:</td>'
    +'                 <td >'+OutWareHouseDatas[0][4]+'</td>'
    +'                 <td align="center"width="10%">移动类型:</td>'
    +'                 <td colspan="2">'+OutWareHouseDatas[0][5]+'</td>'
    +'                 <td align="center"width="10%">发货仓库:</td>'
    +'                 <td colspan="2">'+OutWareHouseDatas[0][6]+'</td>'
    +'         </tr>'
    +'         <tr style="font-size: 3mm;height: 5mm">'
    +'                <td align="center" width="10%">内部订单号:</td>'
    +'                 <td >'+OutWareHouseDatas[0][7]+'</td>'
    +'                <td align="center" width="10%">生产订单:</td>'
    +'                 <td colspan="2">'+OutWareHouseDatas[0][9]+'</td>'
    +'                <td align="center" width="10%">采购订单:</td>'
    +'                 <td colspan="2">'+OutWareHouseDatas[0][10]+'</td>'
    +'         </tr>'
    +'         <tr style="font-size: 3mm;height:10mm">'
    +'                 <td align="center" width="10%">行项目</td>'
    +'                 <td align="center" width="10%">物料编码</td>'
    +'                 <td align="center" width="30%">物料描述</td>'
    +'                 <td align="center" width="10%">数量</td>'
    +'                 <td align="center" width="10%">计量单位</td>'
    +'                 <td align="center" width="10%">单价</td>'
    +'                 <td align="center" width="10%">总金额</td>'
    +'                 <td align="center" width="10%">货位</td>'
    +'         </tr>' ;
    var footHtml =' <tr  style="font-size: 3mm;height: 5mm">'
    +'                 <td colspan="4">合计（大写）: '+OutWareHouseDatas[2][0]+' </td>'
    +'                 <td colspan="4">¥ : '+OutWareHouseDatas[2][1]+'</td></tr>'
    +'                 <tr  style="font-size: 3mm;height: 5mm">'
    +'                 <td>备注:</td>'
    +'                 <td colspan="7">'+OutWareHouseDatas[2][3]+'</td></tr>'
    +'                 <tr  style="font-size: 3mm;height: 5mm">'
    +'                 <td colspan="2" >库管员:</td>'
    +'                 <td colspan="2">领料员:</td>'
    +'                 <td colspan="2">财务:</td>'
    +'                 <td colspan="2">单据打印日期: '+OutWareHouseDatas[2][2]+'</td>'
    +'         </tr></table>' ;

    

    LODOP.PRINT_INIT(type+"OutWareHouseOrder"); // 打印初始化
    if(type == "1")
    {
      LODOP.SET_PRINT_PAGESIZE(1,'240mm','95mm',''); // 设置纸张大小
    }else{

      LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4"); // 设置纸张大小
    }
    //LODOP.SET_PRINT_PAGESIZE(0,'240mm','94mm',''); // 设置纸张大小
  
    for(var i=0;i<OutWareHouseDatas[1].length;i++)
    {
      var ht=strHtml;
      var htms='';
       for(var j=0;j<OutWareHouseDatas[1][i].length;j++)
       {
        htms +='<tr style="font-size: 3mm;height: 5mm">'
        +'                 <td align="center">'+OutWareHouseDatas[1][i][j].Id+'</td>'
        +'                 <td align="center">'+OutWareHouseDatas[1][i][j].MaterielCode+'</td>'
        +'                 <td align="center">'+OutWareHouseDatas[1][i][j].MaterielDesc.substring(0,40)+'</td>'
        +'                 <td align="center">'+OutWareHouseDatas[1][i][j].Num+'</td>'
        +'                 <td align="center">'+OutWareHouseDatas[1][i][j].MeasurementUnit+'</td>'
        +'                 <td align="center">'+OutWareHouseDatas[1][i][j].UnitPrice+'</td>'
        +'                 <td align="center">'+OutWareHouseDatas[1][i][j].Amount+'</td>'
        +'                 <td align="center">'+OutWareHouseDatas[1][i][j].OutPosition+'</td>'
        +'         </tr>' 
       }
       ht+=htms+footHtml;
       LODOP.NewPage();
       LODOP.ADD_PRINT_TABLE("1mm","2%",'96%','100%',ht);// 增加表格打印项（超文本模式）
       ht="";
    }
    LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
    if(type == "1")
      {
        LODOP.ADD_PRINT_TEXT(310,720,200,20,"第#页/共&页"); //加纯文本打印项
      }else{
  
        LODOP.ADD_PRINT_TEXT(650,720,200,20,"第#页/共&页"); //加纯文本打印项
      }
    LODOP.SET_PRINT_STYLEA(0,"ItemType",2); //设置打印项风格
    LODOP.SET_PRINT_STYLEA(0,"Horient",1);
    //LODOP.SET_PREVIEW_WINDOW('1','1','0','1024','768','单据打印.打印');
   //1是批导
    if(flag==1)
    {
      LODOP.PRINT();
    }else{
      LODOP.PREVIEW(); 
    }
  }


//销售出库
function doSaleWareHouseDeliveryPrint(flag,siteCode,WarehousingOderCode,title,type)
{
  // var WarehousingOderCode ="R3007201810240132";
  // var title ="abc"
  // var siteCode ="0050";
  // var type ="0";
  var SaleOutWareHouseDatas=GetSaleOutWarehouseOrderDatas(siteCode,WarehousingOderCode,type);
  if(SaleOutWareHouseDatas.length==0)
  {
    alert("缺少打印数据，请重试！");
   return ;
  }

  var strHtml='<style type="text/css">table,table tr th, table tr td { border:1px solid ; } table{border-collapse:collapse;}</style>'
  +'<table border="0" width="100%" cellspacing="0" cellpadding="0" text-align:center>'
  +'         <tr style="height: 15mm">'
  +'               <td align="center" style="font-size: 4mm; font-weight: bold"  colspan="8" >'+title+'销售出库单</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm">'
  +'               <td align="center" width="10%">单号：</td>'
  +'               <td colspan="7">'+SaleOutWareHouseDatas[0][0]+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm">'
  +'                 <td align="center" width="10%">客户名称:</td>'
  +'                 <td >'+SaleOutWareHouseDatas[0][1]+'</td>'
  +'                 <td align="center"width="10%">发货仓库:</td>'
  +'                 <td colspan="2">'+SaleOutWareHouseDatas[0][2]+'</td>'
  +'                 <td align="center"width="10%">出库日期:</td>'
  +'                 <td colspan="2">'+SaleOutWareHouseDatas[0][3]+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm">'
  +'                 <td align="center" width="10%">客户代码:</td>'
  +'                 <td  colspan="3">'+SaleOutWareHouseDatas[0][4]+'</td>'
  +'                 <td align="center"width="10%">销售订单号:</td>'
  +'                 <td colspan="3">'+SaleOutWareHouseDatas[0][5]+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm">'
  +'                <td align="center" width="10%">移动类型:</td>'
  +'                 <td colspan="7">'+SaleOutWareHouseDatas[0][6]+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height:10mm">'
  +'                 <td align="center">行项目</td>'
  +'                 <td align="center">物料编码</td>'
  +'                 <td align="center">物料描述</td>'
  +'                 <td align="center">数量</td>'
  +'                 <td align="center">计量单位</td>'
  +'                 <td align="center">单价</td>'
  +'                 <td align="center">总金额</td>'
  +'                 <td align="center">货位</td>'
  +'         </tr>' ;

    var footHtml =' <tr  style="font-size: 3mm;height: 5mm">'
    +'                 <td colspan="4">价税合计（大写）: '+SaleOutWareHouseDatas[2][0]+' </td>'
    +'                 <td colspan="4">¥ : '+SaleOutWareHouseDatas[2][1]+'</td></tr>'
    +'                 <tr  style="font-size: 3mm;height: 5mm">'
    +'                 <td>备注:</td>'
    +'                 <td colspan="7"></td></tr>'
    +'                 <tr  style="font-size: 3mm;height: 5mm">'
    +'                 <td colspan="2" >库管员:</td>'
    +'                 <td colspan="2">领料员:</td>'
    +'                 <td colspan="2">财务:</td>'
    +'                 <td colspan="2">单据打印日期: '+SaleOutWareHouseDatas[2][2]+'</td>'
    +'         </tr></table>' ;

    

    LODOP.PRINT_INIT(type+"SaleOutWareHouseOrder"); // 打印初始化
    if(type == "1")
    {
      LODOP.SET_PRINT_PAGESIZE(1,'240mm','95mm',''); // 设置纸张大小
    }else{

      LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4"); // 设置纸张大小
    }
    //LODOP.SET_PRINT_PAGESIZE(0,'240mm','94mm',''); // 设置纸张大小
  
    for(var i=0;i<SaleOutWareHouseDatas[1].length;i++)
    {
      var ht=strHtml;
      var htms='';
       for(var j=0;j<SaleOutWareHouseDatas[1][i].length;j++)
       {
        htms +='<tr style="font-size: 3mm;height: 5mm">'
        +'                 <td align="center">'+SaleOutWareHouseDatas[1][i][j].Id+'</td>'
        +'                 <td align="center">'+SaleOutWareHouseDatas[1][i][j].MaterielCode+'</td>'
        +'                 <td align="center">'+SaleOutWareHouseDatas[1][i][j].MaterielDesc+'</td>'
        +'                 <td align="center">'+SaleOutWareHouseDatas[1][i][j].Num+'</td>'
        +'                 <td align="center">'+SaleOutWareHouseDatas[1][i][j].MeasurementUnit+'</td>'
        +'                 <td align="center">'+SaleOutWareHouseDatas[1][i][j].UnitPrice+'</td>'
        +'                 <td align="center">'+SaleOutWareHouseDatas[1][i][j].Amount+'</td>'
        +'                 <td align="center">'+SaleOutWareHouseDatas[1][i][j].OutPosition+'</td>'
        +'         </tr>' 
       }
       ht+=htms+footHtml;
       LODOP.NewPage();
       LODOP.ADD_PRINT_TABLE("1mm","2%",'96%','100%',ht);// 增加表格打印项（超文本模式）
       ht="";
    }
    LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
    if(type == "1")
      {
        LODOP.ADD_PRINT_TEXT(310,720,200,20,"第#页/共&页"); //加纯文本打印项
      }else{
  
        LODOP.ADD_PRINT_TEXT(650,720,200,20,"第#页/共&页"); //加纯文本打印项
      }
    LODOP.SET_PRINT_STYLEA(0,"ItemType",2); //设置打印项风格
    LODOP.SET_PRINT_STYLEA(0,"Horient",1);
    //LODOP.SET_PREVIEW_WINDOW('1','1','0','1024','768','单据打印.打印');
    if(flag==1)
    {
      LODOP.PRINT();
    }else{
      LODOP.PREVIEW(); 
    }   
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
//采购结算单

function doPurchaseSettlementPrint(flag,WarehousingOderCode,title,type,suck)
{

  // var WarehousingOderCode ="PS3007201810220005";
  // var tltie ="123";
  // var type="0";
  var PurchaseSettlementDatas=GetPurchaseSettlementOrderDatas(WarehousingOderCode,type);
  if(PurchaseSettlementDatas.length==0)
  {
    alert("缺少打印数据，请重试！");
    return;
  }
 var strHtml='<style type="text/css">table,table tr th, table tr td { border:1px solid ; } table{border-collapse:collapse;}</style>'
  +'<table border="0" width="100%" cellspacing="0" cellpadding="0" text-align:center>'
  +'         <tr style="height: 15mm">'
  +'              <td align="center" style="font-size: 4mm; font-weight: bold"  colspan="15" >'+title+'采购结算单</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm">'
  +'               <td align="center" width="10%" colspan="2">结算单号：</td>'
  +'                <td colspan="3">'+PurchaseSettlementDatas[0][0]+'</td>'
  +'               <td align="center" width="10%" colspan="2">发票号：</td>'
  +'                <td colspan="4">'+PurchaseSettlementDatas[0][4]+'</td>'
  +'               <td align="center" width="10%">发票总额：</td>'
  +'                <td colspan="3">'+suck+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm">'
  +'                 <td align="center" width="20%" colspan="2">供应商编码:</td>'
  +'                 <td colspan="3"  width="35%">'+PurchaseSettlementDatas[0][1]+'</td>'
  +'                <td align="center"width="10%" colspan="2">供应商名称:</td>'
  +'                <td colspan="3"  width="20%">'+PurchaseSettlementDatas[0][2]+'</td>'
  +'                 <td align="center"width="5%">结算日期:</td>'
  +'                <td colspan="5"  width="10%">'+PurchaseSettlementDatas[0][3]+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height:10mm">'
  +'                 <td align="center">行项目</td>'
  +'                 <td align="center">采购订单号</td>'
  +'                 <td align="center">入库单号</td>'
  +'                 <td align="center">物料编号</td>'
  +'                 <td align="center">物料名称</td>'
  +'                 <td align="center">数量</td>s'
  +'                 <td align="center">单位</td>'
  +'                 <td align="center">发票净单价</td>'
  +'                 <td align="center">净总价</td>'
  +'                 <td align="center">暂估净单价</td>'
  +'                 <td align="center">暂估金额</td>'
  +'                 <td align="center">金额差</td>'
  +'                 <td align="center">税额</td>'
  +'                 <td align="center">价税合计</td>'

  +'         </tr>' ;
  console.log(PurchaseSettlementDatas)
  var footHtml =' <tr  style="font-size: 3mm;height: 5mm">'
 
  +'                 <td colspan="1">税额(总和):</td>'
  +'                 <td colspan="1">'+PurchaseSettlementDatas[2][3]+'</td>'
  +'                 <td colspan="1"></td>'
  +'                 <td colspan="1">价税合计(总和):</td>'
  +'                 <td colspan="1">'+PurchaseSettlementDatas[2][2]+'</td>'
  +'                 <td colspan="1">净总价(总和):</td>'
  +'                 <td colspan="2">'+PurchaseSettlementDatas[2][1]+'</td>'
  +'                 <td colspan="1">暂估金额(总和):</td>'
  +'                 <td colspan="2">'+PurchaseSettlementDatas[2][4]+'</td>'
  +'                 <td colspan="1">金额差(总和):</td>'
  +'                 <td colspan="2">'+PurchaseSettlementDatas[2][5]+'</td></tr>'
  +' <tr  style="font-size: 3mm;height: 5mm">'
 
  +'                 <td colspan="1">税额(总和):</td>'
  +'                 <td colspan="1">'+smalltoBIG(PurchaseSettlementDatas[2][3])+'</td>'
  +'                 <td colspan="1"></td>'
  +'                 <td colspan="1">价税合计(总和):</td>'
  +'                 <td colspan="1">'+smalltoBIG(PurchaseSettlementDatas[2][2])+'</td>'
  +'                 <td colspan="1">净总价(总和):</td>'
  +'                 <td colspan="2">'+smalltoBIG(PurchaseSettlementDatas[2][1])+'</td>'
  +'                 <td colspan="1">暂估金额(总和):</td>'
  +'                 <td colspan="2">'+smalltoBIG(PurchaseSettlementDatas[2][4])+'</td>'
  +'                 <td colspan="1">金额差(总和):</td>'
  +'                 <td colspan="2">'+smalltoBIG(PurchaseSettlementDatas[2][5])+'</td></tr>'
  +'                 <tr  style="font-size: 3mm;height: 5mm">'
  +'                 <td>备注:</td>'
  +'                 <td colspan="13"></td></tr>'
  +'                 <tr  style="font-size: 3mm;height: 5mm">'
  +'                 <td colspan="8" >库管员:</td>'
  +'                 <td colspan="6">单据打印日期: '+PurchaseSettlementDatas[2][0]+'</td>'
  +'         </tr></table>' ;
  
    LODOP.PRINT_INIT(type+"smallpruchase"); // 打印初始化
    //LODOP.SET_PRINT_PAGESIZE(2,0,0,"A4"); // 设置纸张大小
    
    if(type == "1")
    {
      LODOP.SET_PRINT_PAGESIZE(1,'240mm','95mm',''); // 设置纸张大小
    }else{

      LODOP.SET_PRINT_PAGESIZE(2,0,0,"A4"); // 设置纸张大小
    }
  
      
    for(var i=0;i<PurchaseSettlementDatas[1].length;i++)
    {
      var ht=strHtml;
      var htms='';
      var htmsfoot='';
       for(var j=0;j<PurchaseSettlementDatas[1][i].length;j++)
       {
        console.log(PurchaseSettlementDatas[1][i][j].TotalNetPrice)
        console.log(PurchaseSettlementDatas[1][i][j].TaxPrice)
        htms +='<tr style="font-size: 3mm;height: 5mm">'
        +'                 <td align="center">'+PurchaseSettlementDatas[1][i][j].Id+'</td>'
        +'                 <td align="center">'+PurchaseSettlementDatas[1][i][j].PurchaseItem+'</td>'
        +'                 <td align="center">'+PurchaseSettlementDatas[1][i][j].WarehousingCode+'</td>'
        +'                 <td align="center">'+PurchaseSettlementDatas[1][i][j].MaterielCode+'</td>'
        +'                 <td align="center">'+PurchaseSettlementDatas[1][i][j].MaterielDesc+'</td>'
        +'                 <td align="center">'+PurchaseSettlementDatas[1][i][j].Num+'</td>'
        +'                 <td align="center">'+PurchaseSettlementDatas[1][i][j].MeasurementUnit+'</td>'
        +'                 <td align="center">'+checkValue(PurchaseSettlementDatas[1][i][j].MeasurementUnit,Number(PurchaseSettlementDatas[1][i][j].NetPrice).toFixed(2))+'</td>'
        +'                 <td align="center">'+PurchaseSettlementDatas[1][i][j].NetTotalPrice+'</td>'
        +'                 <td align="center">'+checkValue(PurchaseSettlementDatas[1][i][j].MeasurementUnit,Number(PurchaseSettlementDatas[1][i][j].ProvisionalNetUnitprice).toFixed(2))+'</td>'
        +'                 <td align="center">'+checkValue(PurchaseSettlementDatas[1][i][j].MeasurementUnit,Number(PurchaseSettlementDatas[1][i][j].EstimatedAmountOfMoney).toFixed(2))+'</td>'
        +'                 <td align="center">'+checkValue(PurchaseSettlementDatas[1][i][j].MeasurementUnit,Number(PurchaseSettlementDatas[1][i][j].AmountDifference).toFixed(2))+'</td>'
        +'                 <td align="center">'+PurchaseSettlementDatas[1][i][j].TaxAmount+'</td>'
        +'                 <td align="center">'+checkValue(PurchaseSettlementDatas[1][i][j].MeasurementUnit,Number(PurchaseSettlementDatas[1][i][j].AdValorem).toFixed(2))+'</td>'
        
        +'         </tr>' 
        
       }
       htms+='<tr style="font-size: 3mm;height: 5mm">'
       +'                 <td colspan="1" align="center">税额小计</td>'
       +'                 <td colspan="2" align="center">'+PurchaseSettlementDatas[3][i][0]+'</td>'
       +'                 <td colspan="1" align="center">价税小计</td>'
       +'                 <td colspan="1" align="center">'+PurchaseSettlementDatas[3][i][1]+'</td>'
       +'                 <td colspan="1" align="center">净总价小计</td>'
       +'                 <td colspan="2" align="center">'+PurchaseSettlementDatas[3][i][2]+'</td>'
       +'                 <td colspan="1" align="center">暂估金额小计</td>'
       +'                 <td colspan="2" align="center">'+PurchaseSettlementDatas[3][i][3]+'</td>'
       +'         </tr>' 
       
       ht+=htms+footHtml;
       LODOP.NewPage();
       LODOP.ADD_PRINT_TABLE("1mm","2%",'96%','100%',ht);// 增加表格打印项（超文本模式）
       ht="";
    }
      LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
      if(type == "1")
      {
        LODOP.ADD_PRINT_TEXT(310,720,200,20,"第#页/共&页"); //加纯文本打印项
      }else{
  
        LODOP.ADD_PRINT_TEXT(650,720,200,20,"第#页/共&页"); //加纯文本打印项
      }
      LODOP.SET_PRINT_STYLEA(0,"ItemType",2); //设置打印项风格
      LODOP.SET_PRINT_STYLEA(0,"Horient",1);
     // LODOP.SET_PREVIEW_WINDOW('1','1','0','1024','768','单据打印.打印');
     if(flag==1)
     {
       LODOP.PRINT();
     }else{
       LODOP.PREVIEW(); 
     }
}

//移库入库
function doMoveWarehouseReceiptPrint(flag,moveCode,type,title)
{
  // var moveCode ="YRX00220181016001";
  // var type ="1";
 var MoveInWareHouseDatas = GetMoveInWareHouseOrderDatas(moveCode,type);
 if(MoveInWareHouseDatas.length==0)
 {
  alert("缺少打印数据，请重试！");
  return;
 }
  var strHtml='<style type="text/css">table,table tr th, table tr td { border:1px solid ; } table{border-collapse:collapse;}</style>'
  +'<table border="0" width="100%" cellspacing="0" cellpadding="0" text-align:center>'
  +'         <tr style="height: 15mm">'
  +'                <td align="center" style="font-size: 4mm; font-weight: bold"  colspan="8" >'+title+'移库出库</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm">'
  +'               <td align="center" width="10%">单号：</td>'
  +'               <td colspan="2">'+MoveInWareHouseDatas[0][0]+'</td>'
  +'              <td align="center" width="10%">来源单号：</td>'
  +'               <td colspan="2">'+MoveInWareHouseDatas[0][1]+'</td>'
  +'              <td align="center" width="10%">入库日期：</td>'
  +'               <td >'+MoveInWareHouseDatas[0][2]+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm">'
  +'                 <td align="center" width="10%">入库工厂：</td>'
  +'                 <td>'+MoveInWareHouseDatas[0][3]+'</td>'
  +'                 <td align="center"width="10%">调入仓库:</td>'
  +'                 <td >'+MoveInWareHouseDatas[0][4]+'</td>'
  +'                 <td align="center"width="10%">来源工厂:</td>'
  +'                 <td >'+MoveInWareHouseDatas[0][5]+'</td>'
  +'                 <td align="center"width="10%">来源仓库:</td>'
  +'                 <td >'+MoveInWareHouseDatas[0][6]+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height:10mm">'
  +'                 <td align="center">行项目</td>'
  +'                 <td align="center">物料编码</td>'
  +'                 <td align="center">物料描述</td>'
  +'                 <td align="center">数量</td>'
  +'                 <td align="center">计量单位</td>'
  +'                 <td align="center">单价</td>'
  +'                 <td align="center">总金额</td>'
  +'                 <td align="center">货位</td>'
  +'         </tr>' ;

  var footHtml =' <tr  style="font-size: 3mm;height: 5mm">'
  +'                  <td colspan="4">总金额（大写）: '+MoveInWareHouseDatas[2][0]+'</td>'
  +'                  <td colspan="4">¥: '+MoveInWareHouseDatas[2][1]+'</td></tr>'
  +'                 <tr  style="font-size: 3mm;height: 5mm">'
  +'                 <td>备注:</td>'
  +'                 <td colspan="7"></td></tr>'
  +'                 <tr  style="font-size: 3mm;height: 5mm">'
  +'                <td colspan="4" >库管员:</td>'
  +'                 <td colspan="4">单据打印日期: '+MoveInWareHouseDatas[2][2]+'</td>'
  +'         </tr></table>' ;

  LODOP.PRINT_INIT(type+"MoveInWareHouseOrder"); // 打印初始化
    //LODOP.SET_PRINT_PAGESIZE(2,0,0,"A4"); // 设置纸张大小
    
    if(type == "1")
    {
      LODOP.SET_PRINT_PAGESIZE(1,'240mm','95mm',''); // 设置纸张大小
    }else{

      LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4"); // 设置纸张大小
    }
  
      
  for(var i=0;i<MoveInWareHouseDatas[1].length;i++)
  {
    var ht=strHtml;
    var htms='';
     for(var j=0;j<MoveInWareHouseDatas[1][i].length;j++)
     {
      htms +='<tr style="font-size: 3mm;height: 5mm">'
      +'                 <td align="center">'+MoveInWareHouseDatas[1][i][j].Id+'</td>'
      +'                 <td align="center">'+MoveInWareHouseDatas[1][i][j].MaterielCode+'</td>'
      +'                 <td align="center">'+MoveInWareHouseDatas[1][i][j].MaterielDesc+'</td>'
      +'                 <td align="center">'+MoveInWareHouseDatas[1][i][j].CollectionQuantity+'</td>'
      +'                 <td align="center">'+MoveInWareHouseDatas[1][i][j].MeasurementUnit+'</td>'
      +'                 <td align="center">'+MoveInWareHouseDatas[1][i][j].UnitPrice+'</td>'
      +'                 <td align="center">'+MoveInWareHouseDatas[1][i][j].Amount+'</td>'
      +'                 <td align="center">'+MoveInWareHouseDatas[1][i][j].FreightNumber+'</td>'
      +'         </tr>' 
     }
     ht+=htms+footHtml;
     LODOP.NewPage();
     LODOP.ADD_PRINT_TABLE("1mm","2%",'96%','100%',ht);// 增加表格打印项（超文本模式）
     ht="";
  }

LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
if(type == "1")
{
  LODOP.ADD_PRINT_TEXT(310,720,200,20,"第#页/共&页"); //加纯文本打印项
}else{

  LODOP.ADD_PRINT_TEXT(650,720,200,20,"第#页/共&页"); //加纯文本打印项
}
LODOP.SET_PRINT_STYLEA(0,"ItemType",2); // 设置打印项风格
LODOP.SET_PRINT_STYLEA(0,"Horient",1);
//LODOP.SET_PREVIEW_WINDOW('1','1','0','1024','768','单据打印.打印');
if(flag==1)
    {
      LODOP.PRINT();
    }else{
      LODOP.PREVIEW(); 
    } 

}

//移库出库
function doMoveWarehouseDeliveryPrint(flag,moveCode,type,title)
{
  //  var moveCode ="YC0271201903250004";
  // var type ="0";
  // var flag ="0";
  // var title ="123";
  var MoveOutWareHouseDatas = GetMoveOutWareHouseOrderDatas(moveCode,type);
  if(MoveOutWareHouseDatas.length==0)
  {
   alert("缺少打印数据，请重试！");
   return;
  }
  console.log(MoveOutWareHouseDatas);
  var strHtml='<style type="text/css">table,table tr th, table tr td { border:1px solid ; } table{border-collapse:collapse;}</style>'
  +'<table border="0" width="100%" cellspacing="0" cellpadding="0" text-align:center>'
  +'         <tr style="height: 15mm">'
  +'                <td align="center" style="font-size: 4mm; font-weight: bold"  colspan="8" >'+title+'移库出库</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm">'
  +'               <td align="center" width="10%">单号：</td>'
  +'               <td colspan="3">'+MoveOutWareHouseDatas[0][0]+'</td>'
  +'              <td align="center" width="10%">出库日期：</td>'
  +'               <td colspan="3">'+MoveOutWareHouseDatas[0][1]+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm">'
  +'                 <td align="center" width="10%">出库工厂：</td>'
  +'                 <td>'+MoveOutWareHouseDatas[0][2]+'</td>'
  +'                 <td align="center"width="10%">调出仓库:</td>'
  +'                 <td >'+MoveOutWareHouseDatas[0][3]+'</td>'
  +'                 <td align="center"width="10%">目标工厂:</td>'
  +'                 <td >'+MoveOutWareHouseDatas[0][4]+'</td>'
  +'                 <td align="center"width="10%">目标仓库:</td>'
  +'                 <td >'+MoveOutWareHouseDatas[0][5]+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height:10mm">'
  +'                 <td align="center">行项目</td>'
  +'                 <td align="center">物料编码</td>'
  +'                 <td align="center">物料描述</td>'
  +'                 <td align="center">数量</td>'
  +'                 <td align="center">计量单位</td>'
  +'                 <td align="center">单价</td>'
  +'                 <td align="center">总金额</td>'
  +'                 <td align="center">货位</td>'
  +'         </tr>' ;

  var footHtml =' <tr  style="font-size: 3mm;height: 5mm">'
  +'                  <td colspan="4">总金额（大写）: '+MoveOutWareHouseDatas[2][0]+'</td>'
  +'                  <td colspan="4">¥: '+MoveOutWareHouseDatas[2][1]+'</td></tr>'
  +'                 <tr  style="font-size: 3mm;height: 5mm">'
  +'                 <td>备注:</td>'
  +'                 <td colspan="7"></td></tr>'
  +'                 <tr  style="font-size: 3mm;height: 5mm">'
  +'                <td colspan="4" >库管员:</td>'
  +'                 <td colspan="4">单据打印日期: '+MoveOutWareHouseDatas[2][2]+'</td>'
  +'         </tr></table>' ;


  LODOP.PRINT_INIT(type+"MoveOutWareHouseOrder"); // 打印初始化
  if(type == "1")
  {
    LODOP.SET_PRINT_PAGESIZE(1,'240mm','95mm',''); // 设置纸张大小
  }else{

    LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4"); // 设置纸张大小
  }

    
for(var i=0;i<MoveOutWareHouseDatas[1].length;i++)
{
  var ht=strHtml;
  var htms='';
   for(var j=0;j<MoveOutWareHouseDatas[1][i].length;j++)
   {
    htms +='<tr style="font-size: 3mm;height: 5mm">'
    +'                 <td align="center">'+MoveOutWareHouseDatas[1][i][j].Id+'</td>'
    +'                 <td align="center">'+MoveOutWareHouseDatas[1][i][j].MaterielCode+'</td>'
    +'                 <td align="center">'+MoveOutWareHouseDatas[1][i][j].MaterielDesc+'</td>'
    +'                 <td align="center">'+MoveOutWareHouseDatas[1][i][j].CollectionQuantity+'</td>'
    +'                 <td align="center">'+MoveOutWareHouseDatas[1][i][j].MeasurementUnit+'</td>'
    +'                 <td align="center">'+MoveOutWareHouseDatas[1][i][j].UnitPrice+'</td>'
    +'                 <td align="center">'+MoveOutWareHouseDatas[1][i][j].Amount+'</td>'
    +'                 <td align="center">'+MoveOutWareHouseDatas[1][i][j].FreightNumber+'</td>'
    +'         </tr>' 
   }
   ht+=htms+footHtml;
   LODOP.NewPage();
   LODOP.ADD_PRINT_TABLE("1mm","2%",'96%','100%',ht);// 增加表格打印项（超文本模式）
   ht="";
}

LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
if(type == "1")
{
LODOP.ADD_PRINT_TEXT(310,720,200,20,"第#页/共&页"); //加纯文本打印项
}else{

LODOP.ADD_PRINT_TEXT(650,720,200,20,"第#页/共&页"); //加纯文本打印项
}
LODOP.SET_PRINT_STYLEA(0,"ItemType",2); // 设置打印项风格
LODOP.SET_PRINT_STYLEA(0,"Horient",1);
//LODOP.SET_PREVIEW_WINDOW('1','1','0','1024','768','单据打印.打印');
if(flag==1)
    {
      LODOP.PRINT();
    }else{
      LODOP.PREVIEW(); 
    } 
}


//采购退货
function doPurchaseWarehouseDeliveryPrint(flag,department,siteCode,purchaseOutWarehouseCode,title,type)
{
  // var type = "2";
  // var siteCode ="X002";
  // var purchaseOutWarehouseCode ="C010020181016001";
  // var department="123";
  // var title ="abc";
  var PurchaseOutWarehouseDatas = GetPurchaseOutWarehouseDatas(siteCode,purchaseOutWarehouseCode,type);
  if(PurchaseOutWarehouseDatas.length==0)
  {
   alert("缺少打印数据，请重试！");
   return;
  }
  var strHtml='<style type="text/css">table,table tr th, table tr td { border:1px solid ; } table{border-collapse:collapse;}</style>'
  +'<table border="0" width="100%" cellspacing="0" cellpadding="0" text-align:center>'
  +'         <tr style="height: 15mm">'
  +'               <td align="center" style="font-size: 4mm; font-weight: bold"  colspan="12" >'+title+'物资入库单</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm">'
  +'               <td align="center" width="10%">单号：</td>'
  +'               <td colspan="11">'+PurchaseOutWarehouseDatas[0][0]+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm">'
  +'                 <td align="center" width="10%">部门：</td>'
  +'                 <td colspan="3">'+department+'</td>'
  +'                 <td align="center"width="10%">出库日期：</td>'
  +'                 <td colspan="4">'+PurchaseOutWarehouseDatas[0][1]+'</td>'
  +'                 <td align="center"width="10%">出库仓库：</td>'
  +'                 <td colspan="2">'+PurchaseOutWarehouseDatas[0][2]+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm;">'
  +'                 <td align="center" width="10%">供应商编码：</td>'
  +'                 <td colspan="3">'+PurchaseOutWarehouseDatas[0][3]+'</td>'
  +'                 <td align="center"width="10%">供应商名称：</td>'
  +'                 <td colspan="4">'+PurchaseOutWarehouseDatas[0][4]+'</td>'
  +'                 <td align="center"width="10%">合同编号：</td>'
  +'                 <td colspan="2">'+PurchaseOutWarehouseDatas[0][5]+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm">'
  +'                 <td align="center" width="10%">业务类型：</td>'
  +'                 <td colspan="2">'+PurchaseOutWarehouseDatas[0][6]+'</td>'
  +'                 <td align="center"width="10%">移动类型：</td>'
  +'                 <td colspan="8">'+PurchaseOutWarehouseDatas[0][7]+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height:10mm">'
  +'                 <td align="center" >行项目</td>'
  +'                 <td align="center">物料编码</td>'
  +'                 <td align="center">物料短描述</td>'
  +'                 <td align="center">应退数量</td>'
  +'                 <td align="center">实退数量</td>'
  +'                 <td align="center">计量单位</td>'
  +'                 <td align="center">单价</td>'
  +'                 <td align="center">无税金额</td>'
  +'                 <td align="center">税额</td>'
  +'                 <td align="center">价税合计</td>'
  +'                 <td align="center">库区</td>'
  +'                 <td align="center">货位</td>'
  +'         </tr>' ;

  var footHtml =' <tr  style="font-size: 3mm;height: 5mm">'
  +'                 <td colspan="6">价税合计（大写）: '+PurchaseOutWarehouseDatas[2][0]+' </td>'
  +'                 <td  colspan="6">¥ : '+PurchaseOutWarehouseDatas[2][1]+'  </td></tr>'
  +'                 <tr  style="font-size: 3mm;height: 5mm">'
  +'                 <td>备注:</td>'
  +'                 <td colspan="11"></td></tr>'
  +'                 <tr  style="font-size: 3mm;height: 5mm">'
  +'                 <td colspan="2" >采购:</td>'
  +'                 <td colspan="2" >出库:</td>'
  +'                 <td colspan="2">仓管:</td>'
  +'                 <td colspan="2">财务:</td>'
  +'                 <td colspan="4">单据打印日期: '+PurchaseOutWarehouseDatas[2][2]+'</td>'
  +'         </tr></table>' ;

  LODOP.PRINT_INIT(type+"PurchaseOutWarehouseOrder"); // 打印初始化
  if(type == "1")
  {
    LODOP.SET_PRINT_PAGESIZE(1,'240mm','95mm',''); // 设置纸张大小
  }else{

    LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4"); // 设置纸张大小
  }

    
for(var i=0;i<PurchaseOutWarehouseDatas[1].length;i++)
{
  var ht=strHtml;
  var htms='';
   for(var j=0;j<PurchaseOutWarehouseDatas[1][i].length;j++)
   {
    htms +='<tr style="font-size: 3mm;height: 5mm">'
    +'                 <td align="center">'+PurchaseOutWarehouseDatas[1][i][j].Id+'</td>'
    +'                 <td align="center">'+PurchaseOutWarehouseDatas[1][i][j].MaterielCode+'</td>'
    +'                 <td align="center">'+PurchaseOutWarehouseDatas[1][i][j].MaterielDesc+'</td>'
    +'                 <td align="center">'+PurchaseOutWarehouseDatas[1][i][j].AmountReceivable+'</td>'
    +'                 <td align="center">'+PurchaseOutWarehouseDatas[1][i][j].CollectionQuantity+'</td>'
    +'                 <td align="center">'+PurchaseOutWarehouseDatas[1][i][j].MeasurementUnit+'</td>'
    +'                 <td align="center">'+PurchaseOutWarehouseDatas[1][i][j].UnitPrice+'</td>'
    +'                 <td align="center">'+PurchaseOutWarehouseDatas[1][i][j].TaxFreeAmount+'</td>'
    +'                 <td align="center">'+PurchaseOutWarehouseDatas[1][i][j].TaxAmount+'</td>'
    +'                 <td align="center">'+PurchaseOutWarehouseDatas[1][i][j].AdValorem+'</td>'
    +'                 <td align="center">'+PurchaseOutWarehouseDatas[1][i][j].WareHouseArea+'</td>'
    +'                 <td align="center">'+PurchaseOutWarehouseDatas[1][i][j].FreightNumber+'</td>'
    +'         </tr>' 
   }
   ht+=htms+footHtml;
   LODOP.NewPage();
   LODOP.ADD_PRINT_TABLE("1mm","2%",'96%','100%',ht);// 增加表格打印项（超文本模式）
   ht="";
}

LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
if(type == "1")
{
LODOP.ADD_PRINT_TEXT(310,720,200,20,"第#页/共&页"); //加纯文本打印项
}else{

LODOP.ADD_PRINT_TEXT(650,720,200,20,"第#页/共&页"); //加纯文本打印项
}
LODOP.SET_PRINT_STYLEA(0,"ItemType",2); // 设置打印项风格
LODOP.SET_PRINT_STYLEA(0,"Horient",1);
//LODOP.SET_PREVIEW_WINDOW('1','1','0','1024','768','单据打印.打印');
if(flag==1)
{
  LODOP.PRINT();
}else{
  LODOP.PREVIEW(); 
} 



}


//退料入库--没写，因为没有数据


function doReturnWarehouseReceiptPrint(flag,title,department,siteCode,code,type)
{
//   var title="123";
//   var flag="0";
//   var department="123";
// var siteCode ="0050";
// var code ="R3007201810200005";
// var type ="1";
  var ReturnWarehouseReceiptDatas = GetReturnWarehouseReceiptDatas(siteCode,code,type);
  console.log(ReturnWarehouseReceiptDatas);
  if(ReturnWarehouseReceiptDatas.length==0)
  {
   alert("缺少打印数据，请重试！");
   return;
  }
  var strHtml='<style type="text/css">table,table tr th, table tr td { border:1px solid ; } table{border-collapse:collapse;}</style>'
  +'<table border="0" width="100%" cellspacing="0" cellpadding="0" text-align:center>'
  +'         <tr style="height: 15mm">'
  +'               <td align="center" style="font-size: 4mm; font-weight: bold"  colspan="11" >'+title+'物资退库单</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm">'
  +'               <td align="center" width="10%">单号：</td>'
  +'               <td colspan="10">'+ReturnWarehouseReceiptDatas[0][0]+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm">'
  +'                 <td align="center" width="10%">退库部门：</td>'
  +'                 <td>'+department+'</td>'
  +'                 <td align="center"width="10%">业务类型:</td>'
  +'                 <td >'+ReturnWarehouseReceiptDatas[0][2]+'</td>'
  +'                 <td align="center"width="10%">移动类型:</td>'
  +'                 <td >'+ReturnWarehouseReceiptDatas[0][3]+'</td>'
  +'                 <td align="center"width="10%">入库日期:</td>'
  +'                 <td>'+ReturnWarehouseReceiptDatas[0][4]+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height: 5mm;">'
  +'                 <td align="center" width="10%">成本中心：</td>'
  +'                 <td colspan="2">'+ReturnWarehouseReceiptDatas[0][4]+'</td>'
  +'                 <td align="center"width="10%">内部订单：</td>'
  +'                 <td colspan="2">'+ReturnWarehouseReceiptDatas[0][5]+'</td>'
  +'                 <td align="center"width="10%">入库仓库：</td>'
  +'                 <td >'+ReturnWarehouseReceiptDatas[0][6]+'</td>'
  +'         </tr>'
  +'         <tr style="font-size: 3mm;height:10mm">'
  +'                 <td align="center" >行项目</td>'
  +'                 <td align="center">物料编码</td>'
  +'                 <td align="center">物料短描述</td>'
  +'                 <td align="center">数量</td>'
  +'                 <td align="center">计量单位</td>'
  +'                 <td align="center">单价</td>'
  +'                 <td align="center">总金额</td>'
 // +'                 <td align="center">库区</td>'
  +'                 <td align="center">库位</td>'
  +'         </tr>' ;

  var footHtml =' <tr  style="font-size: 3mm;height: 5mm">'
  +'                 <td colspan="5">价税合计（大写）: '+ReturnWarehouseReceiptDatas[2][0]+' </td>'
  +'                 <td  colspan="4">￥ : '+ReturnWarehouseReceiptDatas[2][1]+'  </td></tr>'
  +'                 <tr  style="font-size: 3mm;height: 5mm">'
  +'                 <td>备注:</td>'
  +'                 <td colspan="8"></td></tr>'
  +'                 <tr  style="font-size: 3mm;height: 5mm">'
  +'                 <td colspan="2" >库管员:</td>'
  +'                 <td colspan="2">退料员:</td>'
  +'                 <td colspan="2">财务:</td>'
  +'                 <td colspan="3">单据打印日期: '+ReturnWarehouseReceiptDatas[2][2]+'</td>'
  +'         </tr></table>' ;

  LODOP.PRINT_INIT(type+"ReturnWarehouseReceiptOrder"); // 打印初始化
  if(type == "1")
  {
    LODOP.SET_PRINT_PAGESIZE(1,'240mm','95mm',''); // 设置纸张大小
  }else{

    LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4"); // 设置纸张大小
  }

    
for(var i=0;i<ReturnWarehouseReceiptDatas[1].length;i++)
{
  var ht=strHtml;
  var htms='';
   for(var j=0;j<ReturnWarehouseReceiptDatas[1][i].length;j++)
   {
    htms +='<tr style="font-size: 3mm;height: 5mm">'
    +'                 <td align="center">'+ReturnWarehouseReceiptDatas[1][i][j].Id+'</td>'
    +'                 <td align="center">'+ReturnWarehouseReceiptDatas[1][i][j].MaterielCode+'</td>'
    +'                 <td align="center">'+ReturnWarehouseReceiptDatas[1][i][j].MaterielDesc+'</td>'
    +'                 <td align="center">'+ReturnWarehouseReceiptDatas[1][i][j].CollectionQuantity+'</td>'
    +'                 <td align="center">'+ReturnWarehouseReceiptDatas[1][i][j].MeasurementUnit+'</td>'
    +'                 <td align="center">'+ReturnWarehouseReceiptDatas[1][i][j].UnitPrice+'</td>'
    +'                 <td align="center">'+ReturnWarehouseReceiptDatas[1][i][j].Amount+'</td>'
    +'                 <td align="center">'+checkVal(ReturnWarehouseReceiptDatas[1][i][j].FreightNumber)+'</td>'
    +'         </tr>' 
   }
   ht+=htms+footHtml;
   LODOP.NewPage();
   LODOP.ADD_PRINT_TABLE("1mm","2%",'96%','100%',ht);// 增加表格打印项（超文本模式）
   ht="";
}

LODOP.SET_PRINT_STYLEA(0,"Vorient",3);
if(type == "1")
{
LODOP.ADD_PRINT_TEXT(310,720,200,20,"第#页/共&页"); //加纯文本打印项
}else{

LODOP.ADD_PRINT_TEXT(650,720,200,20,"第#页/共&页"); //加纯文本打印项
}
LODOP.SET_PRINT_STYLEA(0,"ItemType",2); // 设置打印项风格
LODOP.SET_PRINT_STYLEA(0,"Horient",1);
//LODOP.SET_PREVIEW_WINDOW('1','1','0','1024','768','单据打印.打印');
if(flag==1)
{
  LODOP.PRINT();
}else{
  LODOP.PREVIEW(); 
} 
}

function checkValue(key,value)
{
  
    if(value!=""&&key!="")
    {
      return value;
    }else{

      return "";
    }
}