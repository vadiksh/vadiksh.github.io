$(function() {
var min = [
       [
              [
                1574873940000,
                29 
              
              ],
              [
                1574874000000,
                29
              
              ],
              [
                1574874060000,
                29
              
              ],
              [
                1574874120000,
                29
              ],
              [
                1574874180000,
                29
              ],
              [
                1574874240000,
                25
              ],
              [
                1574874300000,
                20
              ],
              [
                1574874360000,
                22
              ],
              [
                1574874420000,
                28
              ],
              [
                1574874480000,
                26
              ]
            ],
          [
              [
                1574873940000,
                27
              ],
              [
                1574874000000,
                26
              ],
              [
                1574874060000,
                29
              ],
              [
                1574874120000,
                28
              ],
              [
                1574874180000,
                30
              ],
              [
                1574874240000,
                28
              ],
              [
                1574874300000,
                27
              ],
              [
                1574874360000,
                29
              ],
              [
                1574874420000,
                28
              ],
              [
                1574874480000,
                30
              ]
            ],
          [
              [
                1574873940000,
                28
              ],
              [
                1574874000000,
                29
              ],
              [
                1574874060000,
                27
              ],
              [
                1574874120000,
                29
              ],
              [
                1574874180000,
                27
              ],
              [
                1574874240000,
                30
              ],
              [
                1574874300000,
                26
              ],
              [
                1574874360000,
                29
              ],
              [
                1574874420000,
                30
              ],
              [
                1574874480000,
                26
              ]
            ]
           ];

var max = [
      [
              [
                1574873940000,
                32
              ],
              [
                1574874000000,
                49
              ],
              [
                1574874060000,
                38
              ],
              [
                1574874120000,
                30
              ],
              [
                1574874180000,
                33
              ],
              [
                1574874240000,
                30
              ],
              [
                1574874300000,
                32
              ],
              [
                1574874360000,
                31
              ],
              [
                1574874420000,
                26
              ],
              [
                1574874480000,
                27
              ]
            ],
            [
              [
                1574873940000,
                35
              ],
              [
                1574874000000,
                46
              ],
              [
                1574874060000,
                33
              ],
              [
                1574874120000,
                29
              ],
              [
                1574874180000,
                37
              ],
              [
                1574874240000,
                31
              ],
              [
                1574874300000,
                33
              ],
              [
                1574874360000,
                29
              ],
              [
                1574874420000,
                35
              ],
              [
                1574874480000,
                31
              ]
            ],
            [
        [
          1574873940000,
          33
        ],
        [
          1574874000000,
          47
        ],
        [
          1574874060000,
          31
        ],
        [
          1574874120000,
          34
        ],
        [
          1574874180000,
          32
        ],
        [
          1574874240000,
          30
        ],
        [
          1574874300000,
          37
        ],
        [
          1574874360000,
          31
        ],
        [
          1574874420000,
          33
        ],
        [
          1574874480000,
          30
        ]
      ]
          ];

var loss = [
              [
                1574873940000,
                1
              ],
              [
                1574874000000,
                3
              ],
              [
                1574874060000,
                2.5
              ],
              [
                1574874120000,
                0
              ],
              [
                1574874180000,
                1.5
              ],
              [
                1574874240000,
                0.5
              ],
              [
                1574874300000,
                1
              ],
              [
                1574874360000,
                0
              ],
              [
                1574874420000,
                2
              ],
              [
                1574874480000,
                1
              ]
        ];
var avg = [
              [
                1574873940000,
                30
              ],
              [
                1574874000000,
                31
              ],
              [
                1574874060000,
                31
              ],
              [
                1574874120000,
                29
              ],
              [
                1574874180000,
                30
              ],
              [
                1574874240000,
                29
              ],
              [
                1574874300000,
                29
              ],
              [
                1574874360000,
                29
              ],
              [
                1574874420000,
                29
              ],
              [
                1574874480000,
                29
              ]
        ];

  var min1 = [
        [
                [
                  1574873940000,
                  29 
                
                ],
                [
                  1574874000000,
                  29
                
                ],
                [
                  1574874060000,
                  29
                
                ],
                [
                  1574874120000,
                  29
                ],
                [
                  1574874180000,
                  29
                ],
                [
                  1574874240000,
                  25
                ]
              ],
            [
                [
                  1574873940000,
                  27
                ],
                [
                  1574874000000,
                  26
                ],
                [
                  1574874060000,
                  29
                ],
                [
                  1574874120000,
                  28
                ],
                [
                  1574874180000,
                  30
                ],
                [
                  1574874240000,
                  28
                ]
              ],
            [
                [
                  1574873940000,
                  28
                ],
                [
                  1574874000000,
                  29
                ],
                [
                  1574874060000,
                  27
                ],
                [
                  1574874120000,
                  29
                ],
                [
                  1574874180000,
                  27
                ],
                [
                  1574874240000,
                  30
                ]
              ]
             ];

  var max1 = [
        [
                [
                  1574873940000,
                  32
                ],
                [
                  1574874000000,
                  49
                ],
                [
                  1574874060000,
                  38
                ],
                [
                  1574874120000,
                  30
                ],
                [
                  1574874180000,
                  33
                ],
                [
                  1574874240000,
                  30
                ]
        ],
        [
                [
                  1574873940000,
                  35
                ],
                [
                  1574874000000,
                  46
                ],
                [
                  1574874060000,
                  33
                ],
                [
                  1574874120000,
                  29
                ],
                [
                  1574874180000,
                  37
                ],
                [
                  1574874240000,
                  31
                ]
        ],
        [    
                [
                  1574873940000,
                  33
                ],
                [
                  1574874000000,
                  47
                ],
                [
                  1574874060000,
                  31
                ],
                [
                  1574874120000,
                  34
                ],
                [
                  1574874180000,
                  32
                ],
                [
                  1574874240000,
                  30
                ]
        ]
    ];

  var loss1 = [
                [
                  1574873940000,
                  1
                ],
                [
                  1574874000000,
                  3
                ],
                [
                  1574874060000,
                  2.5
                ],
                [
                  1574874120000,
                  0
                ],
                [
                  1574874180000,
                  1.5
                ],
                [
                  1574874240000,
                  2
                ]
          ];
  var avg1 = [
                [
                  1574873940000,
                  30
                ],
                [
                  1574874000000,
                  31
                ],
                [
                  1574874060000,
                  31
                ],
                [
                  1574874120000,
                  29
                ],
                [
                  1574874180000,
                  30
                ],
                [
                  1574874240000,
                  29
                ]
          ];
 


function createGraph(min, max, loss, avg) {
  var lossLines = [];
  var colors = [];
  var lossBands = [];
  var timeInterval = loss[1][0] - loss[0][0];

  for (var i = 0; i < min.length; i++) {
    for (var j = 0; j < avg.length; j++) {
      if (min[i][j].length < 3) {
        min[i][j].push(avg[j][1]);
        max[i][j].push(avg[j][1]);
      }
    }
  }
  
  for (var i = 0; i < loss.length - 1; i++) {
    lossLines.push([avg[i], [avg[i][0] + timeInterval, avg[i][1]]]);
  }
  console.log(lossLines);
  for (var i = 0; i < loss.length; i++) {
    if (loss[i][1] / min.length == 0) {
      colors.push('#25ff03');
    } else if (loss[i][1] / min.length > 0 && loss[i][1] / min.length <= 0.05) {
      colors.push('#00b8ff');
    } else if (loss[i][1] / min.length > 0.05 && loss[i][1] / min.length <= 0.1) {
      colors.push('#0059ff');
    } else if (loss[i][1] / min.length > 0.1 && loss[i][1] / min.length <= 0.15) {
      colors.push('#5d00ff');
    } else if (loss[i][1] / min.length > 0.15 && loss[i][1] / min.length <= 0.2) {
      colors.push('#7e00ff');
    } else if (loss[i][1] / min.length > 0.2 && loss[i][1] / min.length <= 0.5) {
      colors.push('#dd00ff');
    } else if (loss[i][1] / min.length > 0.5 && loss[i][1] / min.length < 1) {
      colors.push('#ff0000');
    } else {
      colors.push('transparent');
      for (var j = 0; j < min.length; j++) {
        min[j][i][1] = avg[i][1];
        min[j][i][2] = avg[i][1];
        max[j][i][1] = avg[i][1];
        max[j][i][2] = avg[i][1];
      }
      lossBands.push({from: avg[i][0], to: avg[i][0] + timeInterval, color: 'rgba(255,0,0,.75)', zIndex: 3});
    }
  }
  var chartParameters = [
          {
              name: 'avg',
              type: 'line',
              lineColor: 'transparent',
              data: avg,
              marker: {
                  enabled: false
              },
              enableMouseTracking: true,
              tooltip: {
                enabled: true
              }
          }
      ];

  for (var i = 0; i < min.length; i++) {
    chartParameters.push({data: min[i]});
    chartParameters.push({data: max[i]});
  }
  for (var i = 0; i < loss.length; i++) {
    chartParameters.push({type: 'line', lineColor: colors[i], data: lossLines[i]});
  }
 
  var chart = Highcharts.chart('graph', {
    chart: {
        type: 'arearange',
        zoomType: 'x'
      },
      legend: {
          enabled: false
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime',
        plotBands: lossBands
      },
      yAxis: [{
            title: {
                text: 'Network Latency (ms)',
                margin: 25
            }
        }],

      plotOptions: {
        series: {
          type: 'arearange',
          marker: {
              enabled: false
          },
          enableMouseTracking: false,
          step: true,
          fillColor: 'rgba(0,0,0,.1)',
          lineColor: 'rgba(0,0,0,.1)',
          lineWidth:0
        }, 
        line: {
          lineWidth: 3,
          step: true
        }
      },
      series: chartParameters
  });
}

createGraph(min, max, loss, avg);


$('.timeframe li').click(function () {
  $(this).addClass('active').siblings('').removeClass('active');
})

$('.timeframe .5-min').click(function () {
  createGraph(min1, max1, loss1, avg1);
})
$('.timeframe .10-min').click(function () {
  createGraph(min, max, loss, avg);
})

})
