var Setup = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Setup ()
    {
        Phaser.Scene.call(this, { key: 'setup', active: true});
    },
    init: function (data)
    {
        
    },

    preload: function ()
    {
        // load audio assets

        this.load.audio('enemy_crash', 'audio/enemy_crash.ogg');
        this.load.audio('enemy_whoop', 'audio/enemy_whoop.ogg');
        this.load.audio('enemy_pain', 'audio/enemy_pain.ogg');

        this.load.audio('player_smbump', 'audio/player_smbump.ogg');
        this.load.audio('player_lgbump', 'audio/player_lgbump.ogg');
        this.load.audio('player_pain', 'audio/player_pain.ogg');

        // this.load.audio('motor1', 'audio/motor1.ogg');
        // this.load.audio('motor2', 'audio/motor2.ogg');
        // this.load.audio('motor3', 'audio/motor3.ogg');

        this.load.image('start_finish', 'sprites/start_finish.png');
        this.load.image('checkered_sign', 'sprites/checkered_sign.png');
        this.load.image('checkered', 'sprites/checkered.png');

        this.load.script('jsSID', 'jsSID.js');


        // load gui assets

        this.load.image('raycer_title', 'gui/raycer_title.png');

        this.load.image('Hat Trick Hero', 'gui/Hat Trick Hero 95 (modified).png');

        this.load.image('Kaiser Knuckle', 'gui/Kaiser Knuckle (Taito).png');

        this.load.image('Afterburner', 'gui/Afterburner (Sega).png');

        this.load.image('Nintendo', 'gui/Super Mario Bros 3 (Nintendo).png');

        this.load.image('mousekeys_icon', 'gui/mousekeys_icon.png');
        this.load.image('touch_icon', 'gui/touch_icon.png');
        this.load.image('gamepad_icon', 'gui/gamepad_icon.png');        


        // load game assets
        this.load.image('background0', 'sprites/backscroll0.png');
        this.load.image('background0a', 'sprites/backscroll0a.png');

        this.load.image('background1', 'sprites/backscroll1.png');
        this.load.image('background2', 'sprites/backscroll2.png');
        this.load.image('background3', 'sprites/backscroll3.png');
        this.load.image('background4', 'sprites/backscroll4.png');
        this.load.image('background5', 'sprites/backscroll5.png');
        this.load.image('background6', 'sprites/backscroll6.png');

        this.load.image('raycer_cycle', 'sprites/raycer_cycle.png');
        this.load.image('raycer_cycle_L1', 'sprites/raycer_cycle_L1.png');
        this.load.image('raycer_cycle_R1', 'sprites/raycer_cycle_R1.png');
        this.load.image('raycer_cycle_L2', 'sprites/raycer_cycle_L2.png');
        this.load.image('raycer_cycle_R2', 'sprites/raycer_cycle_R2.png');
        this.load.image('rock', 'sprites/rock8.png');
        this.load.image('bump', 'sprites/bump1.png');
        this.load.image('atari_sign', 'sprites/wallq.png');

        this.load.image('enemy_cycle1', 'sprites/enemy_cycle1.png');
        this.load.image('enemy_cycle1_L1', 'sprites/enemy_cycle1_L1.png');
        this.load.image('enemy_cycle1_R1', 'sprites/enemy_cycle1_R1.png');
        this.load.image('enemy_cycle1_L2', 'sprites/enemy_cycle1_L2.png');
        this.load.image('enemy_cycle1_R2', 'sprites/enemy_cycle1_R2.png');
        this.load.image('enemy_cycle2', 'sprites/enemy_cycle2.png');
        this.load.image('enemy_cycle2_L1', 'sprites/enemy_cycle2_L1.png');
        this.load.image('enemy_cycle2_R1', 'sprites/enemy_cycle2_R1.png');
        this.load.image('enemy_cycle2_L2', 'sprites/enemy_cycle2_L2.png');
        this.load.image('enemy_cycle2_R2', 'sprites/enemy_cycle2_R2.png');
        this.load.image('enemy_cycle3', 'sprites/enemy_cycle3.png');
        this.load.image('enemy_cycle3_L1', 'sprites/enemy_cycle3_L1.png');
        this.load.image('enemy_cycle3_R1', 'sprites/enemy_cycle3_R1.png');
        this.load.image('enemy_cycle3_L2', 'sprites/enemy_cycle3_L2.png');
        this.load.image('enemy_cycle3_R2', 'sprites/enemy_cycle3_R2.png');
        this.load.image('enemy_cycle4', 'sprites/enemy_cycle4.png');
        this.load.image('enemy_cycle4_L1', 'sprites/enemy_cycle4_L1.png');
        this.load.image('enemy_cycle4_R1', 'sprites/enemy_cycle4_R1.png');
        this.load.image('enemy_cycle4_L2', 'sprites/enemy_cycle4_L2.png');
        this.load.image('enemy_cycle4_R2', 'sprites/enemy_cycle4_R2.png');


        this.load.image('rock1', 'sprites/rock1.png');
        this.load.image('rock2', 'sprites/rock2.png');
        this.load.image('rock3', 'sprites/rock3.png');
        this.load.image('rock4', 'sprites/rock4.png');
        
        this.load.image('plant3', 'sprites/plant3.png');
        this.load.image('plant4', 'sprites/plant4.png');
        this.load.image('plant5', 'sprites/plant5.png');
        this.load.image('plant6', 'sprites/plant6.png');
        
        this.load.image('fern1', 'sprites/fern1.png');
        this.load.image('fern2', 'sprites/fern2.png');
        this.load.image('fern3', 'sprites/fern3.png');
        this.load.image('fern4', 'sprites/fern4.png');
        this.load.image('fern5', 'sprites/fern5.png');
        this.load.image('fern6', 'sprites/fern6.png');
        this.load.image('fern7', 'sprites/fern7.png');
        this.load.image('fern8', 'sprites/fern8.png');

        this.load.image('tree4', 'sprites/tree4.png');
        this.load.image('tree5', 'sprites/tree5.png');
        this.load.image('tree6', 'sprites/tree6.png');
        this.load.image('tree7', 'sprites/tree7.png');
        this.load.image('tree8', 'sprites/tree8.png');        
        this.load.image('tree9', 'sprites/tree9.png');



        this.load.image('tree13', 'sprites/tree13.png');
        this.load.image('tree14', 'sprites/tree14.png');
        this.load.image('tree15', 'sprites/tree15.png');
        this.load.image('tree16', 'sprites/tree16.png');
        
        this.load.spritesheet('explosion', 'sprites/explosion.png',{ frameWidth: 32, frameHeight: 32 });
        

        // load audio list maintained in globals.js
        for (var i = 0; i < audioList.length; i++)
        {
            this.load.binary(audioList[i], 'audio/'+audioList[i]);
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

        // if (key=='load_scrn_bkgd')
        // {
        //     this.add.image(0, 0, key).setOrigin(0).setDisplaySize(320, 200);
        // }

        if (key=='Nintendo')
        {
            var nt_config1 = {
            image: 'Nintendo',
            width: 8,
            height: 8,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 96,
            spacing: { x: 0, y: 0 },
            offset: {y:0}
            };

            var nt_config2 = {
            image: 'Nintendo',
            width: 8,
            height: 8,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 96,
            spacing: { x: 0, y: 0 },
            offset: {y:8}
            };

            this.cache.bitmapFont.add('headtext', Phaser.GameObjects.RetroFont.Parse(this, nt_config1));
            this.cache.bitmapFont.add('foottext', Phaser.GameObjects.RetroFont.Parse(this, nt_config2));

            hsv = Phaser.Display.Color.HSVColorWheel();

            var text0 = this.add.dynamicBitmapText(0, 0, 'headtext', 'DragonFLY').setOrigin(0).setScale(1).setPosition(4,4).setDepth(200);
            var text1 = this.add.dynamicBitmapText(0, 0, 'headtext', '          v 0.4').setOrigin(0).setScale(1).setPosition(4,4).setDepth(200);
            var text2 = this.add.dynamicBitmapText(0, 0, 'headtext', 'presents...').setOrigin(0).setScale(1).setPosition(4,14).setDepth(200);

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

        //create gui textures for use in all scenes
        this.textures.generate('chunk3', { data: ['D'], pixelWidth: 1});
        this.textures.generate('a_menu', { data: accessMenuData, pixelWidth: 1});

        /// debug global
        debug = this.add.text(160, 100, '', { font: '10px Arial', fill: '#00ff00' });

        // access to functions belonging to other scenes in Phaser: this.scene.get
        // use worker variable to hold the scene object accessed thru scene key
        // i.e.

        //var demo = this.scene.get('demo');

        // where the worker and the key are the same name
        // thus, 'this.myfunction()' becomes 'scenekey.myfunction()'




        startFlag=false;

        // pre-load animations used in other scenes
        this.anims.create({
                key: 'fireball_animation',
                frames: this.anims.generateFrameNumbers('explosion'),
                frameRate: 20,
                repeat: 0
                //yoyo: true
            });
        

        
        //this.textures.generate('chunk3', { data: ['3'], pixelWidth: 1});
        //bgimg = this.add.image(0,0,'chunk3').setAlpha(.25).setOrigin(0).setDisplaySize(320,200).setDepth(0);


        //  animated sprite set up for 2d display purpose 
            //  must be loaded as .spritesheet with frame params and added as .sprite
            // var randomKey3 = Math.random().toString();

            // this.anims.create({
            //     key: randomKey3,
            //     frames: this.anims.generateFrameNumbers('flybug'),
            //     frameRate: 60,
            //     repeat: -1
            //     //yoyo: true
            // });

        
        var racertitle = this.add.image(130, -5, 'raycer_title').setOrigin(0).setScale(.6);

        this.tweens.add({
            targets: racertitle,
            alpha: .6,
            ease: 'Sine.easeInOut',
            duration: 600,
            yoyo: true,
            repeat: -1
        });

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

        this.cache.bitmapFont.add('Afterburner1', Phaser.GameObjects.RetroFont.Parse(this, config1));


        var text1 = this.add.dynamicBitmapText(0, 0, 'headtext', " keyboard mouse \n ").setOrigin(0.5,1).setScale(1).setCenterAlign().setPosition(160,60).setDepth(100);
        var text2 = this.add.dynamicBitmapText(0, 0, 'headtext', " touchscreen \n ").setOrigin(0.5,1).setScale(1).setCenterAlign().setPosition(160,110).setDepth(100);
        var text3 = this.add.dynamicBitmapText(0, 0, 'headtext', " gamepad \n ").setOrigin(0.5,1).setScale(1).setCenterAlign().setPosition(160,160).setDepth(100);
                
        var hitarea1 = this.add.rectangle(text1.x, text1.y, text1.width + 20, text1.height + 20, 0x00ff00, 0.45).setInteractive();
        var hitarea2 = this.add.rectangle(text2.x, text2.y, text2.width + 20, text2.height + 20, 0xff00ff, 0.45).setInteractive();
        var hitarea3 = this.add.rectangle(text3.x, text3.y, text3.width + 20, text3.height + 20, 0x00ffff, 0.45).setInteractive();

        this.add.sprite(160, 60, 'mousekeys_icon').setOrigin(.5,0).setScale(2);   
        this.add.sprite(160, 110, 'touch_icon').setOrigin(.5,0).setScale(2);   
        this.add.sprite(160, 160, 'gamepad_icon').setOrigin(.5,0).setScale(2);  


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
            fullscreen_enabled = true;

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


        
        text5 = this.add.dynamicBitmapText(0, 0, 'foottext', 'no gamepad detected').setOrigin(0).setScale(1).setPosition(320,190).setDepth(200);

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
            this.scene.start('raycer');
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


