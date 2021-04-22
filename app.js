function loadData(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            chartData(this.response);
            pieChart(this.response);
            linePositiveData(this.response);
            linePositiveIncreaseData(this.response);
            lineDeathData(this.response);
            lineDeathIncreaseData(this.response);

        }
    };
    xhttp.open("GET", "/data");
    xhttp.send();
}
function chartData(data){
    const parse=JSON.parse(data);
    let count=1
    for(let i in parse){
      if(i !== 'pastDic'){
        let today=parse[i]["todayCases"];
        let totalCase=parse[i]["totalCase"];
        let death=parse[i]["deaths"];
        let recover=parse[i]["recover"];
        let population=parse[i]["population"];
        $("#caseTable tbody").append('<tr><th scope="row">'+count+'</th><td>'+i+'</td><td>'+today+'</td><td>'+totalCase+'</td><td>'+death+'</td><td>'+recover+'</td><td>'+population+'</td></tr>');
        count+=1;
      }
    }
    return parse;
}
function pieChart(data){
  am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.PieChart);
    const parse=JSON.parse(data);
    let key=Object.keys(parse)
    let totalCount=0;
    for(let i=6;i<key.length-1;i++){
      totalCount+=parse[key[i]]["totalCase"];
    }
    // Add data
    chart.data = [ {
      "state": key[1],
      "cases": parse[key[1]]["totalCase"]
    },
    {
      "state": key[2],
      "cases": parse[key[2]]["totalCase"]
    },
    {
      "state": key[3],
      "cases": parse[key[3]]["totalCase"]
    },
    {
      "state": key[4],
      "cases": parse[key[4]]["totalCase"]
    },
    {
      "state": key[5],
      "cases": parse[key[5]]["totalCase"]
    },
    {
      "state": "Other",
      "cases": totalCount
    },
    ];
    
    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "cases";
    pieSeries.dataFields.category = "state";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;
    
    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    
    chart.hiddenState.properties.radius = am4core.percent(0);
    
    
    }); // end am4core.ready()
}
function linePositiveData(jsonData){
  am4core.ready(function() {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  // Create chart instance
  var chart = am4core.create("linePositivechart", am4charts.XYChart);
  chart.paddingRight = 20;
  const parse=JSON.parse(jsonData);
  const pastData=parse['pastDic'];
  // Add data
  let data=[];
  for(let i=1;i<60;i++){
    data.push({"year":pastData[i][0],"value":pastData[i][1]})
  }
  chart.data = data.reverse();
  
  // Create axes
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "year";
  categoryAxis.renderer.minGridDistance = 100;
  categoryAxis.renderer.grid.template.location = 0.5;
  categoryAxis.startLocation = 0.5;
  categoryAxis.endLocation = 0.5;

  
  // Create value axis
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.baseValue = 0;
  // Create series
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value";
  series.dataFields.categoryX = "year";
  series.strokeWidth = 2;
  series.tensionX = 0.77;
  
  // bullet is added because we add tooltip to a bullet for it to change color
  var bullet = series.bullets.push(new am4charts.Bullet());
  bullet.tooltipText = "{valueY}" + " Positive Cases";
  
  bullet.adapter.add("fill", function(fill, target){
      if(target.dataItem.valueY < 0){
          return am4core.color("#FF0000");
      }
      return fill;
  })
  var range = valueAxis.createSeriesRange(series);
  range.value = 0;
  range.endValue = -1000;
  range.contents.stroke = am4core.color("#FF0000");
  range.contents.fill = range.contents.stroke;
  
  // Add scrollbar
  var scrollbarX = new am4charts.XYChartScrollbar();
  scrollbarX.series.push(series);
  chart.scrollbarX = scrollbarX;
  
  chart.cursor = new am4charts.XYCursor();

  }); // end am4core.ready()
}
function linePositiveIncreaseData(jsonData){
  am4core.ready(function() {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  // Create chart instance
  var chart = am4core.create("linePositiveIncreasechart", am4charts.XYChart);
  chart.paddingRight = 20;
  const parse=JSON.parse(jsonData);
  const pastData=parse['pastDic'];
  // Add data
  let data=[];
  for(let i=1;i<60;i++){
    data.push({"year":pastData[i][0],"value":pastData[i][2]})
  }
  chart.data = data.reverse();
  
  // Create axes
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "year";
  categoryAxis.renderer.minGridDistance = 100;
  categoryAxis.renderer.grid.template.location = 0.5;
  categoryAxis.startLocation = 0.5;
  categoryAxis.endLocation = 0.5;

  
  // Create value axis
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.baseValue = 0;
  // Create series
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value";
  series.dataFields.categoryX = "year";
  series.strokeWidth = 2;
  series.tensionX = 0.77;
  
  // bullet is added because we add tooltip to a bullet for it to change color
  var bullet = series.bullets.push(new am4charts.Bullet());
  bullet.tooltipText = "{valueY}" + " Increase Cases";
  
  bullet.adapter.add("fill", function(fill, target){
      if(target.dataItem.valueY < 0){
          return am4core.color("#FF0000");
      }
      return fill;
  })
  var range = valueAxis.createSeriesRange(series);
  range.value = 0;
  range.endValue = -1000;
  range.contents.stroke = am4core.color("#FF0000");
  range.contents.fill = range.contents.stroke;
  
  // Add scrollbar
  var scrollbarX = new am4charts.XYChartScrollbar();
  scrollbarX.series.push(series);
  chart.scrollbarX = scrollbarX;
  
  chart.cursor = new am4charts.XYCursor();

  }); // end am4core.ready()
}
function lineDeathData(jsonData){
  am4core.ready(function() {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  // Create chart instance
  var chart = am4core.create("lineDeathchart", am4charts.XYChart);
  chart.paddingRight = 20;
  const parse=JSON.parse(jsonData);
  const pastData=parse['pastDic'];
  // Add data
  let data=[];
  for(let i=1;i<60;i++){
    data.push({"year":pastData[i][0],"value":pastData[i][3]})
  }
  chart.data = data.reverse();
  
  // Create axes
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "year";
  categoryAxis.renderer.minGridDistance = 100;
  categoryAxis.renderer.grid.template.location = 0.5;
  categoryAxis.startLocation = 0.5;
  categoryAxis.endLocation = 0.5;

  
  // Create value axis
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.baseValue = 0;
  // Create series
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value";
  series.dataFields.categoryX = "year";
  series.strokeWidth = 2;
  series.tensionX = 0.77;
  
  // bullet is added because we add tooltip to a bullet for it to change color
  var bullet = series.bullets.push(new am4charts.Bullet());
  bullet.tooltipText = "{valueY}" + " Death";
  
  bullet.adapter.add("fill", function(fill, target){
      if(target.dataItem.valueY < 0){
          return am4core.color("#FF0000");
      }
      return fill;
  })
  var range = valueAxis.createSeriesRange(series);
  range.value = 0;
  range.endValue = -1000;
  range.contents.stroke = am4core.color("#FF0000");
  range.contents.fill = range.contents.stroke;
  
  // Add scrollbar
  var scrollbarX = new am4charts.XYChartScrollbar();
  scrollbarX.series.push(series);
  chart.scrollbarX = scrollbarX;
  
  chart.cursor = new am4charts.XYCursor();

  }); // end am4core.ready()
}
function lineDeathIncreaseData(jsonData){
  am4core.ready(function() {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  // Create chart instance
  var chart = am4core.create("lineDeathIncreasechart", am4charts.XYChart);
  chart.paddingRight = 20;
  const parse=JSON.parse(jsonData);
  const pastData=parse['pastDic'];
  // Add data
  let data=[];
  for(let i=1;i<60;i++){
    data.push({"year":pastData[i][0],"value":pastData[i][4]})
  }
  chart.data = data.reverse();
  
  // Create axes
  var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "year";
  categoryAxis.renderer.minGridDistance = 100;
  categoryAxis.renderer.grid.template.location = 0.5;
  categoryAxis.startLocation = 0.5;
  categoryAxis.endLocation = 0.5;

  
  // Create value axis
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.baseValue = 0;
  // Create series
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value";
  series.dataFields.categoryX = "year";
  series.strokeWidth = 2;
  series.tensionX = 0.77;
  
  // bullet is added because we add tooltip to a bullet for it to change color
  var bullet = series.bullets.push(new am4charts.Bullet());
  bullet.tooltipText = "{valueY}" + " Death Increase";
  
  bullet.adapter.add("fill", function(fill, target){
      if(target.dataItem.valueY < 0){
          return am4core.color("#FF0000");
      }
      return fill;
  })
  var range = valueAxis.createSeriesRange(series);
  range.value = 0;
  range.endValue = -1000;
  range.contents.stroke = am4core.color("#FF0000");
  range.contents.fill = range.contents.stroke;
  
  // Add scrollbar
  var scrollbarX = new am4charts.XYChartScrollbar();
  scrollbarX.series.push(series);
  chart.scrollbarX = scrollbarX;
  
  chart.cursor = new am4charts.XYCursor();

  }); // end am4core.ready()
}
$(document).ready(function(){
    $("#filter_input").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
  $(window).on('load', function(){
    $('#caseTable').hide();
    $('.sameLine').hide();
    $('.sameLine2').hide();
    $('#filter').hide();

    setTimeout(removeLoader, 2500); //wait for page load PLUS two seconds.
  });
  function removeLoader(){
    $('.sameLine').show();
    $('.sameLine2').show();
    $('#filter').show();
        $( "#loading" ).fadeOut(500, function() {
        $( "#loading" ).remove();
    });  
  }
  $(document).scroll(function() {
    var y = $(this).scrollTop();
    console.log(y)
    if (y > 70) {
      $('#caseTable').show("slow","swing");
      $('.filter').show("slow","swing");

    } else {
      $('#caseTable').fadeOut();
      $('.filter').fadeOut();
    }
  });