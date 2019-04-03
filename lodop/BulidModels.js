
/**
 * Created by DearLeslie on 2018/8/28.
 */
var LODOP;
var num;
function init() {
  LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'));
}
function design () {
  LODOP.PRINT_INIT("测试打印");
  document.getElementById('templateCode').value=LODOP.PRINT_DESIGN();
}

/**
 * 二维码双排模板
 */
function GetDoublePrint(base64Codes,data1,data2) {

  if (base64Codes!=""&&data1!=""&&data2!=""&&base64Codes!=null&&data1!=null&&data2!=null){

    BuildModelThree(base64Codes,data1,data2);

  }else {

    alert('参数为空，请重试！')
  }


}


function BuildModelOne(QRCodeEntities){
  if(QRCodeEntities.length==0||QRCodeEntities==null)
  {
    return;
  }
  init();
  LODOP.PRINT_INIT("ModelOne");
  LODOP.SET_PRINT_PAGESIZE(1,'100mm','80mm','');
  
  for(var i =0;i<QRCodeEntities.length;i++)
  {
  LODOP.ADD_PRINT_IMAGE("10mm","35mm","45mm","45mm","<img border='0' src="+QRCodeEntities[i].QRCode+"> ");
  LODOP.ADD_PRINT_TEXT("40mm","20mm",100,20,"物料编码 ：");
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  LODOP.ADD_PRINT_TEXT("47mm","20mm",100,20,"物料名称 ：");
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  LODOP.ADD_PRINT_TEXT("54mm","20mm",100,20,"批次编号 ：");
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  LODOP.ADD_PRINT_TEXT("61mm","20mm",100,20,"供应商 ：");
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  LODOP.ADD_PRINT_TEXT("68mm","20mm",100,20,"存储库位 ：");
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  LODOP.ADD_PRINT_TEXT("40mm","45mm",100,20,QRCodeEntities[i].MaterielCode);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
  LODOP.ADD_PRINT_TEXT("47mm","45mm",250,20,QRCodeEntities[i].MaterielDesc);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
  LODOP.ADD_PRINT_TEXT("54mm","45mm",100,20,QRCodeEntities[i].BatchCode);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
  LODOP.ADD_PRINT_TEXT("61mm","45mm",100,20,QRCodeEntities[i].SupplierCode);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
  LODOP.ADD_PRINT_TEXT("68mm","45mm",100,20,QRCodeEntities[i].StorageLocation);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
  if(QRCodeEntities.length>1)
  {
    LODOP.NewPage();
  }
 // LODOP.NewPage();
  }
  LODOP.PREVIEW();
}

function BuildModelTow(QRCodeEntities){
  if(QRCodeEntities.length==0||QRCodeEntities==null)
  {
    return;
  }
  init();
  LODOP.PRINT_INIT("ModelTow");
  LODOP.SET_PRINT_PAGESIZE(0,'50mm','30mm','');
  for(var i = 0 ;i<QRCodeEntities.length;i++)
  {
    LODOP.ADD_PRINT_IMAGE("6mm","5mm","33mm","33mm","<img border='0' src="+QRCodeEntities[i].QRCode+"> ");
    //    赋值
  LODOP.ADD_PRINT_TEXT("5mm","25mm",100,20,QRCodeEntities[i].MaterielCode);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  LODOP.ADD_PRINT_TEXT("10mm","25mm",100,20,QRCodeEntities[i].MaterielDesc);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  LODOP.ADD_PRINT_TEXT("15mm","25mm",100,20,QRCodeEntities[i].BatchCode);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  LODOP.ADD_PRINT_TEXT("20mm","25mm",100,20,QRCodeEntities[i].SupplierCode);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  LODOP.ADD_PRINT_TEXT("25mm","25mm",100,20,QRCodeEntities[i].StorageLocation);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  if(QRCodeEntities.length>1)
  {
    LODOP.NewPage();
  }
  

  }
  LODOP.PREVIEW();
}

