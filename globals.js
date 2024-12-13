var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 320,
    height: 200,
    transparent: true,
    roundPixels: true,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 0 },
            debug: false
        }
    },

    input: {
        gamepad: true
    },
    scale: {
        mode: Phaser.Scale.EXACT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 320,
        height: 200
    },
    audio: {
        disableWebAudio: true
    },
    scene: [Setup, Raycer, Hud, Menus, Touchgui, About, Title ]
};

var game = new Phaser.Game(config);

var debug;

var file_thumbs = [];
var allImageKeys = [];

//for textcallback
var i = 0;
var j = 1.0; 
var hsv = [];
var hsvindex=0;
//

var menu_mode=true;

var sound_enabled;
var music;
var SIDplayer;
var audioIndex=0;
var touchActivated=false;
var gamepad=false;

var keys;
var cursors;
                            
var guide_multi_activeY;
var guide_multi;
var guide_zspeed;
var guide_left;
var guide_right;
var guide_forward;
var guide_back;
var guide_up;
var guide_down;

var gTouching = false;
var guiLeft = false;
var guiRight = false;
var guiForward = false;
var guiBack = false;
var guiUp = false;
var guiDown = false;

var access_menu;
var accessMenuData = [
"................",
"................",
"................",
"..222222222222..",
"..222222222222..",
"................",
"................",
"..222222222222..",
"..222222222222..",
"................",
"................",
"..222222222222..",
"..222222222222..",
"................",
"................",
"................"
];

var guideInputHorizontalData = [
".........22.....",
"........222.....",
".......2222.....",
"......22222.....",
".....222222.....",
"....2222222.....",
"...22222222.....",
"..222222222.....",
"..222222222.....",
"...22222222.....",
"....2222222.....",
".....222222.....",
"......22222.....",
".......2222.....",
"........222.....",
".........22....."
];


var guideInputVerticalData = [
"................",
"................",
".......22.......",
"......2222......",
".....222222.....",
"....22222222....",
"...2222222222...",
"..222222222222..",
".22222222222222.",
"2222222222222222",
"2222222222222222",
"................",
"................",
"................",
"................",
"................"
];


var sound_off = [
"................",
".......2........",
"......22........",
".....2.2........",
"....2..2........",
".222...2.2....2.",
".2.....2..2..2..",
".2.....2...22...",
".2.....2...22...",
".2.....2..2..2..",
".222...2.2....2.",
"....2..2........",
".....2.2........",
"......22........",
".......2........",
"................"];

var sound_on = [
"................",
".......2........",
"......22........",
".....2.2...2....",
"....2..2....2...",
".222...2.2...2..",
".2.....2..2..2..",
".2.....2..2..2..",
".2.....2..2..2..",
".2.....2..2..2..",
".222...2.2...2..",
"....2..2....2...",
".....2.2...2....",
"......22........",
".......2........",
"................"];



var audioList = [
'3_Days.sid',
'Agent_of_Lies.sid',
'Eighties_Megahit.sid',
'A_True_Story.sid',
'Matrix_01.sid',
'Gorilla.sid',
'Methane_01.sid',
'GULBdata.sid',
'Long_Train_Running.sid',
'Lumina.sid',
'New_Blood.sid',
'One_Must_Fall_2097.sid',
'Glowtones.sid',
'Gamma_9_Sound.sid',
'Hearesy.sid',
'Helikopter.sid'
'Holocaust_Intro.sid',
'Jamaica_10_intro.sid'
];

var palette_raycer = {

    0: '#FFFFFF', //white
    1: '#FCDD09', //yellow
    2: '#EB7710', //orange
    3: '#DA131A', //red
    4: '#732C64', //purple
    5: '#1047AE', //blue
    6: '#07892F', //darkgreen
    7: '#00FF00', //brightgreen
    8: '#999999'  //grey
};
