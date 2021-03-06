/* global
  Defer,
  Main
*/

(function(exports) {
  'use strict';

  var stack = [Main.prepareForDisplay()];

  exports.Navigation = {
    waitForTransition() {
      var defer = new Defer();

      var count = 2;
      document.body.addEventListener('transitionend', function onTransition(e) {
        if (!e.target.classList.contains('panel')) {
          return;
        }

        if (--count) {
          return;
        }

        document.body.removeEventListener('transitionend', onTransition);
        defer.resolve();
      });

      return defer.promise;
    },

    push: function(panel) {
      return Promise.resolve(panel).then((panel) => {
        stack[stack.length - 1].classList.add('back');
        panel.classList.remove('next');
        stack.push(panel);

        return this.waitForTransition();
      });
    },

    pop: function() {
      var toPop = stack.pop();
      toPop.classList.add('next');
      stack[stack.length - 1].classList.remove('back');

      return this.waitForTransition();
    }
  };
})(window);
