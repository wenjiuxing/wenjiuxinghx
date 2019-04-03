//验收入库对象
function InWareHouseDetailed (item,materielCode,materielDesc,amountReceivable,collectionQuantity,measurementUnit,unitPrice,totalNetPrice,taxAmount,adValorem,freightNumber)
{
  console.log(item,materielCode,materielDesc,amountReceivable,collectionQuantity,measurementUnit,unitPrice,totalNetPrice,taxAmount,adValorem,freightNumber);
  if(unitPrice==""&&totalNetPrice==""&&taxAmount==""&&adValorem=="")
  {
    this.Id = item;//行项目
    this.MaterielCode = materielCode;//物料编码
    this.MaterielDesc =materielDesc;//物料描述
    this.AmountReceivable =amountReceivable;//应收数量
    this.CollectionQuantity=collectionQuantity;//实收数量
    this.MeasurementUnit= measurementUnit;//计量单位
    this.UnitPrice =unitPrice;//净价单价
    this.TaxFreeAmount=totalNetPrice;//(无税金额 净价单价*实收数量）
    this.TaxAmount=taxAmount;//税额（无税金额*税率 保留两位）
    this.AdValorem=adValorem;//价税合计（无税金额+税金）
    this.FreightNumber ="";//货位号
  }else{

    this.Id = item;//行项目
    this.MaterielCode = materielCode;//物料编码
    this.MaterielDesc =materielDesc;//物料描述
    this.AmountReceivable =amountReceivable;//应收数量
    this.CollectionQuantity=collectionQuantity;//实收数量
    this.MeasurementUnit= measurementUnit;//计量单位
    this.UnitPrice =Number(unitPrice).toFixed(2);//净价单价
    this.TaxFreeAmount=Number(totalNetPrice).toFixed(2);//(无税金额 净价单价*实收数量）
    this.TaxAmount=Number(taxAmount).toFixed(2);//税额（无税金额*税率 保留两位）
    this.AdValorem=Number(adValorem).toFixed(2);//价税合计（无税金额+税金）
    this.FreightNumber =freightNumber;//货位号

  }

}

//出库对象
function OutWareHouseDetailed (itemLine,materielCode,materielDesc,num,measurementUnit,unitPrice,amount,outPosition)
{
  if(amount!="")
  {
    this.Id = itemLine;
   this.MaterielCode = materielCode;
   this.MaterielDesc =materielDesc;
   this.Num =num;
   this.MeasurementUnit=measurementUnit;
   this.UnitPrice= Math.round(unitPrice * 100) / 100;
   this.Amount = Math.round(amount * 100) / 100
   this.OutPosition=outPosition;
  }else {
    this.Id = itemLine;
    this.MaterielCode = materielCode;
    this.MaterielDesc =materielDesc;
    this.Num =num;
    this.MeasurementUnit=measurementUnit;
    this.UnitPrice= unitPrice;
    this.Amount = "";
    this.OutPosition="";

  }

}

//采购结算单对象
function PurchaseSettlementDetailed (itemLine,purchaseItem,warehousingCode,materielCode,materielDesc,num,measurementUnit,netPrice,provisionalNetUnitprice,estimatedAmountOfMoney,amountDifference,taxAmount,adValorem,netTotalPrice)
{
  if(netPrice!="")
  {
    this.Id = itemLine;
    this.PurchaseItem = purchaseItem;
    this.WarehousingCode = warehousingCode;
    this.MaterielCode = materielCode;
    this.MaterielDesc =materielDesc;
    this.Num =num;
    this.MeasurementUnit=measurementUnit;
    this.NetPrice = Number(netPrice);
  //  this.InvoiceValue =Number(invoiceValue).toFixed(2);
    this.ProvisionalNetUnitprice =Number(provisionalNetUnitprice);
    this.EstimatedAmountOfMoney =Number(estimatedAmountOfMoney);
    this.AmountDifference=Number(amountDifference);
    this.TaxAmount =Number(taxAmount);
    this.AdValorem=Number(adValorem);
    this.NetTotalPrice=Number(netTotalPrice);
  }else{

    this.Id = itemLine;
    this.PurchaseItem = purchaseItem;
    this.WarehousingCode = warehousingCode;
    this.MaterielCode = materielCode;
    this.MaterielDesc =materielDesc;
    this.Num =num;
    this.MeasurementUnit=measurementUnit;
    this.NetPrice = "";
   // this.InvoiceValue ="";
    this.ProvisionalNetUnitprice ="";
    this.EstimatedAmountOfMoney ="";
    this.AmountDifference="";
    this.TaxAmount ="";
    this.AdValorem="";
   this.NetTotalPrice="";
  }
  
}


