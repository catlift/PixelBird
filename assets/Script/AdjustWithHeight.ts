// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//分数的位置自适应

const {ccclass, property} = cc._decorator;

@ccclass
export default class AdjustWithHeight extends cc.Component {
	
	@property
	offset: number = 0;
	
	@property
	hasShowEffect: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		let start = 0;
		//cc.winSize 设计分辨率，相当于游戏设计的逻辑大小,类似画布
		start = cc.winSize.height / 2;
		this.node.y = start;
		// cc.log(start);
		if(!this.hasShowEffect) {
			this.node.y += this.offset;
		}
	}

    start () {
		this.showTheNode();
    }
	
	showTheNode() {
		if(this.hasShowEffect){
			this.node.runAction(cc.moveTo(.5, cc.v2(this.node.x, this.node.y + this.offset)).easing(cc.easeBackOut()));
		}
	}

    // update (dt) {}
}
