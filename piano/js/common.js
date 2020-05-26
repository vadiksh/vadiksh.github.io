/* Add your JavaScript code here.

If you are using the jQuery library, then don't forget to wrap your code inside jQuery.ready() as follows:

jQuery(document).ready(function( $ ){
    // Your code in here
});

--

If you want to link a JavaScript file that resides on another server (similar to
<script src="https://example.com/your-js-file.js"></script>), then please use
the "Add HTML Code" page, as this is a HTML code that links a JavaScript file.

End of comment */ 




loadScr.start();





//    var la = new Tone.BufferSource(baseUrl);





    Tone.Buffer.on('load', function() {
        loadScr.stop();
        console.log('ready');    
    });
/*
*/

//document.querySelector("#loading").style.display = 'none';
window.onload = NProgress.done();
// document.querySelector(".container").style.display = 'block';
// document.querySelector("#piano-div").style.display = 'block';

$('.loading').addClass('loading-progress');
setTimeout(function() {
    $('.loading').addClass('loaded');
}, 3000)
// create Nexus UI //
Nexus.colors.accent = "transparent";

Nexus.colors.light = "url('#grad-white')";
Nexus.colors.dark = "url('#grad-black')";
Nexus.colors.mediumLight = "transparent";






var buttons = new Nexus.Piano('#Keyboard', {
    'size': [1262, 212],
    'mode': 'button', // 'button', 'toggle', or 'impulse'
    'lowNote': 24,
    'highNote': 85
});




Tone.context.latencyHint = 'interactive';

var pianO;

var pianO1 = new Tone.Sampler({

    'A0' : 'A0.[mp3]',
    'C1' : 'C1.[mp3]',
    'D#1' : 'Ds1.[mp3]',
    'F#1' : 'Fs1.[mp3]',
    'A1' : 'A1.[mp3]',
    'C2' : 'C2.[mp3]',
    'D#2' : 'Ds2.[mp3]',
    'F#2' : 'Fs2.[mp3]',
    'A2' : 'A2.[mp3]',
    'C3' : 'C3.[mp3]',
    'D#3' : 'Ds3.[mp3]',
    'F#3' : 'Fs3.[mp3]',
    'A3' : 'A3.[mp3]',
    'C4' : 'C4.[mp3]',
    'D#4' : 'Ds4.[mp3]',
    'F#4' : 'Fs4.[mp3]',
    'A4' : 'A4.[mp3]',
    'C5' : 'C5.[mp3]',
    'D#5' : 'Ds5.[mp3]',
    'F#5' : 'Fs5.[mp3]',
    'A5' : 'A5.[mp3]',
    'C6' : 'C6.[mp3]',
    'D#6' : 'Ds6.[mp3]',
    'F#6' : 'Fs6.[mp3]',
    'A6' : 'A6.[mp3]',
    'C7' : 'C7.[mp3]',
    'D#7' : 'Ds7.[mp3]',
    'F#7' : 'Fs7.[mp3]',
    'A7' : 'A7.[mp3]',
    'C8' : 'C8.[mp3]'
},
 {
    'baseUrl' : '../wp-content/themes/generatepress_child/js-dev/samples/piano/',
    curve: "exponential",
    attack: 0,
    release: 4,
    sustain: 1,
    decay: 1    
});


var pianO2 = new Tone.Sampler({

    
    'A1' : 'A1.[mp3]',
    'B1' : 'B1.[mp3]',
    'C1' : 'C1.[mp3]',
    'C2' : 'C2.[mp3]',
    'D1' : 'D1.[mp3]',
    'E1' : 'E1.[mp3]',
    'G1' : 'G1.[mp3]',

    'G3' : 'G3.[mp3]',
    'F3' : 'F3.[mp3]',
    'E3' : 'E3.[mp3]',
    'D3' : 'D3.[mp3]',
    'A3' : 'A3.[mp3]',
    'C3' : 'C3.[mp3]',
    
},
 {
    'baseUrl' : 'https://devv.virtualpiano.net/wp-content/themes/generatepress_child/js-dev/samples/new samples/',
    curve: "exponential",
    attack: 0,
    release: 4,
    sustain: 1,
    decay: 1    
});


