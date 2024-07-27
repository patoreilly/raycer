

var Menu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Menu ()
    {
        Phaser.Scene.call(this, 'menu');
    },
    init: function (data)
    {
        
    },

    preload: function ()
    {
        // // load audio assets

        // this.load.audioSprite('sfx', 'audio/horizon6_sounds.json', [
        // 'audio/horizon6_sounds.ogg',
        // 'audio/horizon6_sounds.mp3'
        // ]);

        // this.load.audio('theme', [
        // 'audio/miltonatmidnight.ogg',
        // 'audio/miltonatmidnight.mp3'
        // ]);
        

        // load gui assets

        // this.load.image('Hat Trick Hero', 'gui/Hat Trick Hero 95 (modified_sm).png');

        // this.load.image('dragonfly_title', 'gui/dragonfly_title.png');

        this.load.spritesheet('flybug', 'gui/fly1_sheet1.png',{ frameWidth: 52, frameHeight: 34 });

        this.load.image('Afterburner', 'gui/Afterburner (Sega).png');

        // this.load.image('Major Title', 'gui/Major Title (IREM).png');

        this.load.image('load_scrn_bkgd', 'gui/super-cycle_3.gif');

        ///// testing
        this.load.image('Nintendo', 'gui/Super Mario Bros 3 (Nintendo).png');
        //////

        this.load.image('mousekeys_icon', 'gui/mousekeys_icon.png');
        this.load.image('touch_icon', 'gui/touch_icon.png');
        this.load.image('gamepad_icon', 'gui/gamepad_icon.png');        


        // load game assets
        this.load.image('raycer_cycle', 'sprites/raycer_cycle.png');
        this.load.image('raycer_cycle_L', 'sprites/raycer_cycle_L.png');
        this.load.image('raycer_cycle_R', 'sprites/raycer_cycle_R.png');
        //////////////////
        
        loadfile_index = 0;

        var progress = this.add.graphics().setDepth(99);

        var text = this.add.text(10, 50, '(debug text)', { font: '10px Courier', fill: '#ffffff' }).setDepth(99);
        var text2 = this.add.text(10, 72, '(debug text)', { font: '10px Courier', fill: '#ffffff' }).setDepth(99);
        

        this.load.on('progress', function (value) {
            text.setText('loading...'+Math.floor(100*value)+'%');
            progress.clear();
            progress.fillStyle(0x33ff04, 1);
            progress.fillRect(0, 40, 320 * value, 10);
        });
        
        this.load.on('fileprogress', function (file,value) {
            //text.setText(Math.floor(100*value)+'%');          
            text2.setText(file.key);            
            // text3.setText(value);
            // progress.clear();
            // progress.fillStyle(0x00cc11, 1);
            // progress.fillRect(0, 0, 320 * value, 5);            
        });

        this.load.on('filecomplete', this.showFile, this);

        this.load.on('complete', function () {

            progress.destroy();            
            text.destroy();
            text2.destroy();
            for (var e=0; e<file_thumbs.length; e++)
            {
                file_thumbs[e].destroy();
            }
            

        });

    },


    showFile: function (key, type, texture)
    {
        file_thumbs[loadfile_index] = this.add.image(10+20*(loadfile_index%16), 100+20*(Math.floor(loadfile_index/16)), key).setDisplaySize(20, 20);
        

        
        loadfile_index++;

        if (key=='load_scrn_bkgd')
        {
            this.add.image(0, 0, key).setOrigin(0).setDisplaySize(320, 200);
        }

        if (key=='Nintendo')
        {
            var config3 = {
            image: 'Nintendo',
            width: 8,
            height: 8,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 96,
            spacing: { x: 0, y: 0 },
            offset: {y:0}
            };

            this.cache.bitmapFont.add('ab_headtext', Phaser.GameObjects.RetroFont.Parse(this, config3));

            hsv = Phaser.Display.Color.HSVColorWheel();

            var text0 = this.add.dynamicBitmapText(0, 0, 'ab_headtext', 'DragonFLY').setOrigin(0).setScale(1).setPosition(4,4).setDepth(200);
            var text1 = this.add.dynamicBitmapText(0, 0, 'ab_headtext', '          Engine').setOrigin(0).setScale(1).setPosition(4,4).setDepth(200);
            var text2 = this.add.dynamicBitmapText(0, 0, 'ab_headtext', 'v 0.4 demo').setOrigin(0).setScale(1).setPosition(4,14).setDepth(200);

            text0.setDisplayCallback(this.textCallback);
        } 
    },

    textCallback: function (data) 
    {


        data.tint.topLeft = hsv[Math.floor(i)].color;
        

        i += 0.5;

        if (i >= hsv.length)
        {
            i = 0;
        }
        // data.parent.alpha -= .0005;
        // if (data.parent.alpha<.5) data.parent.alpha=1.0;
        //console.log(data);
        

        return data;
    },
    
    
    create: function ()
    {
        startFlag=false;

        
        //this.textures.generate('chunk3', { data: ['3'], pixelWidth: 1});

        

        //bgimg = this.add.image(0,0,'chunk3').setAlpha(.25).setOrigin(0).setDisplaySize(320,200).setDepth(0);


        //  animated sprite set up for 2d display purpose 
            //  must be loaded as .spritesheet with frame params and added as .sprite
            var randomKey3 = Math.random().toString();

            this.anims.create({
                key: randomKey3,
                frames: this.anims.generateFrameNumbers('flybug'),
                frameRate: 60,
                repeat: -1
                //yoyo: true
            });

        
            var flysprite = this.add.sprite(280, 10, 'flybug').play(randomKey3).setOrigin(0).setScale(.5);

            this.tweens.add({
                targets: flysprite,
                y: 30,
                ease: 'Sine.easeInOut',
                duration: 600,
                yoyo: true,
                repeat: -1
            });

       

        var config2 = {
            image: 'Afterburner',
            width: 8,
            height: 8,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 96,
            spacing: { x: 0, y: 0 },
            lineSpacing: 8,
            offset: {y:40}
        };

        var config1 = {
            image: 'Afterburner',
            width: 8,
            height: 8,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 96,
            spacing: { x: 0, y: 0 },
            lineSpacing: 8,
            offset: {y:24}
        };

        this.cache.bitmapFont.add('Afterburner', Phaser.GameObjects.RetroFont.Parse(this, config2));
        this.cache.bitmapFont.add('Afterburner1', Phaser.GameObjects.RetroFont.Parse(this, config1));

        var text1 = this.add.dynamicBitmapText(0, 0, 'Afterburner', " keyboard mouse \n ").setOrigin(0.5).setScale(1).setCenterAlign().setPosition(160,60).setDepth(100);
        var text2 = this.add.dynamicBitmapText(0, 0, 'Afterburner1', " touchscreen \n ").setOrigin(0.5).setScale(1).setCenterAlign().setPosition(160,110).setDepth(100);
        var text3 = this.add.dynamicBitmapText(0, 0, 'Afterburner', " gamepad \n ").setOrigin(0.5).setScale(1).setCenterAlign().setPosition(160,160).setDepth(100);
        
         
        
        var hitarea1 = this.add.rectangle(text1.x, text1.y, text1.width + 20, text1.height + 16, 0x00ff00, 0.45).setInteractive();
        var hitarea2 = this.add.rectangle(text2.x, text2.y, text2.width + 20, text2.height + 16, 0xff00ff, 0.45).setInteractive();
        var hitarea3 = this.add.rectangle(text3.x, text3.y, text3.width + 20, text3.height + 16, 0x00ffff, 0.45).setInteractive();

        this.add.sprite(160, 60, 'mousekeys_icon').setOrigin(.5,0).setScale(1);   
        this.add.sprite(160, 110, 'touch_icon').setOrigin(.5,0).setScale(1);   
        this.add.sprite(160, 160, 'gamepad_icon').setOrigin(.5,0).setScale(1);  


        hitarea1.on('pointerup', function () {
             
            sound_enabled = true;

            //this.scale.startFullscreen();

            //screen.orientation.lock('landscape');
            
            touchActivated = false;


            // music = this.sound.add('theme');
            // music.play({loop: true});

            this.add.dynamicBitmapText(0, 0, 'Afterburner1', 'getting ready..').setOrigin(0.5).setScale(2).setCenterAlign().setPosition(160,100).setDepth(100);
            startFlag=true;//this.scene.start('demo');
            

        }, this);

        hitarea2.on('pointerup', function () {

            sound_enabled = true;

            //this.scale.startFullscreen();

            //screen.orientation.lock('landscape');
            
            touchActivated = true;

            // music = this.sound.add('theme');
            // music.play({loop: true});

            this.add.dynamicBitmapText(0, 0, 'Afterburner1', 'getting ready..').setOrigin(0.5).setScale(2).setCenterAlign().setPosition(160,100).setDepth(100);
            startFlag=true;//this.scene.start('demo');
            

        }, this);

        hitarea3.on('pointerup', function () {

            sound_enabled = true;

            //this.scale.startFullscreen();

            //screen.orientation.lock('landscape');
            
            touchActivated = false;

            // music = this.sound.add('theme');
            // music.play({loop: true});

            this.add.dynamicBitmapText(0, 0, 'Afterburner1', 'getting ready..').setOrigin(0.5).setScale(2).setCenterAlign().setPosition(160,100).setDepth(100);
            startFlag=true;//this.scene.start('demo');
            

        }, this);

        
        this.input.gamepad.once('down', function (pad, button, index) {

        //text_gamepad.setText('Playing with ' + pad.id + ' index: ' + pad.index);

        pad.setAxisThreshold(0.3);

        gamepad = pad;

        sound_enabled = true;

        //this.scale.startFullscreen();

        touchActivated = false;


        // music = this.sound.add('theme');
        // music.play({loop: true});

        

        this.add.dynamicBitmapText(0, 0, 'Afterburner1', 'getting ready..').setOrigin(0.5).setScale(2).setCenterAlign().setPosition(160,100).setDepth(100);
        startFlag=true;//this.scene.start('demo');

        }, this);


        
        text5 = this.add.dynamicBitmapText(0, 0, 'ab_headtext', 'no gamepad detected').setOrigin(0).setScale(1).setPosition(320,190).setDepth(200);

        this.tweens.add({
            targets: text5,
            x: -320,
            ease: 'none',
            duration: 4000,
            yoyo: false,
            repeat: -1
        });
        
        

        

        this.events.on('shutdown', this.shutdown, this);
    },

    shutdown: function ()
    {

        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    },
    update: function ()
    {
        



        if (startFlag)
        {
            this.scene.start('demo');
        }        
        else if (this.input.gamepad.total === 0)// exit update loop if no gamepad detected
        {
            return;
        }

        


        
        var pads = this.input.gamepad.gamepads;
        var pad;

        for (var i = 0; i < pads.length; i++)
        {
            pad = pads[i];

            if (!pad)
            {
                continue;
            }
            else
            {
                text5.setText('gamepad detected press any button '+pad.id );
            }
        }
        
        

        


        
        

    }

});


