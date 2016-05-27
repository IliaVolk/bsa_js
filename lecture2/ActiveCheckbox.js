/**
 * Created by user on 27.05.2016.
 */

var ActiveCheckBox;

(function(){
    var checkBoxDataId = 0;
    var nextCheckBoxData = function(){
        return "data-checkbox-checked"+checkBoxDataId++;
    };
    ActiveCheckBox = function (handler, text) {
        this.$element = $("<li><a><input type='checkbox'>"+text+"</a></li>");
        this.isChecked = nextCheckBoxData();
        this.handler = handler;
        this.$element.click(this.getHandler());
    };
    ActiveCheckBox.prototype.getHandler = function(){
        var isChecked = this.isChecked;
        var handler = this.handler;
        return function (e) {
            if (this.attr(isChecked)){
                this.removeAttr(isChecked);
            }else {
                this.attr(isChecked, true);
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
            removeAttr(this.isChecked).
            find("input:checkbox").get()[0].checked = false;
    }

})();