pianO = pianO1;

/* PIANO SWITCHER */

var pianoSwitch = document.getElementById('piano-switch');

var switchClicked = false;

// pianoSwitch.addEventListener('click', function(e){
//     if(e.repeat){return};
//     pianoSwitch.classList.toggle('clicked');
//     if (!switchClicked){
//         pianoSwitch.textContent = 'PIANO NEW';
//         pianO = pianO2;
//         switchClicked = true;
        

//     } else {
        
        
//         pianoSwitch.textContent = 'PIANO 1';
//         pianO = pianO1;
//         switchClicked = false;
       
        
//     }
    
// });


var vol1 = new Tone.Volume(-10);
var vol2 = new Tone.Volume(-2);
pianO1.chain(vol1, Tone.Master);
pianO2.chain(vol2, Tone.Master);



var keyMap = {
    '1': 24,'!': 25,'2': 26,'@': 27,'3': 28,'4': 29,'$': 30,'5': 31,'%': 32,'6': 33,'ˆ': 34,'7': 35,'8': 36,'*': 37,'9': 38,'(': 39,'0': 40,'q': 41,'Q': 42,'w': 43,'W': 44,'e': 45,'E': 46,'r': 47,'t': 48,'T': 49,'y': 50,'Y': 51,'u': 52,'i': 53,'I': 54,'o': 55,'O': 56,'p': 57,'P': 58,'a': 59,'s': 60,'S': 61,'d': 62,'D': 63,'f': 64,'g': 65,'G': 66,'h': 67,'H': 68,'j': 69,'J': 70,'k': 71,'l': 72,'L': 73,'z': 74,'Z': 75,'x': 76,'c': 77,'C': 78,'v': 79,'V': 80,'b': 81,'B': 82,'n': 83,'m': 84
    };


var sustainButton = document.getElementById('sustain-button');

var sustClicked = false;

// sustainButton.addEventListener('click', function(e){
//     if(e.repeat){return};
//     sustainButton.classList.toggle('clicked');
//     if (!sustClicked){
//         sustainButton.textContent = 'SUSTAIN OFF';
//         sustClicked = true;
        
//         pianO.release = 2;

//     } else {
        
//         sustainButton.textContent = 'SUSTAIN ON';
//         sustClicked = false;
       
//         pianO.release = 10;
//     }
    
// });





    /*Press key animation TEMPORARY*/

var pressed = false;

function animateKey(id) {
    if (pressed){
        document.getElementById(id).classList.toggle("pressed");
        document.getElementById(id).parentElement.parentElement.classList.toggle('span-pressed');
        
    } else if (!pressed){
        document.getElementById(id).classList.remove("pressed");
        document.getElementById(id).parentElement.parentElement.classList.remove('span-pressed');
  
    }
    
}


buttons.on('change', function(note) {    
    
    if (note.state === true) {        
        
        pianO.triggerAttack(Tone.Frequency(note.note, "midi").toNote());
        
    } else if (note.state === false) {
        if (sustClicked){
            pianO.triggerRelease(Tone.Frequency(note.note, "midi").toNote());    
        }    
            
        
    }
});