function BuildModelThree(base64Codes,data1,data2){
  init();
  LODOP.PRINT_INIT("ModelThree");
  LODOP.SET_PRINT_PAGESIZE(0,'100mm','30mm','');
  LODOP.ADD_PRINT_IMAGE("6mm","3mm","33mm","33mm","<img border='0' src="+base64Codes[0]+"> ");
  LODOP.ADD_PRINT_IMAGE("6mm","55mm","33mm","33mm","<img border='0' src="+base64Codes[1]+"> ");
  // LODOP.ADD_PRINT_TEXT("14mm","10mm",100,20,"物料编码 ：");
  // LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  // LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  // LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  // LODOP.ADD_PRINT_TEXT("17mm","10mm",100,20,"物料名称 ：");
  // LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  // LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  // LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  // LODOP.ADD_PRINT_TEXT("20mm","10mm",100,20,"批次编号 ：");
  // LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  // LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  // LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  // LODOP.ADD_PRINT_TEXT("23mm","10mm",100,20,"供应商 ：");
  // LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  // LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  // LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  // LODOP.ADD_PRINT_TEXT("26mm","10mm",100,20,"存储库位 ：");
  // LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  // LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  // LODOP.SET_PRINT_STYLEA(0,"Bold",1);

//    赋值
  LODOP.ADD_PRINT_TEXT("5mm","23mm",100,20,data1[0]);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  LODOP.ADD_PRINT_TEXT("10mm","23mm",100,20,data1[1]);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  LODOP.ADD_PRINT_TEXT("15mm","23mm",100,20,data1[2]);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  LODOP.ADD_PRINT_TEXT("20mm","23mm",100,20,data1[3]);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  LODOP.ADD_PRINT_TEXT("25mm","23mm",100,20,data1[4]);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);

  LODOP.ADD_PRINT_TEXT("5mm","75mm",100,20,data2[0]);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  LODOP.ADD_PRINT_TEXT("10mm","75mm",100,20,data2[1]);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  LODOP.ADD_PRINT_TEXT("15mm","75mm",100,20,data2[2]);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  LODOP.ADD_PRINT_TEXT("20mm","75mm",100,20,data2[3]);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  LODOP.ADD_PRINT_TEXT("25mm","75mm",100,20,data2[4]);
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",6);
  LODOP.PREVIEW();
}

//获取本机所有打印接
function  getPrintList() {
  LODOP = getLodop();
  var count =LODOP.GET_PRINTER_COUNT();
  for(var i=0;i<count;i++)
  {
    if (LODOP.GET_PRINTER_NAME(i).match("2300E"))
    {
      document.getElementById('in').value=LODOP.GET_PRINTER_NAME(i);
      num = i;
      break;
    }
  }
}



function QRCodeEntity(qrCode,materielCode,materielDesc,batchCode,supplierCode,storageLocation)
{
  this.QRCode =qrCode;
  this.MaterielCode = materielCode;
  this.MaterielDesc =materielDesc;
  this.BatchCode = batchCode;
  this.SupplierCode = supplierCode;
  this.StorageLocation = storageLocation;
}

// function doPrint()
// {
//   var  QR1 ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAABXAQAAAABZs+TBAAABDklEQVR42oXTsa2FMAwFUKMUdI8FInkNuqxEFoCwAKyULmtEYgHoUqDc7+i9EvNTHYpwjW2IqD9QbBepnWczkgnO7AmnatulPEReE01vNmsB/vHtI643S6710ay/Gh4t9VvfHr/f8mjIuZA9UFWTdMAXnOOxqZZGHVe8F7BurOmozpxj/qi+h5JbuxKfqqXb5iqoI31U316K/+VqlsLsEllyJ907jtAf8uZNtdl6IDJgqmo7IC/FLmh7opiviDDS1HI128lRl7AnDrpnsr7ccnFTLeOVXlmPF8uemOrIJ5pVy77lLvIFydUseyu5rXh6c5tdGLm+mWW4s5P5apZcDk524PsvPFrq5zYXuaX5DxDP9YuGvr9CAAAAAElFTkSuQmCC";
//   var  QR2 ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAABXAQAAAABZs+TBAAABDklEQVR42oXTsa2FMAwFUKMUdI8FInkNuqxEFoCwAKyULmtEYgHoUqDc7+i9EvNTHYpwjW2IqD9QbBepnWczkgnO7AmnatulPEReE01vNmsB/vHtI643S6710ay/Gh4t9VvfHr/f8mjIuZA9UFWTdMAXnOOxqZZGHVe8F7BurOmozpxj/qi+h5JbuxKfqqXb5iqoI31U316K/+VqlsLsEllyJ907jtAf8uZNtdl6IDJgqmo7IC/FLmh7opiviDDS1HI128lRl7AnDrpnsr7ccnFTLeOVXlmPF8uemOrIJ5pVy77lLvIFydUseyu5rXh6c5tdGLm+mWW4s5P5apZcDk524PsvPFrq5zYXuaX5DxDP9YuGvr9CAAAAAElFTkSuQmCC";
//   var QRCodeEntities =new Array();
//   QRCodeEntities.push(new QRCodeEntity(QR1,"1","2","3","4","5"));
//   QRCodeEntities.push(new QRCodeEntity(QR2,"6","7","8","9","10"));
//   BuildModelOne(QRCodeEntities);
// }
