// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import gameControl from "./gameControl"

@ccclass
export default class NewClass extends gameControl {

	@property({
		type: cc.Node,
		tooltip: "setting/pause btn"
	})
	setting_btn: cc.Node = null;
	
	@property({
		type: cc.Node,
		tooltip: "control node , parent"
	})
	controlNode: cc.Node = null;
	
	@property({
		type: cc.Node,
		tooltip: "continue / cc.director.resume()"
	})
	continue_btn: cc.Node = null;
	
	@property({
		type: cc.Node,
		tooltip: "home / go new scene"
	})
	home_btn: cc.Node = null;
	
	@property({
		tooltip: "controlNode active"
	})
	setting_Bool: boolean = false;
	
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		// on 
		this.onBgUI();
		this.onSettingBtn();
		this.onContinueBtn();
		this.onHomeBtn();
		
		// active
		this.offControlNode();
	}

    start () {

    }

    update (dt) {
		
	}
	
	// pause/setting btn
	onSettingBtn() {
		this.setting_btn.on("touchstart", function(event) {
			this.setting_Bool = !this.setting_Bool;
			if(this.setting_Bool) {
				this.onControlNode();
				this.dirPause();
			}else {
				this.offControlNode();
				this.dirResume();
			}
		}, this);
		// this.setting_btn.dispatchEvent( new cc.Event.EventCustom('touchstart', true) );
	}
	
	// stop setting btn 
	onBgUI() {
		this.node.on("touchstart", function(event) {
			event.stopPropagation();
		})
		this.controlNode.on("touchstart", function(event) {
			event.stopPropagation();
		})
	}
	
	onContinueBtn() {
		this.continue_btn.on("touchstart", function() {
			this.continue_run();
		}, this);
	}
	
	onHomeBtn() {
		this.home_btn.on("touchstart", function() {
			// this.setting_Bool = !this.setting_Bool;
			cc.director.loadScene("Home");
			this.dirResume();
		}, this);
	}
	
	continue_run() {
		this.setting_Bool = !this.setting_Bool;
		this.offControlNode();
		this.dirResume();
	}
	
	onControlNode() {
		this.controlNode.active = true;
	}
	
	offControlNode() {
		this.controlNode.active = false;
	}
}