function playInput(buttons){
document.addEventListener("keydown", (e) => {      
    if (e.repeat) { return };

 
    

       if (e.keyCode >= 48 && e.keyCode <= 90)  {
        // console.log(Tone.Frequency(keyMap[e.key], "midi").toNote());
       pianO.triggerAttack(Tone.Frequency(keyMap[e.key], "midi").toNote()); 
     //  e.preventDefault();
       pressed = true;
      
       animateKey('key_'+ keyMap[e.key]);
       
        }    
});

document.addEventListener("keyup", (e) => {      
          
    // console.log(e.key);
    if (e.keyCode >= 48 && e.keyCode <= 90)  {  
         if (sustClicked){
            pianO.triggerRelease(Tone.Frequency(keyMap[e.key], "midi").toNote());    
        }
     
     pressed = false;  
     animateKey('key_'+ keyMap[e.key]);  
     //   e.preventDefault();      
    }


    if (!$('.piano-menu__search-box').hasClass('active') && $('.piano-menu__search').hasClass('active')) {
        $('.piano-menu__played').addClass('active').siblings().removeClass('active');

        console.log(Tone.Frequency(keyMap[e.key], "midi").toNote());
        if(Tone.Frequency(keyMap[e.key], "midi").toNote() !== 'undefined-Infinity') {

            $('#piano-chord').html(Tone.Frequency(keyMap[e.key], "midi").toNote());
            $('#piano-key').html(e.key);
            $('#piano-key-history').append(e.key);
        }
        
    }
    if ($('.piano-menu__song').hasClass('active')) {
        $('.piano-menu__song-start').addClass('hidden');
    }
});

$('.piano-menu__played-back').click(function() {
    $('.piano-menu__search').addClass('active').siblings().removeClass('active');
    $('#piano-key-history').html('');
})

}

playInput();

/* RESIZER --- DON'T USE YET */

/*
var x = window.matchMedia("(max-width: 700px)");
resizePiano(x);
x.addListener(resizePiano);

function resizePiano(x) {
    if (x.matches) {
        buttons.resize(1200, 150);
        Tone.context.lookAhead = 0.1;
    } else {
       // buttons.resize(1000, 150);
        Tone.context.lookAhead = 0;
    }
}*/


/* Setting IDs for keys*/

//reordering the obj to set the ids
var keyIds = Object.values(keyMap).sort(function(a, b){return a-b});
var keyNames = Object.values(Object.fromEntries(Object.entries(keyMap).map(([k, v]) => ([v, k]))));

var sliderDiv = $('.slider');
var pianoDiv = document.getElementById('piano-body');