//移库入库对象
function MoveWareHouseDetailed (item,materielCode,materielDesc,collectionQuantity,measurementUnit,unitPrice,amount,freightNumber)
{
  if(unitPrice=="")
  {
    this.Id = item;//行项目
    this.MaterielCode = materielCode;//物料编码
    this.MaterielDesc =materielDesc;//物料描述
    this.CollectionQuantity=collectionQuantity;//数量
    this.MeasurementUnit= measurementUnit;//计量单位
    this.UnitPrice =unitPrice;//单价
    this.Amount=amount;//(无税金额 净价单价*实收数量）
    this.FreightNumber =freightNumber;//货位号

  }else{

    this.Id = item;//行项目
    this.MaterielCode = materielCode;//物料编码
    this.MaterielDesc =materielDesc;//物料描述
    this.CollectionQuantity=collectionQuantity;//数量
    this.MeasurementUnit= measurementUnit;//计量单位
    this.UnitPrice =Number(unitPrice).toFixed(2);//单价
    this.Amount=Number(amount).toFixed(2);//总金额
    this.FreightNumber =freightNumber;//货位号
  }

}

//移库出库对象
function MoveOutWareHouseDetailed (item,materielCode,materielDesc,collectionQuantity,measurementUnit,unitPrice,amount,freightNumber)
{
  if(unitPrice=="")
  {
    this.Id = item;//行项目
    this.MaterielCode = materielCode;//物料编码
    this.MaterielDesc =materielDesc;//物料描述
    this.CollectionQuantity=collectionQuantity;//数量
    this.MeasurementUnit= measurementUnit;//计量单位
    this.UnitPrice =unitPrice;//单价
    this.Amount=amount;//总金额
    this.FreightNumber =freightNumber;//货位号

  }else{

    this.Id = item;//行项目
    this.MaterielCode = materielCode;//物料编码
    this.MaterielDesc =materielDesc;//物料描述
    this.CollectionQuantity=collectionQuantity;//数量
    this.MeasurementUnit= measurementUnit;//计量单位
    this.UnitPrice =Number(unitPrice).toFixed(2);//单价
    this.Amount=Number(amount).toFixed(2);//总金额
    this.FreightNumber =freightNumber;//货位号
  }

}

//退料入库对象
function ReturnInWareHouseDetailed(item,materielCode,materielDesc,collectionQuantity,measurementUnit,unitPrice,amount,wareHouseArea,freightNumber)
{
  this.Id = item;//行项目
  this.MaterielCode = materielCode;//物料编码
  this.MaterielDesc =materielDesc;//物料描述
  this.CollectionQuantity=collectionQuantity;//数量
  this.MeasurementUnit= measurementUnit;//计量单位
  this.UnitPrice =unitPrice;//单价
  this.Amount=amount;//总金额
  this.WareHouseArea =wareHouseArea;//库区
  this.FreightNumber =freightNumber;//货位号
}

//采购退货对象
function PurchaseOutWarehouseDetailed(item,materielCode,materielDesc,amountReceivable,collectionQuantity,measurementUnit,unitPrice,totalNetPrice,taxAmount,adValorem,wareHouseArea,freightNumber)
{ 
  this.Id = item;//行项目
  this.MaterielCode = materielCode;//物料编码
  this.MaterielDesc =materielDesc;//物料描述
  this.AmountReceivable =amountReceivable;//应收数量
  this.CollectionQuantity=collectionQuantity;//实收数量
  this.MeasurementUnit= measurementUnit;//计量单位
  this.UnitPrice =unitPrice;//单价
  this.TaxFreeAmount=totalNetPrice;//(无税金额 净价单价*实收数量）
  this.TaxAmount=taxAmount;//税额（无税金额*税率 保留两位）
  this.AdValorem=adValorem;//价税合计（无税金额+税金）
  this.WareHouseArea =wareHouseArea;//库区
  this.FreightNumber =freightNumber;//货位号
}
