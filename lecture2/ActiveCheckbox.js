/**
 * Created by user on 27.05.2016.
 */

var ActiveCheckBox;

(function(){
    var checkBoxDataId = 0;
    var nextCheckBoxData = function(){
        return "data-active-checkbox-"+checkBoxDataId++;
    };
    ActiveCheckBox = function (handler, text) {
        this.$element = $("<li><a><input type='checkbox'>"+text+"</a></li>");
        this.dataAttr = nextCheckBoxData();
        this.handler = handler;
        this.$element.click(this.getHandler());
    };
    ActiveCheckBox.prototype.getHandler = function(){
        var dataAttr = this.dataAttr;
        var handler = this.handler;
        return function (e) {
            if (this.attr(dataAttr)){
                this.removeAttr(dataAttr);
            }else {
                this.attr(dataAttr, true);
            }
            var checked = !this.find("input:checkbox").get()[0].checked;
            if (e.target.checked !== undefined){
                //this undo default checkbox action, if event initiated by checkbox
                checked = !checked;
            }
            this.find("input:checkbox").get()[0].checked = checked;
            handler(checked);
        }.bind(this.$element);
    };
    ActiveCheckBox.prototype.setNotChecked = function(){
        this.$element.
            removeAttr(this.dataAttr).
            find("input:checkbox").get()[0].checked = false;
    }

})();