window.onload = function(){
    
    var keyB = document.querySelectorAll('rect');
    var keySpan = document.querySelector("#Keyboard").getElementsByTagName('span');
  
    for (var i=0; i < keyB.length; i++){
        var key = keyB[i];
        var span = keySpan[i];       
        
        if (key){
            key.setAttribute('id', 'key_'+ keyIds[i]);
              //    $('<label>'+ keyIds[i] +'<label>').appendTo(labelTarget[i]).css('position: absolute');
            if (key.getAttribute('fill') === "url('#grad-black')") {
               key.classList.add('key-black');
               span.classList.add('key-span-black');
               span.id = 'span_b_' + keyIds[i];
               $('<label class="keyassist keylabel-b">'+keyNames[i-1]+'<br>+<br>⇧' +'<label>').appendTo(span);

            } else {

              key.classList.add('key-white');
              span.classList.add('key-span-white');
              span.id = 'span_w_' + keyIds[i];
              $('<label class="keyassist keylabel-w">'+keyNames[i]+'<label>').appendTo(span);
            }                
        }              
    }


    /* RESIZE PIANO ON MOBILE */
    var screenWidth = innerWidth;
    var screenHeight = innerHeight;   


    if (screenWidth == 768 && screenWidth < screenHeight){
        buttons.resize(1800, 240);
        sliderDiv.scrollLeft((buttons.width/36)*10 + 3);

    }
    else if (screenWidth <= 813 && screenWidth < screenHeight){
        buttons.resize(1700, 240);
        sliderDiv.scrollLeft((buttons.width/36)*14 + 3);
        console.log('resized!');
    } else if (screenWidth <= 813 && screenWidth > screenHeight){
        buttons.resize(1800, 200);
        sliderDiv.scrollLeft((buttons.width/36)*10 + 3);
        pianoDiv.scrollIntoView();
        console.log('resized! mm');
    } 

        var assistButton = document.getElementById('key-assist-btn');
    var assistClicked = false;

    // assistButton.addEventListener('click', function(e) {        

    //     if (!assistClicked){
    //         assistButton.innerHTML = "key assist off";
    //         assistButton.classList.toggle('clicked');
    //         assistClicked = true;
           
    //     } else {
    //         assistButton.innerHTML = "key assist on";
    //         assistButton.classList.toggle('clicked');
    //         assistClicked = false;
    //     }

    //     let labels = document.querySelectorAll('.keyassist');
    //     for (let label of labels){
    //         label.classList.toggle('hidden');
    //     }
       
    // })
  

    // open search box
    $('.piano-menu__search-box').click(function() {
        if ($('.piano-menu__search input').val()) {
            $('.piano-menu__search-results').addClass('active');
        }
        $(this).addClass('active')
    })

    // close search box if clicked outside of search box
    $(document).on('click', function(e) {
        if ($(e.target)[0] !== $('.piano-menu__search-box')[0] && $(e.target)[0] !== $('.piano-menu__search-box input')[0]) {
            $('.piano-menu__search-box, .piano-menu__search-results').removeClass('active');
        }
    })
    $('.piano-menu__top .close').click(function() {
        $('.piano-menu__search').addClass('active').siblings().removeClass('active');
        $('.piano-menu__song-start').removeClass('hidden');
    })

    $('.piano-menu__search input').on('input', function() {
        // if search input !== 0 then reveal the search results
        if ($(this).val()) {
            $(this).next().addClass('active');
        } else {
            $(this).next().removeClass('active');
        }
    })

    // PICK A SONG FROM SEARCH
    $('.piano-menu__search-results li').click(function() {
        $('.piano-menu__song').addClass('active').siblings().removeClass('active');
    })
    
    $('.stats-toggle').click(function () {
        $(this).toggleClass('active');
        $('.piano-menu__song-stats').toggleClass('invisible');
    })

    $('.piano-menu__bottom-btn').click(function(e) {
        e.preventDefault();
        if (!$(this).hasClass('record-btn') && !$(this).hasClass('assist-btn')) {

            if (!$(this).hasClass('opened')) {
                $('.submenu').removeClass('active');
                
                if($('.submenu.dragged').length) {
                    setTimeout(function() {
                        var classAttr = $('.submenu.dragged').attr('class').split(' ')[1];
                        var menu = $('.' + classAttr).removeClass('dragged').attr('style', '').detach();
                        $('a[data-menu="' + classAttr + '"]').after(menu);
                    }, 400);
                }

                $(this).addClass('opened').parent().siblings().find('.piano-menu__bottom-btn').removeClass('opened');
                $(this).next().addClass('active');
            } else {  
                $(this).removeClass('opened');
                $('.submenu').removeClass('active');

                var classAttr = $(this).attr('data-menu');
                var that = $(this);
                setTimeout(function() {
                    that.after($('.' + classAttr).removeClass('dragged').attr('style', ''));
                }, 400);
            }
        }
        
    })

    $('.record-btn').click(function(e) {
        if ($(this).hasClass('recording')) {
            $(this).removeClass('recording').addClass('opened');
            $(this).next().addClass('active')
        } else if ($('.record').hasClass('active')) {
            $(this).removeClass('opened active');
            $(this).next().removeClass('active');
        } else {
            $(this).addClass('active recording');
        }
    });
    $('.record .close').click(function() {
        $('.record-btn').removeClass('opened active');
        $('.record').removeClass('active');
    })
     $('.record__play-btn').click(function(e) {
        $(this).toggleClass('played');
     });

    // $('.assist-btn').click(function() {
    //     if ($(this).hasClass('active')) {
    //         $(this).removeClass('active');
    //         $('.keyassist').css({'opacity': '0', 'transition': '.3s'});
    //     } else {
    //         $(this).addClass('active');
    //         $('.keyassist').css({'opacity': '1', 'transition': '.3s'});
    //     }
    // })
    // $('.assist-btn').trigger('click');

    var dragBlocks = document.querySelectorAll('.submenu');
    dragBlocks.forEach((el) => {
        el.onmousedown = function(event) {
          if (event.target.classList.contains('submenu')) {
            let shiftX = event.clientX - el.getBoundingClientRect().left;
            let shiftY = event.clientY - el.getBoundingClientRect().top;

            $(el).addClass('dragged');
            el.style.position = 'absolute';
            el.style.zIndex = 1000;
            el.style.transition = '0s';
            document.body.append(el);

            moveAt(event.pageX, event.pageY);

            // moves the dragBlock at (pageX, pageY) coordinates
            // taking initial shifts into account
            function moveAt(pageX, pageY) {
              el.style.left = pageX - shiftX + 'px';
              el.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
              moveAt(event.pageX, event.pageY);
            }

            // move the dragBlock on mousemove
            document.addEventListener('mousemove', onMouseMove);

            // drop the dragBlock, remove unneeded handlers
            el.onmouseup = function() {
              document.removeEventListener('mousemove', onMouseMove);
              el.onmouseup = null;
              el.style.transition = '0.4s';
            };

          }
          
        };

        el.ondragstart = function() {
          return false;
        };
    });

  

    $('.metronome__play').click(function() {
        $(this).toggleClass('played');
        $('.metronome-btn').toggleClass('active');
    })

    $('.transpose__sign').click(function(e) {
        var value = $('.transpose__value span').html();
        if ($(this).hasClass('increment')) {
            if (value < 5) value++;
        } else if (value > -5) {
            value--;
        }

        if (value > 0 && value <= 5) {
            value = '+' + +value;
        }
        $('.transpose__value span').html(value);
        checkSoundModification();
    });
    $('.type__current').click(function(e) {
        $(this).parents('.type').toggleClass('active');
    });
    $('.type__custom li').click(function(e) {
        $(this).addClass('active').siblings().removeClass('active');
        $('.type').removeClass('active');
        $(this).parents('.type').find('option').eq($(this).index()).prop('selected', true);
        $(this).parents('.type').find('.type__current').html($(this).parents('.type').find('option:selected').html());

        checkSoundModification();
    });
    
    $('.sound input').change(function() {
        checkSoundModification();
    });
    $('.sustain input').change(function () {
        if ($(this).is(':checked')) {
            console.log('checked');
        } else {
            console.log('not');
        }
    })
    function checkSoundModification() {
        if (!$('.sustain input').prop('checked') || $('.transpose__value span').html() !== '0' || $('.type option:selected').val() !== 'CLASSICAL PIANO') {
            $('.sound-btn').addClass('active');
        } else {
            $('.sound-btn').removeClass('active');
        }
    }
    $(document).on('click', '.submenu .close', function(){
        $('.submenu').removeClass('active');
        $('.piano-menu__bottom a').removeClass('opened');

        var that = $(this);
        setTimeout(function() {
            var classAttr = that.parent().attr('class').split(' ')[1];
            var menu = that.parent().removeClass('dragged').attr('style', '').detach();
            $('a[data-menu="' + classAttr + '"]').after(menu);
        }, 400);
    })
}


var buttonSingle = document.getElementById('Keyboard').firstElementChild.childNodes;

for (var button of buttonSingle){
    button.addEventListener("touchstart", function (e) {
       
        e.currentTarget.classList.add('span-pressed')
    });
    button.addEventListener("touchmove", function (e) {
        
        var location = e.changedTouches[0];       
        var targetNow = document.elementFromPoint(location.clientX, location.clientY);
        targetNow.classList.add('span-pressed');
        location.target.classList.remove('span-pressed');     
      
       // realTarget.classList.remove('span-pressed')
    });

    button.addEventListener("touchend", function (e) {
        
        e.currentTarget.classList.remove('span-pressed');
      
       // realTarget.classList.remove('span-pressed')
    });


    
}
