// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

	@property(cc.Node)
	startBtn: cc.Node = null;
	
	@property(cc.Node)
	player: cc.Node = null;
	
	@property({
		tooltip: "jumpHeight",
		type: cc.Float
	})
	jumpHeight: cc.Float = 100;
	
	@property({
		tooltip: "jumpDuration",
		type: cc.Float
	})
	jumpDuration: cc.Float = 0.35;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		// rigidBody true
		cc.director.getPhysicsManager().enabled = true;
		
		// on 
		// this.onStartBtn();
		
		// touch
		this.onTouch();
		
		
		cc.director.preloadScene("Game", function () {
		    cc.log("Next scene preloaded");
		});
	}

    start () {
		
    }

    // update (dt) {}
	
	onStartBtn() {
		this.startBtn.on("touchstart", function(){
			cc.director.loadScene("Game");
		}, this);
	}
	
	onTouch() {
		this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
		this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
	}
	
	onKey() {
		
	}
	
	onTouchEnd(e: cc.Event.EventTouch) {
		// var jumpUp = cc.spawn(
		//     cc.jumpBy(this.jumpDuration, cc.v2(0, this.jumpHeight), this.jumpHeight, 1),
		//     cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)),
		// )
		// cc.tween(this.player).then(jumpUp).start();
		
		var jump = cc.jumpBy(this.jumpDuration, cc.v2(200, -250), this.jumpHeight, 1);
		
		cc.tween(this.player).then(jump).start();
		this.scheduleOnce(function(){
			cc.director.loadScene("Game");
		}, this.jumpDuration);
	}
	
	onTouchCancel(e: cc.Event.EventTouch) {
		return;
	}
}
