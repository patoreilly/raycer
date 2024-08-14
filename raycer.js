

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
        this.load.script('jsSID', 'jsSID.js');

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
        this.load.image('background', 'sprites/backscroll4.png');
        this.load.image('ground', 'sprites/ground_sand.png')
        this.load.image('raycer_cycle', 'sprites/raycer_cycle.png');
        this.load.image('raycer_cycle_L', 'sprites/raycer_cycle_L.png');
        this.load.image('raycer_cycle_R', 'sprites/raycer_cycle_R.png');
        this.load.image('rock', 'sprites/rock8.png');
        this.load.image('bump', 'sprites/bump1.png');
        this.load.image('atari_sign', 'sprites/wallq.png');

        this.load.image('tree4', 'sprites/tree4.png');
        this.load.image('tree5', 'sprites/tree5.png');
        this.load.image('tree6', 'sprites/tree6.png');
        this.load.image('tree7', 'sprites/tree7.png');
        this.load.image('tree8', 'sprites/tree8.png');
        this.load.image('tree9', 'sprites/tree9.png');


        for (var l = 0; l < audioList.length; l++)
        {
            this.load.binary(audioList[l], 'audio/'+audioList[l]);
            //files.push(wallList[j]);
        }


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

        // access to functions belonging to other scenes in Phaser: this.scene.get
        // use worker variable to hold the scene object accessed thru scene key
        // i.e.

        //var demo = this.scene.get('demo');

        // where the worker and the key are the same name
        // thus, 'this.myfunction()' becomes 'scenekey.myfunction()'




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

            this.scale.startFullscreen();

            screen.orientation.lock('landscape');
            
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
        this.globalStartTime; 
        this.newLapTimeMark;
        
        

        this.fDistance = 0.0;        // Distance car has travelled around track in 'meters'
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
        this.vecTrack.push( {curvature:0.0, distance:100.0} );     // Short section for start/finish line
        this.vecTrack.push( {curvature:-0.5, distance:200.0} );
        this.vecTrack.push( {curvature:0.25, distance:200.0} );
        this.vecTrack.push( {curvature:-1.0, distance:400.0} );
        this.vecTrack.push( {curvature:0.15, distance:100.0} );
        this.vecTrack.push( {curvature:1.0, distance:200.0} );
        this.vecTrack.push( {curvature:-0.25, distance:200.0} );
        this.vecTrack.push( {curvature:0.9, distance:400.0} );
        this.vecTrack.push( {curvature:-0.9, distance:100.0} );
        this.vecTrack.push( {curvature:0.3, distance:200.0} );
        
        this.vecTrack.push( {curvature:0.0, distance:200.0} );

        // Calculate total track distance, so we can set lap times
        for (var i=0; i<this.vecTrack.length; i++)
        {
            this.fTrackDistance += this.vecTrack[i].distance;
        }
            

        
        

        

        // game resolution settings
        this.GameHeight = 200;
        this.GameWidth = 320;
        


        // ground buffer (image data for ground animation)
        this.ground = {};
        this.ground.srcimg = this.textures.get('ground').getSourceImage();
        var width = this.ground.srcimg.width;
        var height = this.ground.srcimg.height
        this.ground.buffer = this.textures.createCanvas('groundcanvas', width, height); 
        this.ground.context = this.ground.buffer.getContext('2d', {willReadFrequently:true});

        for (var y=0; y<100; y++)
        {
            var _rowZ = 100 - y;

            var perspective = ((_rowZ)*(_rowZ)*(_rowZ))/1100000;
            // / (this.GameHeight/2.0);

            //var perspective = y/100;

            var pWidth = 320 * (perspective);

            var xOffset = Math.floor((320-pWidth)*.5);

            //console.log(y,_rowZ,perspective,pWidth,xOffset);

            this.ground.context.drawImage(this.ground.srcimg, xOffset, y,pWidth,1,0,y,320,1);

        }
        


        this.ground.imagedata =  this.ground.context.getImageData(0,0,width, height);
        this.ground.pixels = this.ground.imagedata.data;
        this.ground.buffer.refresh();

        // game display buffer (outputs primary game mechanic for road animation)
        this.gamedisplay = {};
        this.gamedisplay.buffer = this.textures.createCanvas('gamedisplaycanvas', this.GameWidth, this.GameHeight/2); 
        this.gamedisplay.context = this.gamedisplay.buffer.getContext('2d', {willReadFrequently:true});

        //this.gamedisplay.context.drawImage(this.ground.srcimg,0,0,this.ground.srcimg.width,this.ground.srcimg.height,0,0,this.gamedisplay.buffer.width,this.gamedisplay.buffer.height);
        
        this.gamedisplay.imagedata =  this.gamedisplay.context.getImageData(0,0,this.gamedisplay.buffer.width, this.gamedisplay.buffer.height);
        this.gamedisplay.pixels = this.gamedisplay.imagedata.data;
        // init images of background, ground, scenery, obstacles, gamedisplay, cycle sprite

        this.background_image = this.add.image(0,0,'background').setOrigin(0).setScale(1);
        this.background_arc = 0;

        this.add.image(0,this.GameHeight/2,'gamedisplaycanvas').setOrigin(0).setScale(1).setDepth(1);

        //this.add.image(0,100,'groundcanvas').setOrigin(0).setScale(1).setDepth(201);
        
        this.raycer_cycle_sprite = this.add.image(0,0,'raycer_cycle').setDepth(200);

        
        //total set of road objects
        this.road_group = this.add.group();
        this.road_groupArray = this.road_group.getChildren();

        var road_sprite; //worker just to init sprites in group

        for (var i = 0; i < 20; i++)
        {
            road_sprite = this.add.image(0,0,'rock').setOrigin(.5,.5).setVisible(false);
            road_sprite.label = 'rock';
            road_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance), position:0.0};
            var spriteDepth = 100 - Math.floor(100*(road_sprite.location.distance/this.fTrackDistance));
            
            road_sprite.setDepth(spriteDepth);

            this.road_group.add(road_sprite);
        }

        for (var i = 0; i < 20; i++)
        {
            road_sprite = this.add.image(0,0,'bump').setOrigin(.5,.5).setVisible(false);
            road_sprite.label = 'bump';
            road_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance), position:0.0};
            var spriteDepth = 100 - Math.floor(100*(road_sprite.location.distance/this.fTrackDistance));
            road_sprite.setDepth(spriteDepth);

            this.road_group.add(road_sprite);
        }


        //total set of scenery objects
        this.scenery_group = this.add.group();
        this.scenery_groupArray = this.scenery_group.getChildren();

        var scenery_sprite; //worker just to init sprites in group

        for (var i = 0; i < 50; i++)
        {
            scenery_sprite = this.add.image(0,0,'tree'+Phaser.Math.Between(4,9)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'tree';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance), orientation:'left'};
            var spriteDepth = 100-Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group.add(scenery_sprite);

            scenery_sprite = this.add.image(0,0,'tree'+Phaser.Math.Between(4,9)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'tree';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,2200), orientation:'right'};
            var spriteDepth = 100 - Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group.add(scenery_sprite);

            
        }

        for (var i = 0; i < 10; i++)
        {
            scenery_sprite = this.add.image(0,0,'atari_sign').setOrigin(0,1.0).setVisible(false);
            scenery_sprite.label = 'atari_sign';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,2200), orientation:'right'};
            var spriteDepth = 100 - Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group.add(scenery_sprite);
        }


        /// keyboard input 
        cursors = this.input.keyboard.createCursorKeys();

        /// activates gamepad in this scene

        this.input.gamepad.once('down', function (pad, button, index) {

        pad.setAxisThreshold(0.3);

        gamepad = pad;

        }, this);


        /// touch input gui
        if (touchActivated)
        {
            this.input.addPointer(1);
            this.textures.generate('chunk', { data: ['A'], pixelWidth: 1});

            guide_multi = this.add.image(280,148,'chunk').setDisplaySize(64, 64).setAlpha(.5).setDepth(200).setInteractive();
            
            guide_multi.on('pointermove', function () {gTouching = true}, this);
            guide_multi.on('pointerout', function () {gTouching = false; guiLeft = false; guiRight = false; guiUp = false}, this);

            this.textures.generate('h_arrow', { data: guideInputHorizontalData, pixelWidth: 2});
            this.textures.generate('v_arrow', { data: guideInputVerticalData, pixelWidth: 2});

            guide_left = this.add.image(260,148,'h_arrow').setAlpha(.5);
            guide_right = this.add.image(300,148,'h_arrow').toggleFlipX().setAlpha(.5);

            guide_up = this.add.image(280,128,'v_arrow').setAlpha(.5);
            guide_down = this.add.image(280,168,'v_arrow').toggleFlipY().setAlpha(.5);
        }
        
        /// mark global start time

        this.globalStartTime = game.loop.now;
        this.newLapTimeMark = 0;

        /// debug global
        debug = this.add.text(10, 10, '', { font: '10px Arial', fill: '#ffffff' });
        

        ///sound interface
        var tileSize = 16;

        var randomKey1 = Math.random().toString();
        var canvasFrame = this.textures.createCanvas(randomKey1, tileSize*2, tileSize);


        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: sound_off, pixelWidth: 1 });
        

        //draw the texture data for this frame into the sprite sheet
        canvasFrame.drawFrame(randomKey,0,0,0);
        //add the frame data for this frame into the sprite sheet
        canvasFrame.add(0, 0, 0, 0, tileSize, tileSize);

        var randomKey = Math.random().toString();
        this.textures.generate(randomKey, { data: sound_on, pixelWidth: 1 });
        

        //draw the texture data for this frame into the sprite sheet
        canvasFrame.drawFrame(randomKey,0,tileSize,0);
        //add the frame data for this frame into the sprite sheet
        canvasFrame.add(1, 0, tileSize, 0, tileSize, tileSize);

        var sound_button = this.add.image(20, 20, randomKey1).setOrigin(0.5).setScale(1).setDepth(200).setInteractive();

        if (sound_enabled) 
        {
            sound_button.setFrame(1)            
        } 
        else 
        {
            sound_button.setFrame(0)
        }

        

        sound_button.on('pointerup', function () {

            if (sound_enabled)
            {
                sound_button.setFrame(0);
                sound_enabled=false;
                SIDplayer.stop();
                
                //
                
                
            }
            else
            {
                sound_button.setFrame(1);
                sound_enabled=true;
                this.initSidAudio();

                //


            }

        }, this);



        this.input.gamepad.on('down', function (pad, button, index) {

           if (button.index==3 && sound_enabled)
           {
                sound_button.setFrame(0);
                sound_enabled=false;
                SIDplayer.stop();
           }
           if (button.index==2 && !sound_enabled)
           {
                sound_button.setFrame(1);
                sound_enabled=true;
                this.initSidAudio();
           }


        }, this);


        if (sound_enabled) this.initSidAudio();
    }, ////// END OF create()

    initSidAudio: function ()
    {
        // var SIDplayer = this.plugins.get('SIDPlayerPlugin');
        // SIDplayer.loadLocal(this.cache.binary.get('tune1'));

        SIDplayer = new jsSID(16384, 0.0005);

        if (audioIndex>=audioList.length) {audioIndex=0}
        
        

        SIDplayer.loadLocal(this.cache.binary.get(audioList[audioIndex]));

        SIDplayer.setmodel(6581);



        var i = 0;
        var max = SIDplayer.getsubtunes();

        // sidtext.setText([
        //     'Title: ' + SIDplayer.gettitle(),
        //     'Author: ' + SIDplayer.getauthor(),
        //     'Info: ' + SIDplayer.getinfo(),
        //     'Current Sub-Tune: ' + i,
        //     'Total Sub-Tunes: ' + SIDplayer.getsubtunes(),
        //     'Pref. Model: ' + SIDplayer.getprefmodel(),
        //     'Playtime: ' + SIDplayer.getplaytime(),
        //     'Playback Model: ' + SIDplayer.getmodel()
        // ]);

        SIDplayer.start(0);

        

        audioIndex++;

        
    },
    
    update: function()
    {

        
        var fElapsedTime = (game.loop.now - this.globalStartTime)/1000;

        //instead of fElapsedTime, fSpeedFactor will scale range of throttling (which effectively represents gear shifting for lower to higher ranges of speed)

        //var fSpeedFactor = .0075; //1st gear
        //var fSpeedFactor = .0125; //2nd gear
        var fSpeedFactor = .018; //3rd gear

        // Handle control input
        var nCarDirection = 0;


        if (!gamepad)
        {
            

            if (gTouching)
            {
                var touchXDelta = (guide_multi.input.localX-.5);
                var touchYDelta = (guide_multi.input.localY-.5);

                if (touchXDelta<-.25) guiLeft=true
                    else guiLeft=false;
                if (touchXDelta>.25) guiRight=true
                    else guiRight=false;
                if (touchYDelta<-.25) guiUp=true
                    else guiUp=false;
            }
            

            if (cursors.up.isDown || guiUp)
                this.fSpeed += 2.0 * fSpeedFactor;
            else
                this.fSpeed -= 1.0 * fSpeedFactor;

            // Car Curvature is accumulated left/right input, but inversely proportional to speed
            // i.e. it is harder to turn at high speed
            if (cursors.left.isDown || guiLeft)
            {
                this.fPlayerCurvature -= 2.0 * fSpeedFactor * (1.0 - this.fSpeed / 2.0);
                nCarDirection = -1;
            }

            if (cursors.right.isDown || guiRight)
            {
                this.fPlayerCurvature += 2.0 * fSpeedFactor * (1.0 - this.fSpeed / 2.0);
                nCarDirection = +1;
            }
        }
            
        else
        {
            if (gamepad.up)
                this.fSpeed += 2.0 * fSpeedFactor;
            else
                this.fSpeed -= 1.0 * fSpeedFactor;

            // Car Curvature is accumulated left/right input, but inversely proportional to speed
            // i.e. it is harder to turn at high speed
            if (gamepad.left)
            {
                this.fPlayerCurvature -= 2.0 * fSpeedFactor * (1.0 - this.fSpeed / 2.0);
                nCarDirection = -1;
            }

            if (gamepad.right)
            {
                this.fPlayerCurvature += 2.0 * fSpeedFactor * (1.0 - this.fSpeed / 2.0);
                nCarDirection = +1;
            }            
        }

        



        // If car curvature is too different to track curvature, slow down
        // as car has gone off track
        if (Math.abs(this.fPlayerCurvature - this.fTrackCurvature) >= 0.8)
            this.fSpeed -= 5.0 * fSpeedFactor;

        // Clamp Speed
        if (this.fSpeed < 0.0)  this.fSpeed = 0.0;
        if (this.fSpeed > 1.0)  this.fSpeed = 1.0;
        
        // Move car along track according to car speed
        this.fDistance += (70.0 * this.fSpeed) * fSpeedFactor;

        //this.fDistance += fSpeedFactor;
        
        // Get Point on track
        var fOffset = 0.0;
        var nTrackSection = 0;

        // Lap Timing and counting
        this.fCurrentLapTime = fElapsedTime - this.newLapTimeMark;
        if (this.fDistance >= this.fTrackDistance)
        {
            this.fDistance -= this.fTrackDistance;
            this.listLapTimes.unshift(this.fCurrentLapTime);
            this.listLapTimes.pop();
            this.fCurrentLapTime = 0.0;
            this.newLapTimeMark = game.loop.now/1000;
        }
        
        // Find position on track (could optimise)
        while (nTrackSection < this.vecTrack.length && fOffset <= this.fDistance)
        {           
            fOffset += this.vecTrack[nTrackSection].distance;
            nTrackSection++;
        }
        
        // Interpolate towards target track curvature
        var fTargetCurvature = this.vecTrack[nTrackSection - 1].curvature;
        var fTrackCurveDiff = (fTargetCurvature - this.fCurvature) * fSpeedFactor * this.fSpeed;

        // Accumulate player curvature
        this.fCurvature += fTrackCurveDiff;

        // Accumulate track curvature
        this.fTrackCurvature += (this.fCurvature) * fSpeedFactor * this.fSpeed;



        // Draw Background
        // seamless background scrolling technique: background image width is 3x gamewidth,
        // the first two thirds of the image has the beginning and ending edges that meet seemlessly
        // the last 1/3 of the background image copies first 1/3 so it can wrap seemlessly when animated
        
        // calculate the movement
        this.background_arc -= this.fCurvature*this.fSpeed;

        // wrap the image if needed
        if (this.background_arc<-this.GameWidth*2)
            this.background_arc = (this.GameWidth*2+this.background_arc);
        else if (this.background_arc>0)
            this.background_arc = -(this.background_image.width-this.GameWidth-this.background_arc);   
        
        this.background_image.setPosition(Math.round(this.background_arc),0);

        
        // this.gamedisplay.context.clearRect(0, 0, 320, 200);
        // this.gamedisplay.imagedata =  this.gamedisplay.context.getImageData(0,0,this.gamedisplay.buffer.width, this.gamedisplay.buffer.height);
        // this.gamedisplay.pixels = this.gamedisplay.imagedata.data;
        
        // var lastClipColour;
        // var nClipColour;

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
                
                var nRow = y;

                // Using periodic oscillatory functions to give lines, where the phase is controlled
                // by the distance around the track. These take some fine tuning to give the right "feel"
                //var nGrassColour = Math.sin(20.0 *  Math.pow(1.0 - fPerspective, 3) + this.fDistance * 0.1) > 0.0 ? 'green' : 'darkgreen';
                var nGrassColour = Math.sin(80.0 * Math.pow(1.0 - fPerspective, 3) + this.fDistance * .8) > 0.0 ? 'green' : 'darkgreen';
                var nClipColour = Math.sin(40.0 *  Math.pow(1.0 - fPerspective, 3) + this.fDistance) > 0.0 ? 'red' : 'white';
                
                // if (nClipColour == 'red' && lastClipColour == 'white') var nRoadColour='blue'
                //     else var nRoadColour='grey'

                // Start finish straight changes the road colour to inform the player lap is reset
                //var nRoadColour = Phaser.Math.Fuzzy.Equal( (this.fDistance-y), Math.round((this.fDistance-y)), .01) ? 'grey' : 'blue';
                //var roundedDistance = Math.round(this.fDistance);
                //var nRoadColour = Math.round((roundedDistance-y)/10) == (roundedDistance-y)/10 ? 'blue' : 'grey';

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
            //lastClipColour = nClipColour;

        }
        // after the pixels have been updated put the new image data into the context and refresh the buffer
        this.gamedisplay.context.putImageData(this.gamedisplay.imagedata,0,0);
        this.gamedisplay.buffer.refresh();



        // Draw Car - car position on road is proportional to difference between
        // current accumulated track curvature, and current accumulated player curvature
        // i.e. if they are similar, the car will be in the middle of the track
        this.fCarPos = this.fPlayerCurvature - this.fTrackCurvature;
        var nCarPos = this.GameWidth / 2 + Math.round((this.GameWidth * this.fCarPos) / 2.0);

        // Clamp car position
        if (nCarPos < 0)  nCarPos = 0;
        if (nCarPos > this.GameWidth)  nCarPos = this.GameWidth;

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
    


        var thisContext=this;

        // Draw road sprites
        this.road_group.children.iterate( 
            function(_sprite)
            {
                if ( _sprite.location.distance<thisContext.fDistance && _sprite.location.distance>thisContext.fDistance-60 )
                {
                    _sprite.setVisible(true);

                    var _spriteZ = thisContext.fDistance-(_sprite.location.distance);
                    var _spriteY = ((_spriteZ)*(_spriteZ)*(_spriteZ))/2000;

                    var _spritePerspective = _spriteY / (thisContext.GameHeight/2.0);
                    var _spriteMiddlePoint = 0.5 + thisContext.fCurvature * Math.pow((1.0 - _spritePerspective), 3);
                    var _spriteX = Math.round(_spriteMiddlePoint * thisContext.GameWidth);
                    
                    var nRow = thisContext.GameHeight / 2 + _spriteY;

                    _sprite.setPosition(_spriteX,nRow).setScale(_spritePerspective);
                    
                }
                else
                {
                    _sprite.setVisible(false);
                }

            } );



        // Draw scenery sprites
        this.scenery_group.children.iterate( 
            function(_sprite)
            { 
                // _sprite.setVisible(true);

                // console.log(_sprite.location.distance);
                // console.log(_sprite.location.orientation);

                if ( _sprite.location.distance<thisContext.fDistance && _sprite.location.distance>thisContext.fDistance-60 )
                {
                    _sprite.setVisible(true);

                    var _spriteZ = (thisContext.fDistance-(_sprite.location.distance));

                    var _spriteY = ((_spriteZ)*(_spriteZ)*(_spriteZ))/2000;
                    

            
                    var _spritePerspective = _spriteY / (thisContext.GameHeight/2.0);
                    var _spriteMiddlePoint = 0.5 + thisContext.fCurvature * Math.pow((1.0 - _spritePerspective), 3);
                    //var _spriteX = Math.round(_spriteMiddlePoint * this.GameWidth);

                    var fRoadWidth = 0.02 + _spritePerspective * 0.8; // Min 10% Max 90%
                    var fClipWidth = fRoadWidth * 0.15;
                    fRoadWidth *= 0.5; // Halve it as track is symmetrical around center of track, but offset...

                    var nLeftGrass = Math.round( (_spriteMiddlePoint - fRoadWidth - fClipWidth) * thisContext.GameWidth );
                    var nRightGrass = Math.round( (_spriteMiddlePoint + fRoadWidth + fClipWidth) * thisContext.GameWidth );
                    
                    var nRow = thisContext.GameHeight / 2 + _spriteY;
                    
                    if (_sprite.location.orientation == 'left') _sprite.setPosition(nLeftGrass,nRow).setScale(_spritePerspective)
                        else _sprite.setPosition(nRightGrass,nRow).setScale(_spritePerspective)
            
                }
                else
                {
                    _sprite.setVisible(false);
                }

            } );


        // var debugt = [];
                
        //         debugt.push('fps: '+ Math.floor(this.sys.game.loop.actualFps.toString()) );
        //         // debugt.push('fElapsedTime: '+ fElapsedTime );
        //         // debugt.push('this.fCurrentLapTime: '+ this.fCurrentLapTime );
        //         debugt.push('Distance: '+ this.fDistance);
        //         debugt.push('fOffset: '+ fOffset );

        //         // debugt.push('touchYDelta: '+ touchYDelta );

                
        // debug.setText(debugt);
    },

    drawPixel: function(xpos,ypos,colorkey)
    {
        var r,g,b;

        if (colorkey=='red') { r=255; g=0; b=0; }
        if (colorkey=='green') { r=95; g=127; b=15; }
        if (colorkey=='darkgreen') { r=100; g=135; b=20; }
        if (colorkey=='blue') { r=0; g=0; b=255; }
        if (colorkey=='orange') { r=255; g=255; b=0; }
        if (colorkey=='cyan') { r=0; g=255; b=255; }
        if (colorkey=='violet') { r=255; g=0; b=255; }
        if (colorkey=='white') { r=255; g=255; b=255; }
        if (colorkey=='grey') { r=100; g=100; b=120; }

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

var debug;

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
var SIDplayer;
var audioIndex=0;








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
'Methane_01.sid',
'Agent_of_Lies.sid',
'Eighties_Megahit.sid',
'A_True_Story.sid',
'Matrix_01.sid',
'Gorilla.sid',
'GULBdata.sid',
'Long_Train_Running.sid',
'Lumina.sid',
'New_Blood.sid',
'One_Must_Fall_2097.sid',
'Glowtones.sid',
'Holocaust_Intro.sid',
'Jamaica_10_intro.sid'
];
