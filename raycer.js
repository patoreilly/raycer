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

        

        // global
        this.raycer_mode = 'demo';

        this.background_index = 0;
        this.total_backgrounds = 4;

        this.fDistance = 0.0;        // Distance car has travelled around track in 'meters'
        this.fCurvature = 0.0;        // Current track curvature, lerped between track sections
        this.fTrackCurvature = 0.0;   // Accumulation of track curvature
        this.fTrackDistance = 0.0;    // Total distance of track

        this.fCarPos = 0.0;           // Current car position
        this.fPlayerCurvature = 0.0;          // Accumulation of player curvature
        this.fSpeed = 0.0;            // Current player speed
        this.listLapTimes = [0,0,0,0,0];       // List of previous lap times
        this.fCurrentLapTime = 0.0;          // Current lap time
        this.totalRaceTime = 0.0;

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

        this.background_image = this.add.image(0,0,'background0').setOrigin(0).setScale(1);
        this.background_arc = 0;

        this.add.image(0,this.GameHeight/2,'gamedisplaycanvas').setOrigin(0).setScale(1).setDepth(1);

        //this.add.image(0,100,'groundcanvas').setOrigin(0).setScale(1).setDepth(201);
        
        this.raycer_cycle_sprite = this.add.image(0,0,'raycer_cycle').setDepth(200);

        
        //total set of road objects
        this.road_group = this.add.group();
        //this.road_groupArray = this.road_group.getChildren();

        var road_sprite; //worker just to init sprites in group

        for (var i = 0; i < 20; i++)
        {
            road_sprite = this.add.image(0,0,'rock').setOrigin(.5,.5).setVisible(false);
            road_sprite.label = 'rock';
            road_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), position:0.0};
            var spriteDepth = 100 - Math.floor(100*(road_sprite.location.distance/this.fTrackDistance));
            
            road_sprite.setDepth(spriteDepth);

            this.road_group.add(road_sprite);
        }

        for (var i = 0; i < 20; i++)
        {
            road_sprite = this.add.image(0,0,'bump').setOrigin(.5,.5).setVisible(false);
            road_sprite.label = 'bump';
            road_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), position:0.0};
            var spriteDepth = 100 - Math.floor(100*(road_sprite.location.distance/this.fTrackDistance));
            road_sprite.setDepth(spriteDepth);

            this.road_group.add(road_sprite);
        }


        //total set of scenery objects
        this.scenery_group =[];
        var scenery_sprite; //worker just to init sprites in group

        this.scenery_group[0] = this.add.group();
        for (var i = 0; i < 50; i++)
        {
            scenery_sprite = this.add.image(0,0,'rock'+Phaser.Math.Between(1,4)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'rock';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'left'};
            var spriteDepth = 100-Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[0].add(scenery_sprite);

            scenery_sprite = this.add.image(0,0,'rock'+Phaser.Math.Between(1,4)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'rock';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'right'};
            var spriteDepth = 100 - Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[0].add(scenery_sprite);
        }

        this.scenery_group[1] = this.add.group();
        for (var i = 0; i < 50; i++)
        {
            scenery_sprite = this.add.image(0,0,'fern'+Phaser.Math.Between(1,8)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'fern';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'left'};
            var spriteDepth = 100-Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[1].add(scenery_sprite);

            scenery_sprite = this.add.image(0,0,'fern'+Phaser.Math.Between(1,8)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'fern';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'right'};
            var spriteDepth = 100 - Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[1].add(scenery_sprite);
        }

        this.scenery_group[2] = this.add.group();
        for (var i = 0; i < 50; i++)
        {
            scenery_sprite = this.add.image(0,0,'plant'+Phaser.Math.Between(3,6)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'plant';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'left'};
            var spriteDepth = 100-Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[2].add(scenery_sprite);

            scenery_sprite = this.add.image(0,0,'plant'+Phaser.Math.Between(3,6)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'plant';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'right'};
            var spriteDepth = 100 - Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[2].add(scenery_sprite);
        }

        this.scenery_group[3] = this.add.group();        
        for (var i = 0; i < 50; i++)
        {
            scenery_sprite = this.add.image(0,0,'tree'+Phaser.Math.Between(16,16)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'tree';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'left'};
            var spriteDepth = 100-Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[3].add(scenery_sprite);

            scenery_sprite = this.add.image(0,0,'tree'+Phaser.Math.Between(16,16)).setOrigin(.5,1.0).setVisible(false);
            scenery_sprite.label = 'tree';
            scenery_sprite.location = {distance:Phaser.Math.Between(100,this.fTrackDistance-100), orientation:'right'};
            var spriteDepth = 100 - Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
            scenery_sprite.setDepth(spriteDepth);

            this.scenery_group[3].add(scenery_sprite);
        }

        // for (var i = 0; i < 10; i++)
        // {
        //     scenery_sprite = this.add.image(0,0,'atari_sign').setOrigin(0,1.0).setVisible(false);
        //     scenery_sprite.label = 'atari_sign';
        //     scenery_sprite.location = {distance:Phaser.Math.Between(100,2200), orientation:'right'};
        //     var spriteDepth = 100 - Math.floor(100*(scenery_sprite.location.distance/this.fTrackDistance));
        //     scenery_sprite.setDepth(spriteDepth);

        //     this.scenery_group[3].add(scenery_sprite);
        // }
        

        /// keyboard input 
        cursors = this.input.keyboard.createCursorKeys();

        

        // activates gamepad in this scene

        this.input.gamepad.once('down', function (pad, button, index) {

        pad.setAxisThreshold(0.3);

        gamepad = pad;

        }, this);
        
        

        /// debug global
        debug = this.add.text(10, 10, '', { font: '10px Arial', fill: '#ffffff' });
        

        
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
        //this.newLapTimeMark = 0;
        

        



    }, ////// END OF create()

    
    
    update: function()
    {
        var thisContext=this;
        
        this.fCurrentLapTime = (game.loop.now - this.lapStartTime)/1000;
        this.totalRaceTime = (game.loop.now - this.raceStartTime)/1000;

        //instead of fElapsedTime, fSpeedFactor will scale range of throttling (which effectively represents gear shifting for lower to higher ranges of speed)

        //var fSpeedFactor = .0075; //1st gear
        //var fSpeedFactor = .0125; //2nd gear
        var fSpeedFactor = .025; //3rd gear

        // Handle control input
        var nCarDirection = 0;
        
        if (this.raycer_mode == 'demo')
        {
            this.fSpeed += 2.0 * fSpeedFactor;
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
                this.fSpeed += 2.0 * fSpeedFactor;
            else
                this.fSpeed -= 1.0 * fSpeedFactor;

            // Car Curvature is accumulated left/right input, but inversely proportional to speed
            // i.e. it is harder to turn at high speed
            if (cursors.left.isDown || guiLeft || gamepad.left)
            {
                this.fPlayerCurvature -= 2.0 * fSpeedFactor * (1.0 - this.fSpeed / 2.0);
                nCarDirection = -1;
            }

            if (cursors.right.isDown || guiRight || gamepad.right)
            {
                this.fPlayerCurvature += 2.0 * fSpeedFactor * (1.0 - this.fSpeed / 2.0);
                nCarDirection = +1;
            }
            //end player control

        }
        

        // If car curvature is too different to track curvature, slow down
        // as car has gone off track

        if (this.raycer_mode != 'demo')
        {
            if (Math.abs(this.fPlayerCurvature - this.fTrackCurvature) >= 0.8)
            this.fSpeed -= 5.0 * fSpeedFactor;
        }
        else
        {
            this.fPlayerCurvature = this.fTrackCurvature;
        }
        

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
                onYoyo: function ()
                {
                    thisContext.background_index++;
                    if (thisContext.background_index>3) thisContext.background_index=0;
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
        this.background_arc -= this.fCurvature*this.fSpeed*5;

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
                switch (this.background_index)
                {
                    case 0:
                        var nGrassColour = Math.sin(80.0 * Math.pow(1.0 - fPerspective, 3) + this.fDistance * .8) > 0.0 ? 'orange' : 'darkorange';
                        var nClipColour = Math.sin(40.0 *  Math.pow(1.0 - fPerspective, 3) + this.fDistance) > 0.0 ? 'red' : 'white';
                        break;

                    case 1:
                        var nGrassColour = Math.sin(80.0 * Math.pow(1.0 - fPerspective, 3) + this.fDistance * .8) > 0.0 ? 'green' : 'darkgreen';
                        var nClipColour = Math.sin(40.0 *  Math.pow(1.0 - fPerspective, 3) + this.fDistance) > 0.0 ? 'red' : 'white';
                        break;

                    case 2:
                        var nGrassColour = Math.sin(80.0 * Math.pow(1.0 - fPerspective, 3) + this.fDistance * .8) > 0.0 ? 'violet' : 'darkviolet';
                        var nClipColour = Math.sin(40.0 *  Math.pow(1.0 - fPerspective, 3) + this.fDistance) > 0.0 ? 'blue' : 'white';
                        break;

                    case 3:
                        var nGrassColour = Math.sin(80.0 * Math.pow(1.0 - fPerspective, 3) + this.fDistance * .8) > 0.0 ? 'cyan' : 'darkcyan';
                        var nClipColour = Math.sin(40.0 *  Math.pow(1.0 - fPerspective, 3) + this.fDistance) > 0.0 ? 'red' : 'white';
                        break;
                }
                
                
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
                    var fClipWidth = fRoadWidth * 0.15;
                    fRoadWidth *= 0.5; // Halve it as track is symmetrical around center of track, but offset...

                    var nLeftGrass = Math.round( (_spriteMiddlePoint - fRoadWidth - fClipWidth) * thisContext.GameWidth );
                    var nRightGrass = Math.round( (_spriteMiddlePoint + fRoadWidth + fClipWidth) * thisContext.GameWidth );
                    
                    var nRow = thisContext.GameHeight / 2 + _spriteY;
                    
                    if (_sprite.location.orientation == 'left') _sprite.setPosition(nLeftGrass,nRow).setScale(_spritePerspective*2)
                        else _sprite.setPosition(nRightGrass,nRow).setScale(_spritePerspective*2)
            
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
        if (colorkey=='orange') { r=100; g=100; b=10; }
        if (colorkey=='darkorange') { r=120; g=80; b=20; }
        if (colorkey=='cyan') { r=0; g=110; b=180; }
        if (colorkey=='darkcyan') { r=10; g=130; b=220; }
        if (colorkey=='violet') { r=200; g=0; b=200; }
        if (colorkey=='darkviolet') { r=255; g=50; b=255; }
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


