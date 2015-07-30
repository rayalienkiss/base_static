/*!
 * placeholder ռλ��
 * tommyshao <jinhong.shao@frontpay.cn>
 * API:
 *      $(element).placeholder();
 */

+(function($) {
    'use strict';

    var toggle = 'input[placeholder]';

    var input = document.createElement('input');
    var isSupport = 'placeholder' in input;

    // ���캯��
    // ===============
    var Placeholder = function(element) {
        var $this = this;
        $this.$el = $(element);
        this.init();
    };

    Placeholder.VERSION = '1.0.0';

    Placeholder.prototype.init = function(){
        var $this = this;
        this.$placeholder = $this.$el.data('placeholder');
        //alert(this.$placeholder);
        if(!isSupport && !this.$placeholder) {
            var text = $this.$el.attr('placeholder');
            $this.$placeholder = $('<label />').html(text);
            $this.$el.data('placeholder', $this.$placeholder).before($this.$placeholder);
        }

        $this.$el.on('focus', $.proxy(this.focus, this));
        $this.$el.on('blur', $.proxy(this.blur, this));
        $this.$placeholder.on('click', $.proxy(this.focus, this));
    };

    Placeholder.prototype.focus = function(){
        this.$placeholder.hide();
    };

    Placeholder.prototype.blur = function(){
        this.$placeholder[$.trim(this.$el.val()) === '' ? 'show' : 'hide']();
    };


    // �������
    //======================
    function Plugin() {
        return $(this).each(function () {
            var $this = $(this);
            var data = $this.data('ui.placeholder');
            if(!data) $this.data('ui.placeholder', (data = new Placeholder(this)));
        })
    }


    // jQuery �����չ
    $.fn.placeholder = Plugin;
    $.fn.placeholder.Constructor = Placeholder;

    // Ԫ�ز����
    // ====================
    $(document).ready(function(){ $(toggle).placeholder() });
})( jQuery );
