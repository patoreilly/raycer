var Hud = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Hud ()
    {
        Phaser.Scene.call(this, { key: 'hud', active: false });
    },

    init: function (data)
    {
        
    },

    preload: function ()
    {
        this.load.bitmapFont('atari-sunset', 'gui/atari-sunset.png', 'gui/atari-sunset.xml');

    },

    create: function ()
    {

        // reference to raycer scene
        this.raycer = this.scene.get('raycer');

        
        this.currentLapTime = this.add.bitmapText(30, 150, 'atari-sunset', 0, 16).setOrigin(.5);
        
        this.totalRaceTime = this.add.bitmapText(30, 180, 'atari-sunset', 0, 16).setOrigin(.5);

        this.speedDisplay = this.add.bitmapText(160, 20, 'atari-sunset', 0, 24).setOrigin(.5);
        
        this.lapDistance = this.add.bitmapText(290, 180, 'atari-sunset', 0, 16).setOrigin(.5);


        

    },

    update: function()
    {
        // if (this.raycer.raycer_mode=='game')
        // {
            

                this.currentLapTime.text =  this.raycer.fCurrentLapTime.toFixed(0);


                this.totalRaceTime.text =  this.raycer.totalRaceTime.toFixed(0);
            
            
                this.speedDisplay.text =  this.raycer.fSpeed.toFixed(2);
            
            
                this.lapDistance.text =  this.raycer.fDistance.toFixed(0);
            
        //}
    }

});


