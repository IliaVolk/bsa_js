/**
 * Created by user on 27.05.2016.
 */

var ActiveCheckBox;

(function(){
    ActiveCheckBox = function (handler, text) {
        this.$element = $("<li><a><input type='checkbox'>"+text+"</a></li>");
        this.handler = handler;
        this.$element.click(this.getHandler());
    };

    ActiveCheckBox.prototype.getHandler = function(){
        var handler = this.handler;
        return function (e) {
            if (this.attr("data-is-checked")) {
                this.removeAttr("data-is-checked");
            }else {
                this.attr("data-is-checked", true);
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
            removeAttr("data-is-checked").
            find("input:checkbox").get()[0].checked = false;
    }

})();


