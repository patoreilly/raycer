var About = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function About ()
    {
        Phaser.Scene.call(this, { key: 'about', active: false });
    },

    init: function (data)
    {
        
    },

    preload: function ()
    {
        

    },

    create: function ()
    {
        this.textures.generate('chunk3', { data: ['D'], pixelWidth: 1});
        var bgimg = this.add.image(0,0,'chunk3').setAlpha(.9).setOrigin(0).setDisplaySize(320,200).setDepth(0);

        this.textures.generate('a_menu', { data: accessMenuData, pixelWidth: 1});
        this.access_menu = this.add.image(310,10,'a_menu').setAlpha(1).setInteractive();
        this.access_menu.on('pointerdown', function () { var menus = this.scene.get('menus'); menus.displayHideMenu(); this.scene.setVisible(false, 'about');} , this);

        this.input.keyboard.on('keydown', function (){ this.scene.setActive(false, 'about');this.scene.setVisible(false, 'about');this.scene.setActive(true, 'raycer');}, this);

        var nt_config1 = {
        image: 'Hat Trick Hero',
        width: 8,
        height: 8,
        chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
        charsPerRow: 96,
        spacing: { x: 0, y: 0 },
        offset: {y:0}
        };

        var nt_config2 = {
        image: 'Hat Trick Hero',
        width: 8,
        height: 8,
        chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
        charsPerRow: 96,
        spacing: { x: 0, y: 0 },
        offset: {y:48}
        };

        var nt_config3 = {
        image: 'Hat Trick Hero',
        width: 8,
        height: 8,
        chars: Phaser.GameObjects.RetroFont.TEXT_SET1,
        charsPerRow: 96,
        spacing: { x: 0, y: 0 },
        offset: {y:64}
        };

        this.cache.bitmapFont.add('headtext', Phaser.GameObjects.RetroFont.Parse(this, nt_config3));
        this.cache.bitmapFont.add('subtext', Phaser.GameObjects.RetroFont.Parse(this, nt_config1));
        this.cache.bitmapFont.add('foottext', Phaser.GameObjects.RetroFont.Parse(this, nt_config2));

        var text3 = this.add.dynamicBitmapText(0, 0, 'subtext', "Game Design:").setOrigin(1,1).setScale(1).setRightAlign().setPosition(150,50).setDepth(100);
        var text4 = this.add.dynamicBitmapText(0, 0, 'subtext', "Coding Credits:").setOrigin(1,1).setScale(1).setRightAlign().setPosition(150,100).setDepth(100);
        var text5 = this.add.dynamicBitmapText(0, 0, 'subtext', "Art Credits:").setOrigin(1,1).setScale(1).setRightAlign().setPosition(150,150).setDepth(100);

        var text6 = this.add.dynamicBitmapText(0, 0, 'foottext', "@pato_reilly").setOrigin(0,1).setScale(1).setLeftAlign().setPosition(170,50).setDepth(100);
        var text7 = this.add.dynamicBitmapText(0, 0, 'foottext', "@javidx9 @phaser_").setOrigin(0,1).setScale(1).setLeftAlign().setPosition(170,100).setDepth(100);
        var text8 = this.add.dynamicBitmapText(0, 0, 'foottext', "the great pixel\nartists of X").setOrigin(0,.5).setScale(1).setLeftAlign().setPosition(170,150).setDepth(100);

        var text9 = this.add.dynamicBitmapText(0, 0, 'subtext', "2024").setOrigin(.5,1).setScale(2).setCenterAlign().setPosition(160,190).setDepth(100);


    },

    update: function()
    {


    }

});