var Demo = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Demo ()
    {
        Phaser.Scene.call(this, { key: 'demo' });
    },

    init: function (data)
    {
        
    },

    preload: function ()
    {
        

    },

    create: function ()
    {
        // global
        

        this.fDistance = 0.0;        // Distance car has travelled around track
        this.fCurvature = 0.0;        // Current track curvature, lerped between track sections
        this.fTrackCurvature = 0.0;   // Accumulation of track curvature
        this.fTrackDistance = 0.0;    // Total distance of track

        this.fCarPos = 0.0;           // Current car position
        this.fPlayerCurvature = 0.0;          // Accumulation of player curvature
        this.fSpeed = 0.0;            // Current player speed
        this.listLapTimes = [0,0,0,0,0];       // List of previous lap times
        this.fCurrentLapTime = 0.0;          // Current lap time

        this.vecTrack = []; // Track sections, sharpness of bend, length of section

        // Define track
        this.vecTrack.push( {curvature:0.0, distance:10.0} );     // Short section for start/finish line
        this.vecTrack.push( {curvature:0.0, distance:200.0} );
        this.vecTrack.push( {curvature:1.0, distance:200.0} );
        this.vecTrack.push( {curvature:0.0, distance:400.0} );
        this.vecTrack.push( {curvature:-1.0, distance:100.0} );
        this.vecTrack.push( {curvature:0.0, distance:200.0} );
        this.vecTrack.push( {curvature:-1.0, distance:200.0} );
        this.vecTrack.push( {curvature:1.0, distance:200.0} );
        this.vecTrack.push( {curvature:0.0, distance:200.0} );
        this.vecTrack.push( {curvature:0.2, distance:500.0} );
        this.vecTrack.push( {curvature:0.0, distance:200.0} );

        // Calculate total track distance, so we can set lap times
        for (var i=0; i<this.vecTrack.length; i++)
        {
            this.fTrackDistance += this.vecTrack[i].distance;
        }
            

        
        

        

        // game resolution settings
        this.GameHeight = 200;
        this.GameWidth = 320;
        
        // game display buffer
        this.gamedisplay = {};
        this.gamedisplay.buffer = this.textures.createCanvas('gamedisplaycanvas', this.GameWidth, this.GameHeight); 
        this.gamedisplay.context = this.gamedisplay.buffer.getContext('2d', {willReadFrequently:true});
        this.gamedisplay.imagedata =  this.gamedisplay.context.getImageData(0,0,this.gamedisplay.buffer.width, this.gamedisplay.buffer.height);
        this.gamedisplay.pixels = this.gamedisplay.imagedata.data;

        this.add.image(0,0,'gamedisplaycanvas').setOrigin(0).setScale(1);
        this.raycer_cycle_sprite = this.add.image(0,0,'raycer_cycle');

        //input 
        cursors = this.input.keyboard.createCursorKeys();

        /// activates gamepad in this scene

        this.input.gamepad.once('down', function (pad, button, index) {

        pad.setAxisThreshold(0.3);

        gamepad = pad;

        }, this);
        

    }, ////// END OF create()

    
    
    update: function()
    {
        var fElapsedTime = .0000001 * game.loop.now;



        // Handle control input
        var nCarDirection = 0;


        if (!gamepad)
        {
            if (cursors.up.isDown)
                this.fSpeed += 2.0 * fElapsedTime;
            else
                this.fSpeed -= 1.0 * fElapsedTime;

            // Car Curvature is accumulated left/right input, but inversely proportional to speed
            // i.e. it is harder to turn at high speed
            if (cursors.left.isDown)
            {
                this.fPlayerCurvature -= 2.0 * fElapsedTime * (1.0 - this.fSpeed / 2.0);
                nCarDirection = -1;
            }

            if (cursors.right.isDown)
            {
                this.fPlayerCurvature += 2.0 * fElapsedTime * (1.0 - this.fSpeed / 2.0);
                nCarDirection = +1;
            }
        }
            
        else
        {
            if (gamepad.up)
                this.fSpeed += 2.0 * fElapsedTime;
            else
                this.fSpeed -= 1.0 * fElapsedTime;

            // Car Curvature is accumulated left/right input, but inversely proportional to speed
            // i.e. it is harder to turn at high speed
            if (gamepad.left)
            {
                this.fPlayerCurvature -= 2.0 * fElapsedTime * (1.0 - this.fSpeed / 2.0);
                nCarDirection = -1;
            }

            if (gamepad.right)
            {
                this.fPlayerCurvature += 2.0 * fElapsedTime * (1.0 - this.fSpeed / 2.0);
                nCarDirection = +1;
            }            
        }

        



        // If car curvature is too different to track curvature, slow down
        // as car has gone off track
        if (Math.abs(this.fPlayerCurvature - this.fTrackCurvature) >= 0.8)
            this.fSpeed -= 5.0 * fElapsedTime;

        // Clamp Speed
        if (this.fSpeed < 0.0)  this.fSpeed = 0.0;
        if (this.fSpeed > 1.0)  this.fSpeed = 1.0;
        
        // Move car along track according to car speed
        this.fDistance += (70.0 * this.fSpeed) * fElapsedTime;

        //this.fDistance += fElapsedTime;
        
        // Get Point on track
        var fOffset = 0.0;
        var nTrackSection = 0;

        // Lap Timing and counting
        this.fCurrentLapTime += fElapsedTime;
        if (this.fDistance >= this.fTrackDistance)
        {
            this.fDistance -= this.fTrackDistance;
            this.listLapTimes.unshift(this.fCurrentLapTime);
            this.listLapTimes.pop();
            this.fCurrentLapTime = 0.0;
        }
        
        // Find position on track (could optimise)
        while (nTrackSection < this.vecTrack.length && fOffset <= this.fDistance)
        {           
            fOffset += this.vecTrack[nTrackSection].distance;
            nTrackSection++;
        }
        
        // Interpolate towards target track curvature
        var fTargetCurvature = this.vecTrack[nTrackSection - 1].curvature;
        var fTrackCurveDiff = (fTargetCurvature - this.fCurvature) * fElapsedTime * this.fSpeed;

        // Accumulate player curvature
        this.fCurvature += fTrackCurveDiff;

        // Accumulate track curvature
        this.fTrackCurvature += (this.fCurvature) * fElapsedTime * this.fSpeed;



        // Draw Sky - light blue and dark blue
        for (var y = 0; y < this.GameHeight / 2; y++)
            for (var x = 0; x < this.GameWidth; x++)
                this.drawPixel(x, y, y< this.GameHeight / 4 ?  'cyan' : 'blue' );



        // Draw Scenery - our hills are a rectified sine wave, where the phase is adjusted by the
        // accumulated track curvature
        for (var x = 0; x < this.GameWidth; x++)
        {
            var nHillHeight = Math.round(Math.abs(Math.sin(x * 0.01 + this.fTrackCurvature) * 16.0));
            for (var y = (this.GameHeight / 2) - nHillHeight; y < this.GameHeight / 2; y++)
                this.drawPixel(x, y, 'orange');
        }




        // Draw Track - Each row is split into grass, clip-board and track
        for (var y = 0; y < this.GameHeight / 2; y++)
        {
            for (var x = 0; x < this.GameWidth; x++)
            {
                
                

                // Perspective is used to modify the width of the track row segments
                var fPerspective = y / (this.GameHeight/2.0);
                var fRoadWidth = 0.02 + fPerspective * 0.8; // Min 10% Max 90%
                var fClipWidth = fRoadWidth * 0.15;
                fRoadWidth *= 0.5; // Halve it as track is symmetrical around center of track, but offset...

                // ...depending on where the middle point is, which is defined by the current
                // track curvature.
                var fMiddlePoint = 0.5 + this.fCurvature * Math.pow((1.0 - fPerspective), 3);

                

                // Work out segment boundaries
                var nLeftGrass = Math.round( (fMiddlePoint - fRoadWidth - fClipWidth) * this.GameWidth );
                var nLeftClip = Math.round( (fMiddlePoint - fRoadWidth) * this.GameWidth );
                var nRightClip = Math.round( (fMiddlePoint + fRoadWidth) * this.GameWidth );
                var nRightGrass = Math.round( (fMiddlePoint + fRoadWidth + fClipWidth) * this.GameWidth );
                
                var nRow = this.GameHeight / 2 + y;

                // Using periodic oscillatory functions to give lines, where the phase is controlled
                // by the distance around the track. These take some fine tuning to give the right "feel"
                var nGrassColour = Math.sin(20.0 *  Math.pow(1.0 - fPerspective,3) + this.fDistance * 0.1) > 0.0 ? 'green' : 'darkgreen';
                var nClipColour = Math.sin(40.0 *  Math.pow(1.0 - fPerspective, 3) + this.fDistance) > 0.0 ? 'red' : 'white';
                
                // Start finish straight changes the road colour to inform the player lap is reset
                //int nRoadColour = (nTrackSection-1) == 0 ? FG_WHITE : FG_GREY;

                // Draw the row segments
                if (x >= 0 && x < nLeftGrass)
                    this.drawPixel(x, nRow, nGrassColour);
                if (x >= nLeftGrass && x < nLeftClip)
                    this.drawPixel(x, nRow, nClipColour);
                if (x >= nLeftClip && x < nRightClip)
                    this.drawPixel(x, nRow, 'grey');
                if (x >= nRightClip && x < nRightGrass)
                    this.drawPixel(x, nRow, nClipColour);
                if (x >= nRightGrass && x < this.GameWidth)
                    this.drawPixel(x, nRow, nGrassColour);

            }
        }
        this.gamedisplay.context.putImageData(this.gamedisplay.imagedata,0,0);
        this.gamedisplay.buffer.refresh();

        // Draw Car - car position on road is proportional to difference between
        // current accumulated track curvature, and current accumulated player curvature
        // i.e. if they are similar, the car will be in the middle of the track
        this.fCarPos = this.fPlayerCurvature - this.fTrackCurvature;
        var nCarPos = this.GameWidth / 2 + Math.round((this.GameWidth * this.fCarPos) / 2.0); 

        // Draw a car that represents what the player is doing. Apologies for the quality
        // of the sprite... :-(
        switch (nCarDirection)
        {
        case 0:
            this.raycer_cycle_sprite.setPosition(nCarPos,164).setTexture('raycer_cycle');
            break;

        case +1:
            this.raycer_cycle_sprite.setPosition(nCarPos,164).setTexture('raycer_cycle_R');
            break;

        case -1:
            this.raycer_cycle_sprite.setPosition(nCarPos,164).setTexture('raycer_cycle_L');
            break;
        }
    
    },

    drawPixel: function(xpos,ypos,colorkey)
    {
        var r,g,b;

        if (colorkey=='red') { r=255; g=0; b=0; }
        if (colorkey=='green') { r=0; g=255; b=0; }
        if (colorkey=='darkgreen') { r=20; g=200; b=20; }
        if (colorkey=='blue') { r=0; g=0; b=255; }
        if (colorkey=='orange') { r=255; g=255; b=0; }
        if (colorkey=='cyan') { r=0; g=255; b=255; }
        if (colorkey=='violet') { r=255; g=0; b=255; }
        if (colorkey=='white') { r=255; g=255; b=255; }
        if (colorkey=='grey') { r=200; g=200; b=200; }

        var bytesPerPixel=4;
        var targetIndex=(this.gamedisplay.buffer.width*bytesPerPixel*ypos) + (bytesPerPixel*xpos);     
        this.gamedisplay.pixels[targetIndex]=r;
        this.gamedisplay.pixels[targetIndex+1]=g;
        this.gamedisplay.pixels[targetIndex+2]=b;
        this.gamedisplay.pixels[targetIndex+3]=255;
    }

    

});



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
    scene: [Menu, Demo]
};

var game = new Phaser.Game(config);

var file_thumbs = [];
var allImageKeys = [];

var sound_enabled;
var music;

//for textcallback
var i = 0;
var j = 1.0; 
var hsv = [];
var hsvindex=0;
//









var audioIndex=0;
var touchActivated=false;
var gamepad=false;
var soundfx_enabled = false;

var keys;
var cursors;

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



