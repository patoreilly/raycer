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
        
    },

    create: function ()
    {

        // reference to raycer scene
        this.raycer = this.scene.get('raycer');

        var config1 = {
            image: 'Kaiser Knuckle',
            width: 8,
            height: 8,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 96,
            spacing: { x: 0, y: 0 },
            lineSpacing: 8,
            offset: {y:48}
        };

        var config2 = {
            image: 'Kaiser Knuckle',
            width: 8,
            height: 8,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 96,
            spacing: { x: 0, y: 0 },
            lineSpacing: 8,
            offset: {y:24}
        };

        var config3 = {
            image: 'Kaiser Knuckle',
            width: 8,
            height: 8,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
            charsPerRow: 96,
            spacing: { x: 0, y: 0 },
            lineSpacing: 8,
            offset: {y:8}
        };

        this.cache.bitmapFont.add('kk_number', Phaser.GameObjects.RetroFont.Parse(this, config1));
        this.cache.bitmapFont.add('kk_label', Phaser.GameObjects.RetroFont.Parse(this, config2));
        this.cache.bitmapFont.add('kk_race', Phaser.GameObjects.RetroFont.Parse(this, config3));

        this.speedDisplay = this.add.dynamicBitmapText(0, 0, 'kk_number', 0).setOrigin(1,.5).setScale(1).setRightAlign().setPosition(34,190).setDepth(100);
        this.speedDisplayLabel = this.add.dynamicBitmapText(0, 0, 'kk_label', 'k/h').setOrigin(0,.5).setScale(1).setLeftAlign().setPosition(36,190).setDepth(100);
        
        this.totalRaceTime = this.add.dynamicBitmapText(0, 0, 'kk_race', 0).setOrigin(1,.5).setScale(1).setRightAlign().setPosition(160,194).setDepth(100);
        this.totalRaceTimeLabel = this.add.dynamicBitmapText(0, 0, 'kk_label', 's').setOrigin(0,.5).setScale(1).setLeftAlign().setPosition(162,194).setDepth(100);

        this.totalRaceDistance = this.add.dynamicBitmapText(0, 0, 'kk_race', 0).setOrigin(1,.5).setScale(1).setRightAlign().setPosition(160,184).setDepth(100);
        this.totalRaceDistanceLabel = this.add.dynamicBitmapText(0, 0, 'kk_label', 'm').setOrigin(0,.5).setScale(1).setLeftAlign().setPosition(162,184).setDepth(100);
        
        this.currentLapTime = this.add.dynamicBitmapText(0, 0, 'kk_number', 0).setOrigin(1,.5).setScale(2).setRightAlign().setPosition(160,20).setDepth(100);
        this.currentLapTimeLabel = this.add.dynamicBitmapText(0, 0, 'kk_label', 's').setOrigin(0,.5).setScale(1).setLeftAlign().setPosition(162,20).setDepth(100);

        this.currentPlacement = this.add.dynamicBitmapText(0, 0, 'kk_number', 0).setOrigin(1,.5).setScale(2).setRightAlign().setPosition(160,40).setDepth(100);
        this.currentPlacementLabel = this.add.dynamicBitmapText(0, 0, 'kk_label', 'place').setOrigin(0,.5).setScale(1).setLeftAlign().setPosition(162,40).setDepth(100);
        
        this.lapDistance = this.add.dynamicBitmapText(0, 0, 'kk_number', 0).setOrigin(1,.5).setScale(1).setRightAlign().setPosition(300,190).setDepth(100);
        this.lapDistanceLabel = this.add.dynamicBitmapText(0, 0, 'kk_label', 'm').setOrigin(0,.5).setScale(1).setLeftAlign().setPosition(302,190).setDepth(100);

    },

    update: function()
    {
        this.currentLapTime.text =  this.raycer.fCurrentLapTime.toFixed(0);

        this.currentPlacement.text = this.raycer.playerRacePlacement;

        this.totalRaceTime.text =  this.raycer.totalRaceTime.toFixed(0);

        this.totalRaceDistance.text =  this.raycer.playerTotalRaceDistance.toFixed(0);

        this.speedDisplay.text =  Math.round(161*this.raycer.realSpeed);
    
        this.lapDistance.text =  this.raycer.fDistance.toFixed(0);
    }

});


