// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import gameControl from "./gameControl"

window.Global = {
	score: null
}

@ccclass
export default class playerControl extends gameControl {
	
	@property(cc.Label)
	scoreLabel: cc.Label = null;
	
	@property(cc.Node)
	pipesNode: cc.Node = null;
	
	@property(cc.Node)
	addScoreText: cc.Node = null;
	
	@property
	score: number = 0;
	
	@property
	checkBool: boolean = false;
	
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		this.node.getComponent(cc.Animation).play("player").wrapMode = cc.WrapMode.Loop;
		
		this.addScoreText.opacity = 0;
	}

    start () {
		
    }

    update (dt) {
		let checkNode;
		let childList = this.pipesNode.children;
		for(let i = 0; i < childList.length; i++) {
			let dis = Math.abs(childList[i].x - this.node.x);
			let w = this.node.width / 2 + childList[i].children[0].width / 2;
			if(dis <= w) {
				checkNode = childList[i];
			}
		}
		
		if(checkNode) {
			this.checkBool = true;
		}else {
			if(this.checkBool) {
				this.addScore();
			}
			this.checkBool = false;
		}
		
		if(this.node.y > cc.winSize.height / 2 || this.node.y < -cc.winSize.height / 2) {
			Global.score = this.score;
			this.gameOver();
		}
		
	}
	
	onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
		let _t = this;
		
		if(otherCollider.node.group == "pipe" || otherCollider.node.group == "road") {
			Global.score = this.score;
			this.gameOver();
		}
	}
	
	addScore() {
		this.score++;
		this.scoreLabel.string = "score：" + this.score.toString();
		// add Score text
		this.addScoreText.x = this.node.x;
		this.addScoreText.y = this.node.y;
		this.addScoreText.opacity = 255;
		var spawn = cc.spawn(
			cc.fadeOut(0.5),//渐出
			cc.moveBy(0.5, cc.v2(0, 100))//移动动画
		)
		cc.tween(this.addScoreText).then(spawn).start();
		this.scheduleOnce(function() {
			this.addScoreText.opacity = 0;
		}, 0.5);
	}
}
