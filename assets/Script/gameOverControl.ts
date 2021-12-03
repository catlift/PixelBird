// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import gameControl from "./gameControl"

@ccclass
export default class gameOverControl extends gameControl {

    @property(cc.Label)
	maxScore: cc.Label = null;
	
	@property(cc.Node)
	restartNode: cc.Node = null;
	
	@property(cc.Node)
	newText: cc.Node = null;
	

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		this.newText.active = false;
		
		this.onRestartNode();
		
		if(Global.score > cc.sys.localStorage.getItem("maxScore")) {
			cc.sys.localStorage.setItem("maxScore", Global.score);
			this.maxScore.string = "score：" + Global.score.toString();
			this.newText.active = true;
		}else {
			this.maxScore.string = "score：" + Global.score.toString();
			this.newText.active = false;
		}
	}

    start () {

    }

    update (dt) {
		
	}
	
	onRestartNode() {
		this.restartNode.on("touchstart", function(event) {
			cc.director.loadScene("Home");
			this.dirResume();
		}, this);
	}
}
