var Touchgui = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Touchgui ()
    {
        Phaser.Scene.call(this, { key: 'touchgui', active: false });
    },

    init: function (data)
    {
        
    },

    preload: function ()
    {
        

    },

    create: function ()
    {

        this.input.addPointer(1);
        this.textures.generate('chunk', { data: ['1'], pixelWidth: 1});

        guide_multi = this.add.image(280,148,'chunk').setDisplaySize(64, 64).setAlpha(.5).setDepth(200).setInteractive();
        
        guide_multi.on('pointermove', function () {gTouching = true}, this);
        guide_multi.on('pointerout', function () {gTouching = false; guiLeft = false; guiRight = false; guiUp = false}, this);

        this.textures.generate('h_arrow', { data: guideInputHorizontalData, pixelWidth: 2});
        this.textures.generate('v_arrow', { data: guideInputVerticalData, pixelWidth: 2});

        guide_left = this.add.image(260,148,'h_arrow').setAlpha(.5).setDepth(200);
        guide_right = this.add.image(300,148,'h_arrow').toggleFlipX().setAlpha(.5).setDepth(200);

        guide_up = this.add.image(280,128,'v_arrow').setAlpha(.5).setDepth(200);
        guide_down = this.add.image(280,168,'v_arrow').toggleFlipY().setAlpha(.5).setDepth(200);

        this.textures.generate('a_menu', { data: accessMenuData, pixelWidth: 1});
        access_menu = this.add.image(310,10,'a_menu').setAlpha(1).setInteractive();
        access_menu.on('pointerdown', function () { var menus = this.scene.get('menus'); menus.displayHideMenu(); this.scene.setVisible(false, 'about');} , this);

    },

    update: function()
    {


    }

});