// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class FillScreen extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		//部分手机黑边问题
		this.node.setContentSize(cc.winSize.width, cc.winSize.height);
	}

    start () {

    }

    // update (dt) {}
}
