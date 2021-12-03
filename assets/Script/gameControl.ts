// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameControl extends cc.Component {

    @property(cc.RigidBody)
	player_rig: cc.RigidBody = null;
	
	@property(cc.Node)
	gameOverNode: cc.Node = null;
	
	@property(cc.Node)
	settingNode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		
		// rigidBody true
		cc.director.getPhysicsManager().enabled = true;
		
		// touch
		this.onTouch();
		
		// active false
		this.settingNode.active = true;
		this.gameOverNode.active = false;
		
		// preload
		cc.director.preloadScene("Home", function () {
		    cc.log("Last scene preloaded");
		});
	}

    start () {
		// cc.log(this.player_rig)
    }

    update (dt) {
		
	}
	
	onTouch() {
		this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
		this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
	}
	
	onTouchEnd(e: cc.Event.EventTouch) {
		this.player_rig.linearVelocity = cc.v2(0, 200);
	}
	
	onTouchCancel(e: cc.Event.EventTouch) {
		return;
	}
	
	gameOver() {
		this.settingNode.active = false;
		this.gameOverNode.active = true;
		this.dirPause();
	}
	
	dirPause() {
		cc.director.pause();
	}
	
	dirResume() {
		cc.director.resume();
	}
	
	dirload() {
		cc.director.loadScene("Game");
	}
}
