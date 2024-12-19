var Raycer = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Raycer ()
    {
        Phaser.Scene.call(this, { key: 'raycer', active: false });
    },

    init: function (data)
    {
        
    },

    preload: function ()
    {
        



    },

    create: function ()
    {
        // this.motor1_fx = this.sound.add('motor1');
        // this.motor1_fx.play({loop: true});

        //this.motor3_fx = this.sound.add('motor3');
        //this.motor3_fx.setRate(.1);
        //this.motor3_fx.play({loop: true});

        this.enemy_crash_fx = this.sound.add('enemy_crash');
        this.enemy_whoop_fx = this.sound.add('enemy_whoop');
        this.enemy_pain_fx = this.sound.add('enemy_pain');

        this.player_smbump_fx = this.sound.add('player_smbump');
        this.player_lgbump_fx = this.sound.add('player_lgbump');
        this.player_pain_fx = this.sound.add('player_pain');




        // set-up a text canvas with frames for each bitmap char

        // 2x size (16px/char)
        var textCanvas = this.textures.createCanvas('fontsheet',1520,144);
        var all_characters = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[|]^_`abcdefghijklmnopqrstuvwxyz{\\}~';

        var myscrimg = this.textures.get('Afterburner').getSourceImage();

        textCanvas.getContext('2d', {willReadFrequently:true}).drawImage(myscrimg,0,0,myscrimg.width,myscrimg.height,0,0,1520,144);

        //textCanvas.drawFrame('Nintendo',0,0,0);
        
        var charSize=16;

        for (var b=0;b<textCanvas.height/charSize;b++)
        {
            for (var v=0;v<all_characters.length;v++)
            {

                var thisChar = all_characters.charAt(v);

                //console.log(thisChar);

                textCanvas.add(thisChar+'color'+b, 0, v*charSize, b*charSize, charSize, charSize);

            }
        }



        

        var thisContext = this;
        this.fTargetCurvature;

        // global
        this.raycer_mode = 'demo';
        this.raycer_status = 'normal';

        this.background_index = 0;
        this.gameover = 0;
        this.race_finishers = [];
        this.playerFinishTime = 0;
        this.finalStanding = 0;

        this.fDistance = 50.0;        // Distance car has travelled around track in 'meters'
        this.fCurvature = 0.0;        // Current track curvature, lerped between track sections
        this.fTrackCurvature = 0.0;   // Accumulation of track curvature
        this.fTrackDistance = 0.0;    // Total distance of track

        this.fCarPos = 0.0;           // Current car position
        this.fPlayerCurvature = 0.0;          // Accumulation of player curvature
        this.fSpeed = 0.0;            // Current player speed
        this.fSpeedFactor = 0.0;//0.025;            // Current acceleration/gear
        this.realSpeed = 0.0;           //speed value for display and comparisons
        this.listLapTimes = [0,0,0,0,0];       // List of previous lap times
        this.fCurrentLapTime = 0.0;          // Current lap time
        this.totalRaceTime = 0.0;

        this.playerTotalRaceDistance = 50.0;
        this.playerRacePlacement;

        this.vecTrack = []; // Track sections, sharpness of bend, length of section

        // Define track

        this.vecTrack.push( {curvature:0.0, distance:100.0} );
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


        // game display buffer (outputs primary game mechanic for road animation)

        this.gamedisplay = {};
        this.gamedisplay.buffer = this.textures.createCanvas('gamedisplaycanvas', this.GameWidth, this.GameHeight/2); 
        this.gamedisplay.context = this.gamedisplay.buffer.getContext('2d', {willReadFrequently:true});

        //this.gamedisplay.context.drawImage(this.ground.srcimg,0,0,this.ground.srcimg.width,this.ground.srcimg.height,0,0,this.gamedisplay.buffer.width,this.gamedisplay.buffer.height);
        
        this.gamedisplay.imagedata =  this.gamedisplay.context.getImageData(0,0,this.gamedisplay.buffer.width, this.gamedisplay.buffer.height);
        this.gamedisplay.pixels = this.gamedisplay.imagedata.data;


        // init images of background & gamedisplay, cycle sprite, obstacles, scenery, enemies, starting line

        

        //for parallax effect (stage 1 only)
        this.background_image2 = this.add.image(0,0,'background0a').setOrigin(0).setScale(1);
        this.background_arc2 = 0;

        this.background_image = this.add.image(0,0,'background0').setOrigin(0).setScale(1);
        this.background_arc = 0;



        this.add.image(0,this.GameHeight/2,'gamedisplaycanvas').setOrigin(0).setScale(1).setDepth(1);





        this.start_finish_srcimg = this.textures.get('start_finish').getSourceImage();
        this.sf_width = this.start_finish_srcimg.width;
        this.sf_height = this.start_finish_srcimg.height;
        this.start_finish_buffer = this.textures.createCanvas('sf_buffer', this.sf_width, this.sf_height );
        this.start_finish_context = this.start_finish_buffer.getContext('2d', {willReadFrequently:true});      
        this.start_finish_context.drawImage(this.start_finish_srcimg, 0,0,this.sf_width,this.sf_height, 0,0,this.sf_width,this.sf_height);

        // this.checkered_srcimg = this.textures.get('checkered').getSourceImage();
        // this.ch_width = this.checkered_srcimg.width;
        // this.ch_height = this.checkered_srcimg.height;
        // this.checkered_buffer = this.textures.createCanvas('ch_buffer', this.ch_width, this.ch_height );
        // this.checkered_context = this.checkered_buffer.getContext('2d', {willReadFrequently:true});      
        // this.checkered_context.drawImage(this.checkered_srcimg, 0,0,this.ch_width,this.ch_height, 0,0,this.ch_width,this.ch_height);


        // template -> thing.buffer.drawFrame('fontsheet',nextChar+'color'+thing.animationData.colorindex,textX*8,textY*8);

        var colorNum = 0;
        this.start_finish_buffer.drawFrame('fontsheet','S'+'color'+colorNum,1*charSize,8);
        this.start_finish_buffer.drawFrame('fontsheet','T'+'color'+colorNum,2*charSize,8);
        this.start_finish_buffer.drawFrame('fontsheet','A'+'color'+colorNum,3*charSize,8);
        this.start_finish_buffer.drawFrame('fontsheet','G'+'color'+colorNum,4*charSize,8);
        this.start_finish_buffer.drawFrame('fontsheet','E'+'color'+colorNum,5*charSize,8);
        this.start_finish_buffer.drawFrame('fontsheet','1'+'color'+colorNum,6*charSize,8);

        this.start_finish_sprite = this.add.image(0,0,'sf_buffer').setAlpha(1).setOrigin(.5,1).setDepth(2).setVisible(false);
        
        this.start_finish_sprite.distance = 0;

        this.checkered_sign_sprite = this.add.image(0,0,'checkered_sign').setAlpha(1).setOrigin(.5,1).setDepth(2).setVisible(false);

        this.checkered_sign_sprite.distance = 2250;


        
        this.raycer_cycle_sprite = this.add.image(0,162,'raycer_cycle').setDepth(162);

        // init player cycle tweens

        this.cycleHitTween = this.tweens.add({
            targets: this.raycer_cycle_sprite,
        });

        this.cycleHopTween = this.tweens.add({
            targets: this.raycer_cycle_sprite,
        });

        
        //init enemies, road obstacles and scenery
        this.initEverything();
        

        /// keyboard input 
        cursors = this.input.keyboard.createCursorKeys();

        // activates gamepad in this scene
        this.input.gamepad.once('down', function (pad, button, index) {
            pad.setAxisThreshold(0.3);
            gamepad = pad;
            }, this);
        
        /// launch touch input gui
        if (touchActivated)
        {
            this.scene.launch('touchgui');
        }
        
        /// launch menus and title
        this.scene.launch('menus');
        this.scene.launch('title');
        


        /// mark lap start time
        this.lapStartTime = game.loop.now;
        this.raceStartTime = this.lapStartTime;


        /// initial acceleration
        this.tweens.add({
            targets: this,
            fSpeedFactor: .025,
            ease: 'Sine.EaseIn',
            duration: 1500,
            yoyo: 0,
            repeat: 0,
            onComplete: function ()
            {
                this.fSpeedFactor = .025;
            }
        });
        

        /// debug global
        debug = this.add.text(120, 60, '', { font: '10px Arial', fill: '#00ff00' }).setDepth(200);



    }, ////// END OF create()

    newdemo: function()
    {
        this.road_group.children.iterate( 
            function(_sprite)
            {
                _sprite.setVisible(false);
            } 
        );

        // reset globals
        this.raycer_mode = 'demo';
        this.raycer_status = 'normal';

    },

    newgame: function()
    {
        //delete existing animations
        this.enemy_group.children.iterate( 
            function(_sprite)
            {
                _sprite.setVisible(false);
            } 
        );

        this.road_group.children.iterate( 
            function(_sprite)
            {
                _sprite.setVisible(false);
            } 
        );

        this.scenery_group[this.background_index].children.iterate( 
            function(_sprite)
            {
                _sprite.setVisible(false);
            } 
        );

        //redraw background0
        this.background_image.setTexture('background0');

        //redraw start_finish with stage1
        this.start_finish_context.drawImage(this.start_finish_srcimg, 0,0,this.sf_width,this.sf_height, 0,0,this.sf_width,this.sf_height);
        var charSize=16;
        var colorNum = 0;
        this.start_finish_buffer.drawFrame('fontsheet','S'+'color'+colorNum,1*charSize,8);
        this.start_finish_buffer.drawFrame('fontsheet','T'+'color'+colorNum,2*charSize,8);
        this.start_finish_buffer.drawFrame('fontsheet','A'+'color'+colorNum,3*charSize,8);
        this.start_finish_buffer.drawFrame('fontsheet','G'+'color'+colorNum,4*charSize,8);
        this.start_finish_buffer.drawFrame('fontsheet','E'+'color'+colorNum,5*charSize,8);
        this.start_finish_buffer.drawFrame('fontsheet','1'+'color'+colorNum,6*charSize,8);

        // reset globals
        this.raycer_mode = 'game';
        this.raycer_status = 'normal';

        this.background_index = 0;
        this.gameover = 0;
        this.race_finishers = [];
        this.playerFinishTime = 0;
        this.finalStanding = 0;

        this.fDistance = 50.0;        // Distance car has travelled around track in 'meters'
        this.fCurvature = 0.0;        // Current track curvature, lerped between track sections
        this.fTrackCurvature = 0.0;   // Accumulation of track curvature
        //this.fTrackDistance = 0.0;    // Total distance of track

        this.fCarPos = 0.0;           // Current car position
        this.fPlayerCurvature = 0.0;          // Accumulation of player curvature
        this.fSpeed = 0.0;            // Current player speed
        this.fSpeedFactor = 0.0;//25;            // Current gear
        this.realSpeed = 0.0;           //speed value for display and comparisons
        this.listLapTimes = [0,0,0,0,0];       // List of previous lap times
        this.fCurrentLapTime = 0.0;          // Current lap time
        this.totalRaceTime = 0.0;

        this.playerTotalRaceDistance = 50.0;

        

        //init enemies, road obstacles and scenery
        this.initEverything();


        /// mark lap start time
        this.lapStartTime = game.loop.now;
        this.raceStartTime = this.lapStartTime;

        /// initial acceleration
        this.tweens.add({
            targets: this,
            fSpeedFactor: .025,
            ease: 'Sine.EaseIn',
            duration: 1500,
            yoyo: 0,
            repeat: 0,
            onComplete: function ()
            {
                this.fSpeedFactor = .025;
            }
        });


    },
    
    update: function()
    {

        // this.fx_flag = !this.fx_flag;
        // if (this.fx_flag) 

        //this.soundfx1.play({loop: false});



        var thisContext=this;

              
        this.fCurrentLapTime = (game.loop.now - this.lapStartTime)/1000;
        this.totalRaceTime = (game.loop.now - this.raceStartTime)/1000;

        //instead of fElapsedTime, this.fSpeedFactor will scale range of throttling (which effectively represents gear shifting for lower to higher ranges of speed)

        //this.fSpeedFactor = .0075; //1st gear
        //this.fSpeedFactor = .0125; //2nd gear
        //this.fSpeedFactor = .025; //3rd gear

        // Handle control input
        var nCarDirection = 0;
        
        if (this.raycer_mode == 'demo')
        {
            this.fSpeed += 2.0 * this.fSpeedFactor;
        }
        else
        {
            //player control input handlers
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
            

            if (cursors.up.isDown || guiUp || gamepad.up)
                this.fSpeed += 2.0 * this.fSpeedFactor;
            else
                this.fSpeed -= 1.0 * this.fSpeedFactor;

            // Car Curvature is accumulated left/right input, but inversely proportional to speed
            // i.e. it is harder to turn at high speed

            if (this.raycer_status!='hit')
            {
                if (cursors.left.isDown || guiLeft || gamepad.left)
                {
                    this.fPlayerCurvature -= 2.0 * this.fSpeedFactor * (1.0 - this.fSpeed / 2.0);
                    nCarDirection = -1;
                }

                if (cursors.right.isDown || guiRight || gamepad.right)
                {
                    this.fPlayerCurvature += 2.0 * this.fSpeedFactor * (1.0 - this.fSpeed / 2.0);
                    nCarDirection = +1;
                }
            }
            
            
            //end player control

        }
        

        // If car curvature is too different to track curvature, slow down
        // as car has gone off track

        if (this.raycer_mode != 'demo')
        {
            if (Math.abs(this.fPlayerCurvature - this.fTrackCurvature) >= 0.8)
            this.fSpeed -= 5.0 * this.fSpeedFactor;
        }
        else
        {
            this.fPlayerCurvature = this.fTrackCurvature;
        }
        

        // Clamp Speed
        if (this.raycer_mode != 'demo')
        {
            if (this.fSpeed < 0.0)  this.fSpeed = 0.0;
            if (this.fSpeed > 1.025)  this.fSpeed = 1.025;
        }
        else
        {
            if (this.fSpeed < 0.0)  this.fSpeed = 0.0;
            if (this.fSpeed > 0.950)  this.fSpeed = 0.950;
        }
        
        
        // Move car along track according to car speed
        this.fDistance += (70.0 * this.fSpeed) * this.fSpeedFactor;
        //update player total race distance (7 stages/laps)
        this.playerTotalRaceDistance += (70.0 * this.fSpeed) * this.fSpeedFactor;
        //update real speed value
        this.realSpeed = (70.0 * thisContext.fSpeed) * thisContext.fSpeedFactor;

        //this.fDistance += this.fSpeedFactor;
        
        // Get Point on track
        var fOffset = 0.0;
        var nTrackSection = 0;



        // Lap Timing and counting

        // this.fCurrentLapTime = fElapsedTime;// - this.newLapTimeMark;

        if (this.fDistance >= this.fTrackDistance)
        {
            this.fDistance = 0; // -= this.fTrackDistance;
            this.listLapTimes.unshift(this.fCurrentLapTime);
            this.listLapTimes.pop();
            this.lapStartTime = game.loop.now;

            transitionTween = this.tweens.add({
                targets: this.background_image,
                alpha: 0,
                ease: 'none',
                duration: 350,
                yoyo: 1,
                repeat: 0,
                paused: false,
                onStart: function()
                {
                    var bIndex = thisContext.background_index;
                    bIndex++;
                    if (bIndex<7)
                    {
                        thisContext.start_finish_context.drawImage(thisContext.start_finish_srcimg, 0,0,thisContext.sf_width,thisContext.sf_height, 0,0,thisContext.sf_width,thisContext.sf_height);
                        var charSize=16;
                        var colorNum = bIndex;
                        thisContext.start_finish_buffer.drawFrame('fontsheet','S'+'color'+colorNum,1*charSize,8);
                        thisContext.start_finish_buffer.drawFrame('fontsheet','T'+'color'+colorNum,2*charSize,8);
                        thisContext.start_finish_buffer.drawFrame('fontsheet','A'+'color'+colorNum,3*charSize,8);
                        thisContext.start_finish_buffer.drawFrame('fontsheet','G'+'color'+colorNum,4*charSize,8);
                        thisContext.start_finish_buffer.drawFrame('fontsheet','E'+'color'+colorNum,5*charSize,8);
                        thisContext.start_finish_buffer.drawFrame('fontsheet',(bIndex+1)+'color'+colorNum,6*charSize,8);
                    }
                    else
                    {
                        thisContext.start_finish_buffer.drawFrame('checkered',0,0,0);
                    }
                },
                onYoyo: function ()
                {
                    thisContext.background_index++;
                    if (thisContext.background_index>6) 
                    {
                        //// GAME OVER
                        thisContext.gameover=1;
                        thisContext.playerFinishTime = thisContext.totalRaceTime;
                        thisContext.finalStanding = thisContext.playerRacePlacement;
                        thisContext.background_index=0;
                    }

                    thisContext.background_image.setTexture('background'+thisContext.background_index)
      
                    
                }
            });
        }
        
        // Find position on track (could optimise)
        while (nTrackSection < this.vecTrack.length && fOffset <= this.fDistance)
        {           
            fOffset += this.vecTrack[nTrackSection].distance;
            nTrackSection++;
        }
        
        // Interpolate towards target track curvature
        this.fTargetCurvature = this.vecTrack[nTrackSection - 1].curvature;
        var fTrackCurveDiff = (this.fTargetCurvature - this.fCurvature) * this.fSpeedFactor * this.fSpeed;

        // Accumulate player curvature
        this.fCurvature += fTrackCurveDiff;

        // Accumulate track curvature
        this.fTrackCurvature += (this.fCurvature) * this.fSpeedFactor * this.fSpeed;



        // Draw Background
        // seamless background scrolling technique: background image width is 3x gamewidth,
        // the first two thirds of the image has the beginning and ending edges that meet seemlessly
        // the last 1/3 of the background image copies first 1/3 so it can wrap seemlessly when animated
        
        // calculate the movement
        this.background_arc -= this.fCurvature*this.fSpeed*5;

        // wrap the image if needed
        if (this.background_arc<-this.GameWidth*2)
            this.background_arc = (this.GameWidth*2+this.background_arc);
        else if (this.background_arc>0)
            this.background_arc = -(this.background_image.width-this.GameWidth-this.background_arc);   
        
        this.background_image.setPosition(Math.round(this.background_arc),0);



        //extra parallax layer (stage 1 only)

        if (this.background_index!=0)
        {
            this.background_image2.setVisible(false);
        }
        else
        {
            this.background_image2.setVisible(true);
            // calculate the movement
            this.background_arc2 -= this.fCurvature*this.fSpeed*4.5;

            // wrap the image if needed
            if (this.background_arc2<-this.GameWidth*2)
                this.background_arc2 = (this.GameWidth*2+this.background_arc2);
            else if (this.background_arc2>0)
                this.background_arc2 = -(this.background_image2.width-this.GameWidth-this.background_arc2);   
            
            this.background_image2.setPosition(Math.round(this.background_arc2),0);
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
                var nLeftSand = Math.round( (fMiddlePoint - fRoadWidth - fClipWidth*3) * this.GameWidth );
                var nLeftGrass = Math.round( (fMiddlePoint - fRoadWidth - fClipWidth) * this.GameWidth );
                var nLeftClip = Math.round( (fMiddlePoint - fRoadWidth) * this.GameWidth );
                var nRightClip = Math.round( (fMiddlePoint + fRoadWidth) * this.GameWidth );
                var nRightGrass = Math.round( (fMiddlePoint + fRoadWidth + fClipWidth) * this.GameWidth );
                var nRightSand = Math.round( (fMiddlePoint + fRoadWidth + fClipWidth*3) * this.GameWidth );
                
                var nRow = y;

                // Using periodic oscillatory functions to give lines, where the phase is controlled
                // by the distance around the track. These take some fine tuning to give the right "feel"
                //var nGrassColour = Math.sin(20.0 *  Math.pow(1.0 - fPerspective, 3) + this.fDistance * 0.1) > 0.0 ? 'green' : 'darkgreen';
                switch (this.background_index)
                {
                    case 0:
                        var nGrassColour = Math.sin(80.0 * Math.pow(1.0 - fPerspective, 3) + this.fDistance * .8) > 0.0 ? 'green' : 'darkgreen';
                        var nClipColour = Math.sin(40.0 *  Math.pow(1.0 - fPerspective, 3) + this.fDistance) > 0.0 ? 'red' : 'white';
                        break;

                    case 1:
                        var nGrassColour = Math.sin(80.0 * Math.pow(1.0 - fPerspective, 3) + this.fDistance * .8) > 0.0 ? 'green' : 'darkgreen';
                        var nClipColour = Math.sin(40.0 *  Math.pow(1.0 - fPerspective, 3) + this.fDistance) > 0.0 ? 'red' : 'white';
                        break;

                    case 2:
                        var nGrassColour = Math.sin(80.0 * Math.pow(1.0 - fPerspective, 3) + this.fDistance * .8) > 0.0 ? 'cyan' : 'darkcyan';
                        var nClipColour = Math.sin(40.0 *  Math.pow(1.0 - fPerspective, 3) + this.fDistance) > 0.0 ? 'red' : 'white';
                        break;

                    case 3:
                        var nGrassColour = Math.sin(80.0 * Math.pow(1.0 - fPerspective, 3) + this.fDistance * .8) > 0.0 ? 'violet' : 'darkviolet';
                        var nClipColour = Math.sin(40.0 *  Math.pow(1.0 - fPerspective, 3) + this.fDistance) > 0.0 ? 'blue' : 'white';
                        break;

                    case 4:
                        var nGrassColour = Math.sin(80.0 * Math.pow(1.0 - fPerspective, 3) + this.fDistance * .8) > 0.0 ? 'darkred' : 'black';
                        var nClipColour = Math.sin(40.0 *  Math.pow(1.0 - fPerspective, 3) + this.fDistance) > 0.0 ? 'orange' : 'violet';
                        break;
                    
                    case 5:
                        var nGrassColour = Math.sin(80.0 * Math.pow(1.0 - fPerspective, 3) + this.fDistance * .8) > 0.0 ? 'darkblue' : 'darkred';
                        var nClipColour = Math.sin(40.0 *  Math.pow(1.0 - fPerspective, 3) + this.fDistance) > 0.0 ? 'cyan' : 'yellow';
                        break;
                    
                    case 6:
                        var nGrassColour = Math.sin(80.0 * Math.pow(1.0 - fPerspective, 3) + this.fDistance * .8) > 0.0 ? 'darkpurple' : 'purple';
                        var nClipColour = Math.sin(40.0 *  Math.pow(1.0 - fPerspective, 3) + this.fDistance) > 0.0 ? 'cyan' : 'violet';
                        break;
                }

                if (this.background_index==2)
                {
                    // Draw the row segments with sand
                    if (x >= 0 && x < nLeftSand)
                        this.drawPixel(x, nRow, nGrassColour);
                    if (x >= nLeftSand && x < nLeftGrass)
                        this.drawPixel(x, nRow, 'sand');
                    if (x >= nLeftGrass && x < nLeftClip)
                        this.drawPixel(x, nRow, nClipColour);
                    if (x >= nLeftClip && x < nRightClip)
                        this.drawPixel(x, nRow, 'grey');
                    if (x >= nRightClip && x < nRightGrass)
                        this.drawPixel(x, nRow, nClipColour);
                    if (x >= nRightGrass && x < nRightSand)
                        this.drawPixel(x, nRow, 'sand');
                    if (x >= nRightSand && x < this.GameWidth)
                        this.drawPixel(x, nRow, nGrassColour);
                }
                else
                {
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

        // Clamp car position (offset half the upright raycer sprite width)
        if (nCarPos < 12)  nCarPos = 12;
        if (nCarPos > (this.GameWidth-1)-12)  nCarPos = (this.GameWidth-1)-12;

        // Draw a car that represents what the player is doing. Apologies for the quality
        // of the sprite... :-(
        if (this.raycer_status != 'hit')
        {
            if (this.raycer_mode != 'demo')
            {
                
                    var currentY = this.raycer_cycle_sprite.y;

                    switch (nCarDirection)
                    {
                    case 0:
                        this.raycer_cycle_sprite.setPosition(nCarPos,currentY).setTexture('raycer_cycle');
                        break;

                    case +1:
                        this.raycer_cycle_sprite.setPosition(nCarPos,currentY).setTexture('raycer_cycle_R2');
                        break;

                    case -1:
                        this.raycer_cycle_sprite.setPosition(nCarPos,currentY).setTexture('raycer_cycle_L2');
                        break;
                    }
                
                

            }
            else
            {
                if (this.fTargetCurvature>.6) this.raycer_cycle_sprite.setTexture('raycer_cycle_R2');
                else if (this.fTargetCurvature>.2 && this.fTargetCurvature<=.6) this.raycer_cycle_sprite.setTexture('raycer_cycle_R1');
                else if (this.fTargetCurvature<-.6) this.raycer_cycle_sprite.setTexture('raycer_cycle_L2');
                else if (this.fTargetCurvature<-.2 && this.fTargetCurvature>=-.6) this.raycer_cycle_sprite.setTexture('raycer_cycle_L1');
                else this.raycer_cycle_sprite.setTexture('raycer_cycle');

                this.raycer_cycle_sprite.setPosition(nCarPos,162);
            }
        }

        // start finish sprite (for stages)
        var _sprite = this.start_finish_sprite;
         
        if ( _sprite.distance<this.fDistance && _sprite.distance>this.fDistance-60 )
        {
            var _spriteZ = this.fDistance-(_sprite.distance);
            var _spriteY = ((_spriteZ)*(_spriteZ)*(_spriteZ))/2000;

            var _spritePerspective = _spriteY / (this.GameHeight/2.0);
            var _spriteMiddlePoint = 0.5 + this.fCurvature * Math.pow((1.0 - _spritePerspective), 3);
            var _spriteX = Math.round(_spriteMiddlePoint * this.GameWidth);
            
            var nRow = this.GameHeight / 2 + _spriteY;

            var roadWidth = 0.02 + _spritePerspective * 0.8;
            var clipsWidth = roadWidth * 0.3;
            var flWidth = Math.round( ( roadWidth + clipsWidth ) * this.GameWidth );
            var flHeight = Math.round((0.02 + _spritePerspective * 0.6)*this.GameWidth);

            this.start_finish_sprite.setVisible(true);

            this.start_finish_sprite.setPosition(_spriteX,nRow).setDisplaySize(flWidth,flHeight);
        }
        else
        {
            this.start_finish_sprite.setVisible(false);
        }


        // finish line (for last stage only)
        if (this.background_index==6)
        {
            var _sprite = this.checkered_sign_sprite;
         
            if ( _sprite.distance<this.fDistance && _sprite.distance>this.fDistance-60 )
            {
                var _spriteZ = this.fDistance-(_sprite.distance);
                var _spriteY = ((_spriteZ)*(_spriteZ)*(_spriteZ))/2000;

                var _spritePerspective = _spriteY / (this.GameHeight/2.0);
                var _spriteMiddlePoint = 0.5 + this.fCurvature * Math.pow((1.0 - _spritePerspective), 3);
                var _spriteX = Math.round(_spriteMiddlePoint * this.GameWidth);
                
                var nRow = this.GameHeight / 2 + _spriteY;

                var roadWidth = 0.02 + _spritePerspective * 0.8;
                var clipsWidth = roadWidth * 0.3;
                var flWidth = Math.round( ( roadWidth + clipsWidth ) * this.GameWidth );
                var flHeight = Math.round((0.02 + _spritePerspective * 0.6)*this.GameWidth);

                this.checkered_sign_sprite.setVisible(true);

                this.checkered_sign_sprite.setPosition(_spriteX,nRow).setDisplaySize(flWidth,flHeight);
            }
            else
            {
                this.checkered_sign_sprite.setVisible(false);
            }
        }
        



        // Draw enemy sprites
        this.enemy_group.children.iterate( 
            function(_sprite)
            { 
                if (_sprite.status == 'alive')
                {
                    _sprite.lean();
                    _sprite.location.distance += _sprite.speed;
                    _sprite.totalRaceDistance += _sprite.speed;

                    if (_sprite.location.distance>=thisContext.fTrackDistance-50) _sprite.location.distance = -50;

                    if ( _sprite.location.distance<thisContext.fDistance && _sprite.location.distance>thisContext.fDistance-76 )
                    {
                        _sprite.setVisible(true);
                        
                        var _spriteZ = (thisContext.fDistance-(_sprite.location.distance));

                        var _spriteY = ((_spriteZ)*(_spriteZ)*(_spriteZ))/2000;
                
                        var _spritePerspective = _spriteY / (thisContext.GameHeight/2.0);
                        var _spriteMiddlePoint = 0.5 + thisContext.fCurvature * Math.pow((1.0 - _spritePerspective), 3);
                        //var _spriteX = Math.round(_spriteMiddlePoint * this.GameWidth);

                        var fRoadWidth = 0.02 + _spritePerspective * 0.8; // Min 10% Max 90%
                        //fRoadWidth *= 0.5; // Halve it as track is symmetrical around center of track, but offset...
                        var fenemyHorizontalPosition = fRoadWidth * _sprite.location.position;

                        var _spriteX = Math.round( (_spriteMiddlePoint + fenemyHorizontalPosition) * thisContext.GameWidth );
                        
                        var nRow = thisContext.GameHeight / 2 + _spriteY;
                        
                        _sprite.setDepth(nRow);
                        _sprite.setPosition(_spriteX,nRow).setScale(_spritePerspective*1.7)

                        //collision detection
                        if ( Phaser.Math.Fuzzy.Equal(_spriteX,nCarPos,7.0) && Phaser.Math.Fuzzy.Equal(nRow,162,5.0) ) 
                        {
                            if (_sprite.speed<thisContext.realSpeed)
                            {
                                //alert('collision! - you win');
                                _sprite.status = 'killed';

                                thisContext.enemy_pain_fx.play({loop: false});

                                var xDir = Phaser.Math.Between(0,1) == 0 ? 40 : 280 ;

                                thisContext.tweens.add({

                                    targets: _sprite,
                                    x: xDir,
                                    y: 140,
                                    angle: 720,                    
                                    ease: 'none',
                                    duration: 500,
                                    yoyo: false,
                                    repeat: 0,
                                    paused: false,
                                    onComplete: function ()
                                    {
                                        _sprite.setVisible(false);
                                        thisContext.add.sprite(_sprite.x, _sprite.y, 'explosion').play('fireball_animation').setOrigin(.5).setDepth(200);
                                        thisContext.enemy_crash_fx.play({loop: false});
                                    }

                                });
                            }
                            else
                            {
                                if (!thisContext.cycleHitTween.isPlaying())
                                {
                                    //alert('collision! - you lose');
                                    thisContext.raycer_status = 'hit';

                                    thisContext.player_pain_fx.play({loop: false});

                                    var xDir = Phaser.Math.Between(0,1) == 0 ? 40 : 280 ;
                                    thisContext.fPlayerCurvature = xDir == 40 ? thisContext.fTrackCurvature-.8 : thisContext.fTrackCurvature+.8 ;

                                    thisContext.cycleHitTween = thisContext.tweens.add({

                                        targets: thisContext.raycer_cycle_sprite,
                                        x: xDir,
                                        //y: 140,
                                        angle: 720,                    
                                        ease: 'none',
                                        duration: 500,
                                        yoyo: false,
                                        repeat: 0,
                                        paused: false,
                                        onComplete: function ()
                                        {
                                            //thisContext.fSpeed = .5;
                                            thisContext.raycer_status = 'normal';

                                            thisContext.tweens.add({
                                                targets: thisContext,
                                                fSpeedFactor: 0,
                                                ease: 'Sine.EaseInOut',
                                                duration: 700,
                                                yoyo: 1,
                                                repeat: 0,
                                                onComplete: function ()
                                                {
                                                    
                                                    thisContext.fSpeedFactor = .025;
                                                    
                                                    
                                                    //console.log(xDir, thisContext.fPlayerCurvature);
                                                }
                                            });


                                        }

                                        

                                    });
                                }
                            }
                        }
                        
                    }
                    else
                    {
                        _sprite.setVisible(false);
                    }
                }

            } );

        
        // Draw road sprites

        if (this.raycer_mode != 'demo' && this.background_index>2)
        {

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

                    
                    _sprite.setDepth(nRow);
                    _sprite.setPosition(_spriteX,nRow).setScale(_spritePerspective);

                    //collision detection
                    if ( Phaser.Math.Fuzzy.Equal(_spriteX,nCarPos,7.0) && Phaser.Math.Fuzzy.Equal(nRow,162,5.0) && thisContext.raycer_mode) 
                    {

                        if (_sprite.label == 'bump')
                        {
                            thisContext.player_smbump_fx.play({loop: false});
                        }
                        else
                        {
                            thisContext.player_lgbump_fx.play({loop: false});
                        }

                        if (!thisContext.cycleHopTween.isPlaying())
                        {

                            thisContext.cycleHopTween = thisContext.tweens.add({

                                targets: thisContext.raycer_cycle_sprite,
                                y: 150,          
                                ease: 'none',
                                duration: 150,
                                yoyo: 1,
                                repeat: 0,
                                paused: false,
                                
                                onComplete: function ()
                                {
                                    //thisContext.fSpeed = .5;

                                    thisContext.tweens.add({
                                        targets: thisContext,
                                        fSpeedFactor: .0075,
                                        ease: 'Sine.EaseInOut',
                                        duration: 500,
                                        yoyo: 1,
                                        repeat: 0,
                                        onComplete: function ()
                                        {
                                            thisContext.fSpeedFactor = .025;
                                        }
                                    });
                                }

                            });

                        }

                        
                        
                    }
                    
                }
                else
                {
                    _sprite.setVisible(false);
                }

            } );

        }


        // Draw scenery sprites
        this.scenery_group[this.background_index].children.iterate( 
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

                    var fClipWidth = fRoadWidth * 0.25;
                    
                    fRoadWidth *= 0.5; // Halve it as track is symmetrical around center of track, but offset...

                    var nLeftGrass = Math.round( (_spriteMiddlePoint - fRoadWidth - fClipWidth) * thisContext.GameWidth );
                    var nRightGrass = Math.round( (_spriteMiddlePoint + fRoadWidth + fClipWidth) * thisContext.GameWidth );
                    
                    var nRow = thisContext.GameHeight / 2 + _spriteY;

                    // adjust depth for scenery
                    _sprite.setDepth(nRow-16);

                    //adjust scaleFactor for first stage only (trees)
                    var scaleFactor = (thisContext.background_index == 0) ? 1.5 : 2 ;
                    if (_sprite.location.orientation == 'left') _sprite.setPosition(nLeftGrass,nRow).setScale(_spritePerspective*scaleFactor)
                        else _sprite.setPosition(nRightGrass,nRow).setScale(_spritePerspective*scaleFactor)
            
                }
                else
                {
                    _sprite.setVisible(false);
                }

            } );

        

        //sort raycers into current race standings based on total distance travelled
        var raycerDistances = [];
        
        for (var i = 0; i < this.enemy_groupArray.length; i++)
        {
            if (this.enemy_groupArray[i].status == 'alive') 
            {
                raycerDistances.push( {type:"enemy", distance: this.enemy_groupArray[i].totalRaceDistance} );


                //record finish times for enemies
                if ( this.enemy_groupArray[i].totalRaceDistance>(this.fTrackDistance*7-50) ) //7 stages
                {
                    if (!this.enemy_groupArray[i].finished)
                    {
                        this.enemy_groupArray[i].finished = true;
                        this.race_finishers.push( {type:"enemy", label: this.enemy_groupArray[i].label, finishtime: this.totalRaceTime+0.25} );
                    }
                    
                }

            }  
        }

        raycerDistances.push( {type:"player", distance: this.playerTotalRaceDistance-50} );

        raycerDistances.sort( function(a,b){return b.distance - a.distance} );

        this.playerRacePlacement = raycerDistances.findIndex( function getPlayerIndex(value,index,array) { return value.type == "player"}) + 1;

        
        //when gameover compile final top 10 race standings and launch gameover scene
        if (this.gameover)
        {
            //wait for 10 ememy finishers
            if (this.race_finishers.length>=10)
            {
                //sort player into race finshers
                this.race_finishers.push( {type:"player", label: 'Raycer X', finishtime: this.playerFinishTime } );

                this.race_finishers.sort( function(a,b){return a.finishtime - b.finishtime} );

                this.gameover = false;
                this.raycer_mode = 'demo';
                this.scene.launch('gameover');
            }
        }


        

        

        // var debugt = [];
                
        //         // debugt.push('fps: '+ Math.floor(this.sys.game.loop.actualFps.toString()) );
        //         // debugt.push('fElapsedTime: '+ fElapsedTime );
        //         // debugt.push('fTrackCurveDiff: '+ fTrackCurveDiff );
                
        //         // debugt.push('total track distance: '+ this.fTrackDistance );
        //         // debugt.push('this.fSpeed: '+ this.fSpeed );
        //         debugt.push('this.background_index: '+ this.background_index );
        //         // debugt.push('this.fPlayerCurvature: '+ this.fPlayerCurvature );
        //         // debugt.push('this.fTrackCurvature: '+ this.fTrackCurvature );

        //         // debugt.push('curvature difference: '+ (this.fPlayerCurvature - this.fTrackCurvature) );
        //         // debugt.push('enemy distance difference: '+ (this.fDistance-this.enemy_groupArray[0].location.distance) );


                
        // debug.setText(debugt);
    },

    drawPixel: function(xpos,ypos,colorkey)
    {
        var r,g,b;

        switch (colorkey)
        {
            case 'red':  r=255; g=0; b=0; break;
            case 'green':  r=95; g=127; b=15; break;
            case 'darkgreen':  r=100; g=135; b=20; break;
            case 'blue':  r=0; g=0; b=255; break;
            case 'orange':  r=224; g=96; b=0; break;
            case 'mutedorange':  r=224; g=128; b=0; break;
            case 'mutedorange2':  r=210; g=110; b=0; break;
            case 'cyan':  r=0; g=110; b=180; break;
            case 'darkcyan':  r=10; g=130; b=220; break;
            case 'violet':  r=200; g=0; b=200; break;
            case 'darkviolet':  r=255; g=50; b=255; break;
            case 'white':  r=255; g=255; b=255; break;
            case 'grey':  r=100; g=100; b=120; break;
            case 'sand':  r=207; g=168; b=103; break;
            case 'darkblue':  r=0; g=0; b=40; break;
            case 'darkred':  r=40; g=0; b=0; break;
            case 'black':  r=0; g=0; b=0; break;
            case 'darkgrey':  r=60; g=60; b=60; break;
            case 'yellow':  r=240; g=240; b=20; break;
            case 'darkpurple':  r=36; g=26; b=46; break;
            case 'purple':  r=55; g=35; b=71; break;
        }


        var bytesPerPixel=4;
        var targetIndex=(this.gamedisplay.buffer.width*bytesPerPixel*ypos) + (bytesPerPixel*xpos);     
        this.gamedisplay.pixels[targetIndex]=r;
        this.gamedisplay.pixels[targetIndex+1]=g;
        this.gamedisplay.pixels[targetIndex+2]=b;
        this.gamedisplay.pixels[targetIndex+3]=255;
    },

    initEverything: function()
    {
        var thisContext = this;

        //total set of enemy objects
        this.enemy_group = this.add.group();
        this.enemy_groupArray = this.enemy_group.getChildren();

        var enemy_sprite; //worker just to init sprites in group
        var sp_rng_low1 = 10;
        var sp_rng_low2 = 14;
        var sp_rng_high1 = 20;
        var sp_rng_high2 = 21;


        for (var u=0; u<20; u++)
        {


            //yellow gang
            enemy_sprite = this.add.image(0,0,'enemy_cycle1').setOrigin(.5,.5).setVisible(false);
            enemy_sprite.label = 'yellow gang #'+u;
            enemy_sprite.status = 'alive';
            enemy_sprite.finished = false;
            enemy_sprite.location = {distance:Phaser.Math.Between(10,50), position:(Phaser.Math.Between(-5,5)/10)};
            enemy_sprite.totalRaceDistance = enemy_sprite.location.distance;
            enemy_sprite.speed = (Phaser.Math.Between(sp_rng_low1,sp_rng_low2)/10);
            enemy_sprite.lean = function()
            {
                if (thisContext.fTargetCurvature>.6) this.setTexture('enemy_cycle1_R2');
                else if (thisContext.fTargetCurvature>.2 && thisContext.fTargetCurvature<=.6) this.setTexture('enemy_cycle1_R1');
                else if (thisContext.fTargetCurvature<-.6) this.setTexture('enemy_cycle1_L2');
                else if (thisContext.fTargetCurvature<-.2 && thisContext.fTargetCurvature>=-.6) this.setTexture('enemy_cycle1_L1');
                else this.setTexture('enemy_cycle1');
            }

            this.tweens.add({

                        targets: enemy_sprite,
                        speed: (Phaser.Math.Between(sp_rng_high1,sp_rng_high2)/10),                    
                        ease: 'Sine.easeInOut',
                        duration: 10000,
                        yoyo: true,
                        repeat: -1,
                        paused: false
                        

                        });

            this.tweens.add({

                        targets: enemy_sprite.location,
                        position: (Phaser.Math.Between(-5,5)/10),                    
                        ease: 'Sine.easeInOut',
                        duration: 3000,
                        yoyo: true,
                        repeat: -1,
                        paused: false
                        

                        });

            var spriteDepth = 100; //100 - Math.floor(100*(enemy_sprite.location.distance/this.fTrackDistance));
            enemy_sprite.setDepth(spriteDepth);

            this.enemy_group.add(enemy_sprite);


            //purple gang
            enemy_sprite = this.add.image(0,0,'enemy_cycle2').setOrigin(.5,.5).setVisible(false);
            enemy_sprite.label = 'purple gang #'+u;
            enemy_sprite.status = 'alive';
            enemy_sprite.finished = false;
            enemy_sprite.location = {distance:Phaser.Math.Between(10,50), position:(Phaser.Math.Between(-5,5)/10)};
            enemy_sprite.totalRaceDistance = enemy_sprite.location.distance;
            enemy_sprite.speed = (Phaser.Math.Between(sp_rng_low1,sp_rng_low2)/10);
            enemy_sprite.lean = function()
            {
                if (thisContext.fTargetCurvature>.6) this.setTexture('enemy_cycle2_R2');
                else if (thisContext.fTargetCurvature>.2 && thisContext.fTargetCurvature<=.6) this.setTexture('enemy_cycle2_R1');
                else if (thisContext.fTargetCurvature<-.6) this.setTexture('enemy_cycle2_L2');
                else if (thisContext.fTargetCurvature<-.2 && thisContext.fTargetCurvature>=-.6) this.setTexture('enemy_cycle2_L1');
                else this.setTexture('enemy_cycle2');
            }

            this.tweens.add({

                        targets: enemy_sprite,
                        speed: (Phaser.Math.Between(sp_rng_high1,sp_rng_high2)/10),                    
                        ease: 'Sine.easeInOut',
                        duration: 12000,
                        yoyo: true,
                        repeat: -1,
                        paused: false
                        

                        });

            this.tweens.add({

                        targets: enemy_sprite.location,
                        position: (Phaser.Math.Between(-5,5)/10),                    
                        ease: 'Sine.easeInOut',
                        duration: 3000,
                        yoyo: true,
                        repeat: -1,
                        paused: false
                        

                        });

            var spriteDepth = 100; //100 - Math.floor(100*(enemy_sprite.location.distance/this.fTrackDistance));
            enemy_sprite.setDepth(spriteDepth);

            this.enemy_group.add(enemy_sprite);


            //red gang
            enemy_sprite = this.add.image(0,0,'enemy_cycle3').setOrigin(.5,.5).setVisible(false);
            enemy_sprite.label = 'red gang #'+u;
            enemy_sprite.status = 'alive';
            enemy_sprite.finished = false;
            enemy_sprite.location = {distance:Phaser.Math.Between(10,50), position:(Phaser.Math.Between(-5,5)/10)};
            enemy_sprite.totalRaceDistance = enemy_sprite.location.distance;
            enemy_sprite.speed = (Phaser.Math.Between(sp_rng_low1,sp_rng_low2)/10);
            enemy_sprite.lean = function()
            {
                if (thisContext.fTargetCurvature>.6) this.setTexture('enemy_cycle3_R2');
                else if (thisContext.fTargetCurvature>.2 && thisContext.fTargetCurvature<=.6) this.setTexture('enemy_cycle3_R1');
                else if (thisContext.fTargetCurvature<-.6) this.setTexture('enemy_cycle3_L2');
                else if (thisContext.fTargetCurvature<-.2 && thisContext.fTargetCurvature>=-.6) this.setTexture('enemy_cycle3_L1');
                else this.setTexture('enemy_cycle3');
            }

            this.tweens.add({

                        targets: enemy_sprite,
                        speed: (Phaser.Math.Between(sp_rng_high1,sp_rng_high2)/10),                    
                        ease: 'Sine.easeInOut',
                        duration: 15000,
                        yoyo: true,
                        repeat: -1,
                        paused: false
                        

                        });

            this.tweens.add({

                        targets: enemy_sprite.location,
                        position: (Phaser.Math.Between(-5,5)/10),                    
                        ease: 'Sine.easeInOut',
                        duration: 3000,
                        yoyo: true,
                        repeat: -1,
                        paused: false
                        

                        });

            var spriteDepth = 100; //100 - Math.floor(100*(enemy_sprite.location.distance/this.fTrackDistance));
            enemy_sprite.setDepth(spriteDepth);

            this.enemy_group.add(enemy_sprite);


            //green gang
            enemy_sprite = this.add.image(0,0,'enemy_cycle4').setOrigin(.5,.5).setVisible(false);
            enemy_sprite.label = 'green gang #'+u;
            enemy_sprite.status = 'alive';
            enemy_sprite.finished = false;
            enemy_sprite.location = {distance:Phaser.Math.Between(10,50), position:(Phaser.Math.Between(-5,5)/10)};
            enemy_sprite.totalRaceDistance = enemy_sprite.location.distance;
            enemy_sprite.speed = (Phaser.Math.Between(sp_rng_low1,sp_rng_low2)/10);
            enemy_sprite.lean = function()
            {
                if (thisContext.fTargetCurvature>.6) this.setTexture('enemy_cycle4_R2');
                else if (thisContext.fTargetCurvature>.2 && thisContext.fTargetCurvature<=.6) this.setTexture('enemy_cycle4_R1');
                else if (thisContext.fTargetCurvature<-.6) this.setTexture('enemy_cycle4_L2');
                else if (thisContext.fTargetCurvature<-.2 && thisContext.fTargetCurvature>=-.6) this.setTexture('enemy_cycle4_L1');
                else this.setTexture('enemy_cycle4');
            }

            this.tweens.add({

                        targets: enemy_sprite,
                        speed: (Phaser.Math.Between(sp_rng_high1,sp_rng_high2)/10),                    
                        ease: 'Sine.easeInOut',
                        duration: 8000,
                        yoyo: true,
                        repeat: -1,
                        paused: false
                        

                        });

            this.tweens.add({

                        targets: enemy_sprite.location,
                        position: (Phaser.Math.Between(-5,5)/10),                    
                        ease: 'Sine.easeInOut',
                        duration: 3000,
                        yoyo: true,
                        repeat: -1,
                        paused: false
                        

                        });

            var spriteDepth = 100; //100 - Math.floor(100*(enemy_sprite.location.distance/this.fTrackDistance));
            enemy_sprite.setDepth(spriteDepth);

            this.enemy_group.add(enemy_sprite);

        }
        

        //total set of road objects
        this.road_group = this.add.group();
        //this.road_groupArray = this.road_group.getChildren();

        var road_sprite; //worker just to init sprites in group

        for (var i = 0; i < 20; i++)
        {
            road_sprite = this.add.image(0,0,'rock').setOrigin(.5,.5).setVisible(false);
            road_sprite.label = 'rock';
            road_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), position:0.0};
            var spriteDepth = 100;// - Math.floor(100*(road_sprite.location.distance/this.fTrackDistance));
            
            road_sprite.setDepth(spriteDepth);

            this.road_group.add(road_sprite);
        }

        for (var i = 0; i < 20; i++)
        {
            road_sprite = this.add.image(0,0,'bump').setOrigin(.5,.5).setVisible(false);
            road_sprite.label = 'bump';
            road_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), position:0.0};
            var spriteDepth = 100;// - Math.floor(100*(road_sprite.location.distance/this.fTrackDistance));
            road_sprite.setDepth(spriteDepth);

            this.road_group.add(road_sprite);
        }



        //total set of scenery objects
        this.scenery_group =[];
        var scenery_sprite; //worker just to init sprites in group

        //
        this.scenery_group[0] = this.add.group();
        for (var i = 0; i < 50; i++)
        {
            scenery_sprite = this.add.image(0,0,'tree'+Phaser.Math.Between(4,9)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'tree';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'left'};
            var spriteDepth = 100;//-Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[0].add(scenery_sprite);

            scenery_sprite = this.add.image(0,0,'tree'+Phaser.Math.Between(4,9)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'tree';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'right'};
            var spriteDepth = 100 - Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[0].add(scenery_sprite);
        }
        //
        this.scenery_group[1] = this.add.group();
        for (var i = 0; i < 20; i++)
        {
            scenery_sprite = this.add.image(0,0,'fern'+Phaser.Math.Between(1,8)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'fern';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'left'};
            var spriteDepth = 100;//-Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[1].add(scenery_sprite);

            scenery_sprite = this.add.image(0,0,'fern'+Phaser.Math.Between(1,8)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'fern';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'right'};
            var spriteDepth = 100;// - Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[1].add(scenery_sprite);
        }
        for (var i = 0; i < 30; i++)
        {
            scenery_sprite = this.add.image(0,0,'rock'+Phaser.Math.Between(1,4)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'rock';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'left'};
            var spriteDepth = 100;//-Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[1].add(scenery_sprite);

            scenery_sprite = this.add.image(0,0,'rock'+Phaser.Math.Between(1,4)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'rock';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'right'};
            var spriteDepth = 100;// - Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[1].add(scenery_sprite);
        }
        //
        this.scenery_group[2] = this.add.group();        
        for (var i = 0; i < 50; i++)
        {
            scenery_sprite = this.add.image(0,0,'tree'+Phaser.Math.Between(16,16)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'tree';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'left'};
            var spriteDepth = 100;//-Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[2].add(scenery_sprite);

            scenery_sprite = this.add.image(0,0,'tree'+Phaser.Math.Between(16,16)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'tree';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'right'};
            var spriteDepth = 100;// - Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[2].add(scenery_sprite);
        }
        //
        this.scenery_group[3] = this.add.group();
        for (var i = 0; i < 50; i++)
        {
            scenery_sprite = this.add.image(0,0,'plant'+Phaser.Math.Between(3,6)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'plant';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'left'};
            var spriteDepth = 100;//-Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[3].add(scenery_sprite);

            scenery_sprite = this.add.image(0,0,'plant'+Phaser.Math.Between(3,6)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'plant';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'right'};
            var spriteDepth = 100;// - Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[3].add(scenery_sprite);
        }
        //
        this.scenery_group[4] = this.add.group();        
        for (var i = 0; i < 50; i++)
        {
            scenery_sprite = this.add.image(0,0,'tree'+Phaser.Math.Between(15,15)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'tree';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'left'};
            var spriteDepth = 100;//-Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[4].add(scenery_sprite);

            scenery_sprite = this.add.image(0,0,'tree'+Phaser.Math.Between(15,15)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'tree';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'right'};
            var spriteDepth = 100;// - Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[4].add(scenery_sprite);
        }
        //
        this.scenery_group[5] = this.add.group();        
        for (var i = 0; i < 50; i++)
        {
            scenery_sprite = this.add.image(0,0,'tree'+Phaser.Math.Between(13,13)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'tree';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'left'};
            var spriteDepth = 100;//-Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[5].add(scenery_sprite);

            scenery_sprite = this.add.image(0,0,'tree'+Phaser.Math.Between(13,13)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'tree';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'right'};
            var spriteDepth = 100;// - Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[5].add(scenery_sprite);
        }
        //
        this.scenery_group[6] = this.add.group();        
        for (var i = 0; i < 50; i++)
        {
            scenery_sprite = this.add.image(0,0,'tree'+Phaser.Math.Between(14,14)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'tree';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'left'};
            var spriteDepth = 100;//-Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[6].add(scenery_sprite);

            scenery_sprite = this.add.image(0,0,'tree'+Phaser.Math.Between(14,14)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'tree';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'right'};
            var spriteDepth = 100;// - Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[6].add(scenery_sprite);
        }
    }

    

});


